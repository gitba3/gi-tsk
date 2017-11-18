import React, { PropTypes, Component } from "react";
import { Field, reduxForm, change } from "redux-form";
import FieldInput from "../common/FieldInput";
import SelectInput from "../common/SelectInput";
import ApplicantDetails from "./sections/ApplicantDetails";
import ExistingPermit from "./sections/ExistingPermit";
import MapContainer from "./sections/MapDetails";
import CodeScanner from "./sections/CodeScanner";
import CapturePhoto from "./sections/CapturePhoto";
import CaptureAudio from "./sections/CaptureAudio";
import ApprovalDuration from "./sections/ApprovalDuration";
import Acknowledgement from "./sections/Acknowledgement";
import Description from "./sections/Description";

export class ApplicationForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      heading,
      authors,
      handleSave,
      handleCancel
    } = this.props;
    return (
      <form onSubmit={null}>
        <h1>{heading}</h1>
        {
          <div>
            <ApplicantDetails />
            <ExistingPermit />
            <ApprovalDuration />
            <Description />
            <MapContainer />
            <CodeScanner />
            <CaptureAudio />
            <CapturePhoto />
            <Acknowledgement />
          </div>
        }

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            onClick={handleSubmit(handleSave)}
          >
            <i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit
          </button>

          {heading === "New Application" && (
            <button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
              className="btn btn-default btn-space"
            >
              Clear Values
            </button>
          )}

          <button
            type="button"
            className="btn btn-default btn-space"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = "Required";
  }

  if (!values.category) {
    errors.category = "Required";
  }

  if (!values.length) {
    errors.length = "Required";
  }

  if (!values.authorId) {
    errors.authorId = "Required";
  }

  return errors;
};

ApplicationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "ApplicationForm"
  // validate
})(ApplicationForm);
