/* eslint-disable @typescript-eslint/no-empty-object-type */
export type BasicFormControls = {
  textInput: {
    config: {
      placeholder?: string;
      type?: 'text' | 'password' | 'email' | 'tel' | 'url';
    };
    value: string;
  };
  numberInput: {
    config: {
      min?: number;
      max?: number;
    };
    value: number | null;
  };
  dropdown: {
    config: {
      options: Array<{ value: string | number; text: string }>;
    };
    value: string | number;
  };
  checkbox: {
    config: {};
    value: boolean;
  };
  dateInput: {
    config: {
      minDate?: string; // e.g., "2024-01-01"
      maxDate?: string; // e.g., "2024-12-31"
    };
    value: string;
  };
  textArea: {
    config: {
      rows?: number;
      cols?: number;
      maxLength?: number;
      placeholder?: string;
    };
    value: string;
  };
  radioGroup: {
    config: {
      options: Array<{ value: string | number; text: string }>;
    };
    value: string | number;
  };
  multiSelect: {
    config: {
      options: Array<{ value: string | number; text: string }>;
    };
    value: Array<string | number>;
  };
  slider: {
    config: {
      min?: number;
      max?: number;
      step?: number;
    };
    value: number;
  };
  timeInput: {
    config: {
      minTime?: string; // e.g., "09:00"
      maxTime?: string; // e.g., "17:00"
    };
    value: string; // e.g., "13:30"
  };
  dateTimeInput: {
    config: {
      minDateTime?: string; // e.g., "2024-12-20T09:00"
      maxDateTime?: string; // e.g., "2024-12-20T17:00"
    };
    value: string; // e.g., "2024-12-20T14:30"
  };
};
