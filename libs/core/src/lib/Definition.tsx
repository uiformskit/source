/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ControlMap<C = {}, V = any> = {
  [key: string]: {
    config: C;
    value: V;
  };
};

export interface BaseControlProps<Config, Value> {
  config: Config;
  value?: Value;
  label: string;
  wrapperClassName?: string;
}

export interface BaseControlUIProps<Config, Value>
  extends BaseControlProps<Config, Value> {
  onChange: (value: Value) => void;
  errors?: string[];
}

export type UIComponents<T extends ControlMap> = {
  [Key in keyof T]: React.ComponentType<
    BaseControlUIProps<T[Key]['config'], T[Key]['value']>
  >;
};

export type Validator = (value: any) => string | null;

export type FormControlConfig<T extends ControlMap> = {
  [K in keyof T]: BaseControlProps<T[K]['config'], T[K]['value']> & {
    type: K;
    validators?: Validator[];
  };
}[keyof T];

export interface UseUIForms<T extends ControlMap> {
  render: () => JSX.Element[];
  getValues: () => { [key: string]: T[keyof T]['value'] };
  validate: () => {
    values: { [key: string]: T[keyof T]['value'] };
    isValid: boolean;
    errors: { [key: string]: string[] };
  };
  setupControl: (controlKey: string, parameters: FormControlConfig<T>) => void;
  patch: (updates: Partial<{ [key: string]: T[keyof T]['value'] }>) => void;
  remove: (key: string) => void;
  initForm: (
    configArray: { controlKey: string; parameters: FormControlConfig<T> }[]
  ) => void;
}
