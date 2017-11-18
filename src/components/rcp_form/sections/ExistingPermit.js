import React, { PropTypes, Component } from "react";

import { Field, change, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import FieldInput from "../../common/FieldInput";

const ExistingPermit = ({ isRenew, changePermitType }) => {
  return (
    <div>
      <div>
        <h4>
          <b>2.</b> Are you seeking to renew an existing Road Corridor Permit?
        </h4>
        <div className="btn-group" data-toggle="buttons">
          <label
            onClick={() => changePermitType("renew")}
            className={`btn ${isRenew ? "btn-success" : "btn-secondary"}`}
          >
            {"Yes"}
          </label>
          <label
            onClick={() => changePermitType("new")}
            className={`btn ${!isRenew ? "btn-success" : "btn-secondary"}`}
          >
            {"No"}
          </label>
        </div>
      </div>
      {isRenew && (
        <div>
          <Field
            type="text"
            name="permit_number"
            label="Existing Road Corridor Permit No."
            component={FieldInput}
          />
          <Field
            type="date"
            name="required_expiry_date"
            label="Required expiry date"
            component={FieldInput}
          />
        </div>
      )}
      <Field type="hidden" name="permit_type" label="" component={FieldInput} />
    </div>
  );
};

const selector = formValueSelector("ApplicationForm");
const select = state => {
  const isRenew = selector(state, "permit_type") === "renew";
  return {
    isRenew
  };
};

const actions = dispatch => ({
  changePermitType: val =>
    dispatch(change("ApplicationForm", "permit_type", val))
});

export default connect(select, actions)(ExistingPermit);
