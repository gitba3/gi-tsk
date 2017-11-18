import React, { PropTypes } from "react";

const FieldInputBtn = props => {
  const {
    input,
    type,
    name,
    value,
    label,
    placeholder,
    btnTxt,
    btnAction,
    btnIcon,
    meta: { touched, error, warning }
  } = props;
  return (
    <div className="form-group input-group add-on field">
      <input
        {...input}
        type={type}
        name={name}
        className="form-control"
        placeholder={placeholder}
      />
      <div className="input-group-btn">
        <button onClick={btnAction} type="button" className="btn btn-primary">
          {btnIcon && <i className={btnIcon} aria-hidden="true" />}
          {"  "}
          {btnTxt}
        </button>
      </div>
      {touched &&
        ((error && <p className="text-danger">{error}</p>) ||
          (warning && <p className="text-danger">{warning}</p>))}
    </div>
  );
};

FieldInputBtn.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired
};

export default FieldInputBtn;
