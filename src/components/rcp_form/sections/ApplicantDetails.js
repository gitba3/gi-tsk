import React, { PropTypes } from "react";

import { Field } from "redux-form";
import FieldInput from "../../common/FieldInput";

const ApplicantDetails = () => (
  <div>
    <h4>
      <b>1.</b> Applicant details
    </h4>
    <Field
      type="text"
      name="name"
      label="Name / Company name"
      component={FieldInput}
    />
    <Field
      type="text"
      name="position"
      label="Position in company (if applicable)"
      component={FieldInput}
    />
    <Field
      type="text"
      name="contact_name"
      label="Contact name (if different to above)"
      component={FieldInput}
    />
    <Field
      type="textarea"
      name="postal_address"
      label="Postal address"
      component={FieldInput}
    />
    <Field
      type="textarea"
      name="residential_address"
      label="Residential address"
      component={FieldInput}
    />
    <Field
      type="number"
      name="phone_number"
      label="Phone number"
      component={FieldInput}
    />
    <Field
      type="number"
      name="fax_number"
      label="Fax number"
      component={FieldInput}
    />
    <Field
      type="number"
      name="mobile_number"
      label="Mobile number"
      component={FieldInput}
    />
    <Field type="email" name="email" label="Email" component={FieldInput} />
  </div>
);

export default ApplicantDetails;
