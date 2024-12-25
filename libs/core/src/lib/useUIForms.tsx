import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';

import {
  BaseControlProps,
  BaseControlUIProps,
  ControlMap,
  FormControlConfig,
  UIComponents,
  UseUIForms,
} from './Definition';
import './grid.css';

export function useUIForms<T extends ControlMap>(
  uiComponents: UIComponents<T>,
  formControls: { controlKey: string; parameters: FormControlConfig<T> }[],
  onChange?: (
    formState: Record<string, T[keyof T]['value']>,
    form: UseUIForms<T>
  ) => void
): UseUIForms<T> {
  const [controls, setControls] = useState<Map<string, FormControlConfig<T>>>(
    new Map()
  );

  type FormState = Record<string, T[keyof T]['value']>;
  type ErrorsState = Record<string, string[]>;

  const [formState, setFormState] = useState<FormState>({});
  const [errors, setErrors] = useState<ErrorsState>({});

  const setupControl = useCallback(
    (controlKey: string, parameters: FormControlConfig<T>) => {
      setControls((prev) => new Map(prev).set(controlKey, parameters));
      setFormState((prev) => {
        if (parameters.value) {
          return {
            ...prev,
            [controlKey]: parameters.value as T[keyof T]['value'],
          };
        }
        return prev;
      });
    },
    []
  );

  const initForm = useCallback(
    (
      configArray: { controlKey: string; parameters: FormControlConfig<T> }[]
    ) => {
      configArray.forEach(({ controlKey, parameters }) => {
        setupControl(controlKey, parameters);
      });
    },
    [setupControl]
  );

  const handleChange = useCallback(
    (key: string, value: T[keyof T]['value']) => {
      setFormState((prev) => {
        const updatedState = { ...prev, [key]: value };
        if (onChange) {
          onChange(updatedState, form);
        }
        return updatedState;
      });
    },
    []
  );

  const patch = useCallback((updates: Partial<FormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  }, []);

  const remove = useCallback((key: string) => {
    setControls((prev) => {
      const updatedControls = new Map(prev);
      updatedControls.delete(key);
      return updatedControls;
    });

    setFormState((prev) => {
      const { [key]: _, ...updatedState } = prev;
      return updatedState;
    });

    setErrors((prev) =>
      Object.fromEntries(Object.entries(prev).filter(([k]) => k !== key))
    );
  }, []);

  const validate = useCallback(() => {
    const newErrors: ErrorsState = {};
    controls.forEach((control, key) => {
      if (control.validators) {
        const validationErrors = control.validators
          .map((validator) => validator(formState[key]))
          .filter((error): error is string => error !== null);
        if (validationErrors.length > 0) {
          newErrors[key] = validationErrors;
        }
      }
    });
    setErrors(newErrors);
    return {
      values: formState,
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  }, [controls, formState]);

  const render = useCallback((): JSX.Element[] => {
    return Array.from(controls.entries()).flatMap(
      ([key, { type, config, label, wrapperClassName }]) => {
        const Component = uiComponents[type] as React.ComponentType<
          BaseControlProps<T[keyof T]['config'], T[keyof T]['value']>
        >;

        if (!Component) return [];

        const props: BaseControlUIProps<
          T[keyof T]['config'],
          T[keyof T]['value']
        > = {
          config,
          value: formState[key] ?? ('' as T[keyof T]['value']),
          onChange: (value: T[keyof T]['value']) => handleChange(key, value),
          label,
          errors: errors[key],
          wrapperClassName,
        };

        return <Component key={key} {...props} />;
      }
    );
  }, [controls, formState, errors, uiComponents, handleChange]);

  const isSetupInitialized = useRef(false);

  useEffect(() => {
    if (!isSetupInitialized.current && formControls) {
      initForm(formControls);
      isSetupInitialized.current = true;
    }
  }, [formControls, initForm]);

  const form = useMemo(() => {
    return {
      render,
      getValues: () => formState,
      validate,
      setupControl,
      patch,
      remove,
      initForm,
    };
  }, [render, formState, validate, setupControl, patch, remove, initForm]);

  return form;
}
