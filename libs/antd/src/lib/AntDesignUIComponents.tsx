import Input from 'antd/es/input';
import InputNumber from 'antd/es/input-number';
import Select from 'antd/es/select';
import Checkbox from 'antd/es/checkbox';
import DatePicker from 'antd/es/date-picker';
import Radio from 'antd/es/radio';
import Slider from 'antd/es/slider';
import TimePicker from 'antd/es/time-picker';

import { BasicFormControls, UIComponents } from '@uiformskit/core';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

export const AntDesignUIComponents: UIComponents<BasicFormControls> = {
  textInput: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <Input
        type={config.type ?? 'text'}
        placeholder={config.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {errors &&
        errors.map((error, idx) => (
          <div key={idx} style={{ color: 'red' }}>
            {error}
          </div>
        ))}
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
      {label && <label>{label}</label>}
      <InputNumber
        min={config.min}
        max={config.max}
        value={value}
        onChange={(val) => onChange(val)}
        style={{ width: '100%' }}
      />
      {errors &&
        errors.map((error, idx) => (
          <div key={idx} style={{ color: 'red' }}>
            {error}
          </div>
        ))}
    </div>
  ),

  dropdown: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <Select
        value={value}
        onChange={(val) => onChange(val)}
        style={{ width: '100%' }}
      >
        {config.options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.text}
          </Option>
        ))}
      </Select>
      {errors &&
        errors.map((error, idx) => (
          <div key={idx} style={{ color: 'red' }}>
            {error}
          </div>
        ))}
    </div>
  ),

  checkbox: ({ value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      <label>
        <br />
      </label>
      <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)}>
        {label}
      </Checkbox>
      {errors &&
        errors.map((error, idx) => (
          <div key={idx} style={{ color: 'red' }}>
            {error}
          </div>
        ))}
    </div>
  ),

  dateInput: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <DatePicker
        value={value ? dayjs(value) : null}
        onChange={(date) => onChange(date ? date.toISOString() : '')}
        style={{ width: '100%' }}
        format="YYYY-MM-DD"
        disabledDate={(date) => {
          if (config.minDate && date.isBefore(dayjs(config.minDate))) {
            return true;
          }
          if (config.maxDate && date.isAfter(dayjs(config.maxDate))) {
            return true;
          }
          return false;
        }}
      />
      {errors &&
        errors.map((error, idx) => (
          <div key={idx} style={{ color: 'red' }}>
            {error}
          </div>
        ))}
    </div>
  ),

  textArea: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <TextArea
        rows={config.rows}
        maxLength={config.maxLength}
        placeholder={config.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {errors &&
        errors.map((error, idx) => (
          <div key={idx} style={{ color: 'red' }}>
            {error}
          </div>
        ))}
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
      {label && <label>{label}</label>}
      <Radio.Group value={value} onChange={(e) => onChange(e.target.value)}>
        {config.options.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.text}
          </Radio>
        ))}
      </Radio.Group>
      {errors &&
        errors.map((error, idx) => (
          <div key={idx} style={{ color: 'red' }}>
            {error}
          </div>
        ))}
    </div>
  ),

  slider: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <Slider
        min={config.min}
        max={config.max}
        step={config.step}
        value={value}
        onChange={(val) => onChange(val)}
      />
      {errors &&
        errors.map((error, idx) => (
          <div key={idx} style={{ color: 'red' }}>
            {error}
          </div>
        ))}
    </div>
  ),

  timeInput: ({ config, value, onChange, label, errors, wrapperClassName }) => (
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <TimePicker
        value={value ? dayjs(value, 'HH:mm') : null}
        onChange={(time) => onChange(time ? time.format('HH:mm') : '')}
        format="HH:mm"
        style={{ width: '100%' }}
      />
      {errors &&
        errors.map((error, idx) => (
          <div key={idx} style={{ color: 'red' }}>
            {error}
          </div>
        ))}
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
    <div className={wrapperClassName}>
      {label && <label>{label}</label>}
      <DatePicker
        value={value ? dayjs(value) : null}
        onChange={(date) => onChange(date ? date.toISOString() : '')}
        style={{ width: '100%' }}
        format="YYYY-MM-DD HH:mm"
        showTime={{ format: 'HH:mm' }}
        disabledDate={(date) => {
          if (config.minDateTime && date.isBefore(dayjs(config.minDateTime))) {
            return true;
          }
          if (config.maxDateTime && date.isAfter(dayjs(config.maxDateTime))) {
            return true;
          }
          return false;
        }}
      />
      {errors &&
        errors.map((error, idx) => (
          <div key={idx} style={{ color: 'red' }}>
            {error}
          </div>
        ))}
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
      {label && <label>{label}</label>}
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        value={value}
        onChange={(selectedValues) => onChange(selectedValues)}
        options={config.options.map((option) => ({
          label: option.text,
          value: option.value,
        }))}
      />
      {errors &&
        errors.map((error, idx) => (
          <div key={idx} style={{ color: 'red' }}>
            {error}
          </div>
        ))}
    </div>
  ),
};
