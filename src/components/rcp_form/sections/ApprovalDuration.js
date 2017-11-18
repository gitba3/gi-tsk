import React, { PropTypes } from "react";

import { Field } from "redux-form";
import FieldInput from "../../common/FieldInput";

const ApprovalDuration = () => (
  <div>
    <h4><b>3.</b> Duration of approval sought</h4>
    <Field
      type="time"
      name="duration_from"
      label="From"
      component={FieldInput}
    />
    <Field
      type="time"
      name="duration_to"
      label="To"
      component={FieldInput}
    />
  </div>
);

export default ApprovalDuration;
