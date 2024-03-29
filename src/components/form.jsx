import React from 'react';
import {
  Tooltip,
  Icon,
  DatePicker as AntdDatePicker,
  TimePicker as AntdTimePicker,
  Select as AntdSelect,
  Input,
  InputNumber as AntdInputNumber,
  Tag,
  Switch,
} from 'antd';
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input';

import moment from 'moment';

const { Option } = AntdSelect;
const tooltipColor = 'rgb(201, 195, 195)';
const { TextArea } = Input;

/*
 * Input Text
 */
const InputText = ({
  name,
  value,
  label,
  labelStyle,
  col,
  tooltip,
  required,
  disabled,
  placeholder,
  handleChange,
  error,
}) => (
  <div className={`col-md-${col}`}>
    <div className={`form-group ${!!error && 'is-invalid'}`}>
      <label className="control-label" style={labelStyle}>
        {label}
        <span style={{ color: 'transparent' }}>.</span>
        {required && <span className="text-danger"> * </span>}
        {!!tooltip && (
          <Tooltip title={tooltip}>
            <Icon type="question-circle-o" style={{ color: tooltipColor }} />
          </Tooltip>
        )}
      </label>
      <Input
        name={name}
        onChange={handleChange}
        value={value}
        style={{ width: '100%' }}
        disabled={disabled}
        placeholder={placeholder}
      />
      <small className="help-block">{!!error && <span>{error}</span>}</small>
    </div>
  </div>
);

/*
 * Input Text Mask
 */
const InputTextMask = ({
  mask,
  name,
  value,
  label,
  col,
  tooltip,
  required,
  disabled,
  handleChange,
  error,
}) => (
  <div className={`col-md-${col}`}>
    <div className={`form-group ${!!error && 'is-invalid'}`}>
      <label className="control-label">
        {label}
        <span style={{ color: 'transparent' }}>.</span>
        {required && <span className="text-danger"> * </span>}
        {!!tooltip && (
          <Tooltip title={tooltip}>
            <Icon type="question-circle-o" style={{ color: tooltipColor }} />
          </Tooltip>
        )}
      </label>
      <InputMask
        name={name}
        value={value}
        onChange={handleChange}
        type="text"
        mask={mask}
        className="form-control"
        disabled={disabled}
      />
      <small className="help-block">{!!error && <span>{error}</span>}</small>
    </div>
  </div>
);

/*
 * Input Text Mask
 */
const InputCurrency = ({
  value,
  label,
  col,
  tooltip,
  required,
  labelStyle,
  handleChange,
  error,
}) => (
  <div className={`col-md-${col}`}>
    <div className={`form-group ${!!error && 'is-invalid'}`}>
      <label className="control-label" style={labelStyle}>
        {label}
        <span style={{ color: 'transparent' }}>.</span>
        {required && <span className="text-danger"> * </span>}
        {!!tooltip && (
          <Tooltip title={tooltip}>
            <Icon type="question-circle-o" style={{ color: tooltipColor }} />
          </Tooltip>
        )}
      </label>
      <CurrencyInput
        className="ant-input"
        decimalSeparator=","
        thousandSeparator="."
        precision="2"
        value={value}
        onChangeEvent={handleChange}
      />
      <small className="help-block">{!!error && <span>{error}</span>}</small>
    </div>
  </div>
);

const FormInputButton = ({
  onChange,
  value,
  onFocus,
  onKeyUp,
  onClick,
  col,
  mask,
  label,
  required,
  icon,
  disabled,
  tooltip,
  touched,
  error,
  warning,
}) => (
  <div className={`col-md-${col}`}>
    <div className="form-group">
      <label className="control-label">
        {label}
        {required && <span className="text-danger"> * </span>}
        {tooltip && (
          <Tooltip title={tooltip}>
            <Icon type="question-circle-o" style={{ color: tooltipColor }} />
          </Tooltip>
        )}
      </label>
      <div className="input-group">
        <InputMask
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onKeyUp={onKeyUp}
          type="text"
          mask={mask}
          className="form-control"
          disabled={disabled}
        />
        <span className="input-group-btn">
          <button type="button" onClick={onClick} className="btn btn-primary">
            <i className={`fa fa-${icon}`} />
          </button>
        </span>
      </div>
      {errorMessage(touched, warning, error)}
    </div>
  </div>
);

const errorMessage = (touched, warning, error) => (
  <small className="help-block">
    {touched &&
      ((error && <span className="text-danger">{error}</span>) ||
        (warning && <span className="text-warning">{warning}</span>))}
  </small>
);

/*
 * Input Text
 */
const InputTextArea = ({
  name,
  value,
  label,
  col,
  tooltip,
  required,
  disabled,
  placeholder,
  handleChange,
  error,
  maxLength,
}) => (
  <div className={`col-md-${col}`}>
    <div className={`form-group ${!!error && 'is-invalid'}`}>
      <label className="control-label">
        {label}
        <span style={{ color: 'transparent' }}>.</span>
        {required && <span className="text-danger"> * </span>}
        {!!tooltip && (
          <Tooltip title={tooltip}>
            <Icon type="question-circle-o" style={{ color: tooltipColor }} />
          </Tooltip>
        )}
      </label>
      <TextArea
        name={name}
        onChange={handleChange}
        value={value}
        style={{ width: '100%' }}
        rows={6}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <small className="help-block">{!!error && <span>{error}</span>}</small>
      {maxLength ? (
        <small>
          <span className="col-md-12">
            Caracteres: {value ? value.length : '0'} / {maxLength}
          </span>
        </small>
      ) : (
        ''
      )}
    </div>
  </div>
);

/*
 * Tag Text
 */
const TagText = ({ value, label, col, tooltip }) => (
  <div className={`col-md-${col}`}>
    <div className={`form-group`}>
      <label className="control-label">
        {label}
        <span style={{ color: 'transparent' }}>.</span>
        {!!tooltip && (
          <Tooltip title={tooltip}>
            <Icon type="question-circle-o" style={{ color: tooltipColor }} />
          </Tooltip>
        )}
      </label>
      <div className="row" style={{ marginLeft: 10 }}>
        {value ? <Tag color="green">Sim</Tag> : <Tag color="red">Não</Tag>}
      </div>
    </div>
  </div>
);

/*
 * Switch
 */
const SwitchText = ({ value, label, col, tooltip, handleChange }) => (
  <div className={`col-md-${col}`}>
    <div className={`form-group`}>
      <label className="control-label">
        {label}
        <span style={{ color: 'transparent' }}>.</span>
        {!!tooltip && (
          <Tooltip title={tooltip}>
            <Icon type="question-circle-o" style={{ color: tooltipColor }} />
          </Tooltip>
        )}
      </label>
      <div className="row" style={{ marginLeft: 5 }}>
        <Switch checked={value} onChange={handleChange} />
      </div>
    </div>
  </div>
);

/*
 * Input Password
 */
const InputPassword = ({
  name,
  value,
  label,
  col,
  ref,
  tooltip,
  required,
  disabled,
  placeholder,
  handleChange,
  error,
}) => (
  <div className={`col-md-${col}`}>
    <div className={`form-group ${!!error && 'is-invalid'}`}>
      <label className="control-label">
        {label}
        <span style={{ color: 'transparent' }}>.</span>
        {required && <span className="text-danger"> * </span>}
        {!!tooltip && (
          <Tooltip title={tooltip}>
            <Icon type="question-circle-o" style={{ color: tooltipColor }} />
          </Tooltip>
        )}
      </label>
      <Input.Password
        name={name}
        ref={ref}
        onChange={handleChange}
        value={value}
        style={{ width: '100%' }}
        disabled={disabled}
        placeholder={placeholder}
      />
      <small className="help-block">{!!error && <span>{error}</span>}</small>
    </div>
  </div>
);

/*
 * Input Number
 */
const InputNumber = ({
  name,
  value,
  label,
  col,
  tooltip,
  required,
  handleChange,
  disabled,
  min,
  max,
  error,
}) => (
  <div className={`col-md-${col}`}>
    <div className={`form-group ${!!error && 'is-invalid'}`}>
      <label className="control-label">
        {label}
        <span style={{ color: 'transparent' }}>.</span>
        {required && <span className="text-danger"> * </span>}
        {!!tooltip && (
          <Tooltip title={tooltip}>
            <Icon type="question-circle-o" style={{ color: tooltipColor }} />
          </Tooltip>
        )}
      </label>
      <AntdInputNumber
        name={name}
        onChange={handleChange}
        disabled={disabled}
        min={min}
        max={max}
        value={value}
        style={{ width: '100%' }}
      />
      <small className="help-block">{!!error && <span>{error}</span>}</small>
    </div>
  </div>
);

/*
 * Date Picker
 */
const DatePicker = ({
  name,
  value,
  label,
  col,
  tooltip,
  required,
  handleChange,
  error,
  disabled,
  styleLabel,
}) => (
  <div className={`col-md-${col}`}>
    <div className={`form-group ${!!error && 'is-invalid'}`}>
      <label className="control-label" style={styleLabel}>
        {label}
        <span style={{ color: 'transparent' }}>.</span>
        {required && <span className="text-danger"> * </span>}
        {!!tooltip && (
          <Tooltip title={tooltip}>
            <Icon type="question-circle-o" style={{ color: tooltipColor }} />
          </Tooltip>
        )}
      </label>
      <AntdDatePicker
        name={name}
        onChange={handleChange}
        format="DD/MM/YYYY"
        value={value ? moment(value, 'YYYY/MM/DD') : null}
        style={{ width: '100%' }}
        disabled={disabled}
      />
      <small className="help-block">{!!error && <span>{error}</span>}</small>
    </div>
  </div>
);

/*
 * Time Picker
 */
const TimePicker = ({
  name,
  value,
  label,
  col,
  tooltip,
  required,
  handleChange,
  error,
  placeholder,
}) => (
  <div className={`col-md-${col}`}>
    <div className={`form-group ${!!error && 'is-invalid'}`}>
      <label className="control-label">
        {label}
        <span style={{ color: 'transparent' }}>.</span>
        {required && <span className="text-danger"> * </span>}
        {!!tooltip && (
          <Tooltip title={tooltip}>
            <Icon type="question-circle-o" style={{ color: tooltipColor }} />
          </Tooltip>
        )}
      </label>
      <AntdTimePicker
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        format="HH:mm"
        value={value ? moment(value, 'HH:mm') : null}
        minuteStep={10}
        style={{ width: '100%' }}
      />
      <small className="help-block">{!!error && <span>{error}</span>}</small>
    </div>
  </div>
);

/*
 * Select
 */
const SelectAntd = ({
  name,
  value,
  dataSource,
  showSearch,
  label,
  col,
  tooltip,
  required,
  handleChange,
  error,
  onSearch,
  disabled,
  loading,
}) => (
  <div className={`col-md-${col}`}>
    <div className={`form-group ${!!error && 'is-invalid'}`}>
      <label className="control-label">
        {label}
        {required && <span className="text-danger"> * </span>}
        {tooltip && (
          <Tooltip title={tooltip}>
            <Icon type="question-circle-o" style={{ color: tooltipColor }} />
          </Tooltip>
        )}
      </label>
      <AntdSelect
        showSearch={showSearch}
        allowClear
        name={name}
        optionFilterProp="children"
        onChange={handleChange}
        value={value}
        style={{ width: '100%' }}
        disabled={disabled}
        onSearch={onSearch}
        loading={loading}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
        {dataSource.map(p => (
          <Option key={p.id} value={p.description}>
            {p.description}
          </Option>
        ))}
      </AntdSelect>
      <small className="help-block">{!!error && <span>{error}</span>}</small>
    </div>
  </div>
);

/*
 * SelectCode
 */
const SelectCode = ({
  name,
  value,
  dataSource,
  styles,
  showSearch,
  onSearch,
  label,
  col,
  tooltip,
  required,
  handleChange,
  error,
  disabled,
  loading,
}) => (
  <div className={`col-md-${col}`}>
    <div className={`form-group ${!!error && 'is-invalid'}`}>
      <label className="control-label" style={styles}>
        {label}
        {required && <span className="text-danger"> * </span>}
        {tooltip && (
          <Tooltip title={tooltip}>
            <Icon type="question-circle-o" style={{ color: tooltipColor }} />
          </Tooltip>
        )}
      </label>
      <AntdSelect
        name={name}
        optionFilterProp="children"
        allowClear
        showSearch={showSearch}
        onSearch={onSearch}
        onChange={handleChange}
        value={value}
        style={{ width: '100%' }}
        disabled={disabled}
        loading={loading}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
        {dataSource.map(p => (
          <Option key={p.id} value={p.id}>
            {p.description}
          </Option>
        ))}
      </AntdSelect>
      <small className="help-block">{!!error && <span>{error}</span>}</small>
    </div>
  </div>
);

/*
 * Lista de Definição
 */
const DefinitionList = ({ children, col }) => (
  <div className={`col-md-${col}`}>
    <dl className="dl-horizontal">{children}</dl>
  </div>
);

const DefinitionListItem = ({ label, children }) => (
  <>
    <dt>{label}</dt>
    <dd>{children}</dd>
  </>
);

export {
  InputText,
  InputPassword,
  InputNumber,
  FormInputButton,
  DatePicker,
  TimePicker,
  SelectAntd,
  SelectCode,
  DefinitionList,
  DefinitionListItem,
  TagText,
  SwitchText,
  InputTextArea,
  InputTextMask,
  InputCurrency,
};
