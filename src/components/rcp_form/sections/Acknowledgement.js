import React, { PropTypes } from "react";
import { Field, formValueSelector, change } from "redux-form";
import { connect } from "react-redux";

import FieldInput from "../../common/FieldInput";

const Individual = () => (
  <div>
    <Field
      type="text"
      name="ind_sign"
      label="Signature(s)"
      component={FieldInput}
    />
    <Field
      type="date"
      name="ind_sign_date"
      label="Date"
      component={FieldInput}
    />
  </div>
);

const Corporate = () => (
  <div>
    <Field
      type="text"
      name="company_name"
      label="Company name"
      component={FieldInput}
    />
    <Field type="text" name="acn" label="ACN" component={FieldInput} />
    <Field
      type="text"
      name="director_name"
      label="Director name (in full)"
      component={FieldInput}
    />
    <Field
      type="text"
      name="director_sign"
      label="Signed (Director)"
      component={FieldInput}
    />
  </div>
);

const Acknowledgement = ({ changeApplicantType, isIndividual }) => (
  <div>
    <Field
      type="hidden"
      name="applicant_type"
      label=""
      component={FieldInput}
    />
    <p>I / We the applicant(s)</p>
    <div className="btn-group" data-toggle="buttons">
      <label
        onClick={() => changeApplicantType("ind")}
        className={`btn ${isIndividual ? "btn-info" : "btn-secondary"}`}
      >
        {"Individual"}
      </label>
      <label
        onClick={() => changeApplicantType("corp")}
        className={`btn ${!isIndividual ? "btn-info" : "btn-secondary"}`}
      >
        {"Corporate"}
      </label>
    </div>
    {isIndividual ? <Individual /> : <Corporate />}
  </div>
);

const selector = formValueSelector("ApplicationForm");
const select = state => {
  const isIndividual = selector(state, "applicant_type") === "ind";
  return {
    isIndividual
  };
};

const actions = dispatch => ({
  changeApplicantType: val =>
    dispatch(change("ApplicationForm", "applicant_type", val))
});
export default connect(select, actions)(Acknowledgement);
