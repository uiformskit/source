import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Slider,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import {
  LocalizationProvider,
  DatePicker,
  DesktopTimePicker,
  DateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { BasicFormControls, UIComponents } from '@uiformskit/core';

export const MuiUIComponents: UIComponents<BasicFormControls> = {
  textInput: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      <TextField
        label={label}
        type={config.type ?? 'text'}
        placeholder={config.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!errors?.length}
        helperText={errors?.join(', ')}
        fullWidth
      />
    </div>
  ),

  numberInput: ({
    config,
    value,
    onChange,
    label,
    errors,
    wrapperClassName,
  }) => (
    <div className={wrapperClassName}>
      <TextField
        label={label}
        type="number"
        value={value ?? ''}
        onChange={(e) => onChange(Number(e.target.value))}
        inputProps={{ min: config.min, max: config.max }}
        error={!!errors?.length}
        helperText={errors?.join(', ')}
        fullWidth
      />
    </div>
  ),

  dropdown: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          fullWidth
          label={label}
        >
          {config.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
        {errors?.length && <FormHelperText>{errors.join(', ')}</FormHelperText>}
      </FormControl>
    </div>
  ),

  checkbox: ({ value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!value} // Ensure the value is a boolean (defaults to false if undefined or null)
            onChange={(e) => onChange(e.target.checked)} // Pass the boolean value directly
          />
        }
        label={label}
      />
      {errors &&
        errors.length > 0 && ( // Safely check if errors exist
          <div style={{ color: 'red' }}>{errors.join(', ')}</div>
        )}
    </div>
  ),

  dateInput: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={wrapperClassName}>
        <DatePicker
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(date) => onChange(date ? date.toISOString() : '')}
          slotProps={{
            textField: {
              error: !!errors?.length,
              helperText: errors?.join(', '),
              fullWidth: true,
            },
          }}
        />
      </div>
    </LocalizationProvider>
  ),

  timeInput: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={wrapperClassName}>
        <DesktopTimePicker
          label={label}
          value={value ? dayjs(value, 'HH:mm') : null}
          onChange={(time) => onChange(time ? time.format('HH:mm') : '')}
          slotProps={{
            textField: {
              error: !!errors?.length,
              helperText: errors?.join(', '),
              fullWidth: true,
            },
          }}
        />
      </div>
    </LocalizationProvider>
  ),

  slider: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <Slider
        value={value}
        onChange={(e, val) => onChange(val as number)}
        min={config.min}
        max={config.max}
        step={config.step}
        marks
      />
      {errors?.length && (
        <div style={{ color: 'red' }}>{errors.join(', ')}</div>
      )}
    </div>
  ),

  textArea: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      <TextField
        label={label}
        placeholder={config.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        multiline
        rows={config.rows ?? 4}
        error={!!errors?.length}
        helperText={errors?.join(', ')}
        fullWidth
      />
    </div>
  ),

  radioGroup: ({
    config,
    value,
    onChange,
    label,
    errors,
    wrapperClassName,
  }) => (
    <div className={wrapperClassName}>
      <FormControl error={!!errors?.length}>
        {label && <label>{label}</label>}
        <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
          {config.options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.text}
            />
          ))}
        </RadioGroup>
        {errors?.length && <FormHelperText>{errors.join(', ')}</FormHelperText>}
      </FormControl>
    </div>
  ),

  multiSelect: ({
    config,
    value,
    onChange,
    label,
    errors,
    wrapperClassName,
  }) => (
    <div className={wrapperClassName}>
      <FormControl fullWidth error={!!errors?.length}>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          multiple
          value={value}
          onChange={(e) => onChange(e.target.value as [])}
          renderValue={(selected) => selected.join(', ')}
        >
          {config.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
        {errors?.length && <FormHelperText>{errors.join(', ')}</FormHelperText>}
      </FormControl>
    </div>
  ),

  dateTimeInput: ({
    config,
    value,
    onChange,
    label,
    errors,
    wrapperClassName,
  }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={wrapperClassName}>
        <DateTimePicker
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(date) => onChange(date ? date.toISOString() : '')}
          slotProps={{
            textField: {
              error: !!errors?.length,
              helperText: errors?.join(', '),
              fullWidth: true,
            },
          }}
        />
      </div>
    </LocalizationProvider>
  ),
};
