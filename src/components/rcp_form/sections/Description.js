import React, { PropTypes } from "react";

import { Field } from "redux-form";
import FieldInput from "../../common/FieldInput";

const Description = () => (
  <div>
    <h4>
      <b>4.</b> Description of works, structures or activities you intend to
      carry out
    </h4>
    <Field
      type="text"
      name="description"
      label="Description"
      component={FieldInput}
    />
  </div>
);

export default Description;
