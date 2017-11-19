import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as applicationAction from "../../action/ApplicationAction";
import ApplicationForm from "./ApplicationForm"; // eslint-disable-line import/no-named-as-default
import { authorsFormattedForDropdown } from "../../selectors/selectors"; // eslint-disable-line import/no-named-as-default

export class AddOrEditApplicationContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.props.action
      .getApplicationAction(this.props.match.params.id)
      .catch(error => {
        toastr.error(error);
      });
  }

  handleSave(values) {
    const we = values;
    this.props.action
      .saveApplicationAction(values)
      .then(() => {
        toastr.success("Application saved");
        this.props.history.push("/applications");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/applications");
  }

  render() {
    const { initialValues } = this.props;
    const heading =
      initialValues && initialValues.id
        ? "Edit Application"
        : "New Application";

    return (
      <div className="container-fluid">
        <ApplicationForm
          heading={heading}
          handleSave={this.handleSave}
          handleCancel={this.handleCancel}
          initialValues={this.props.initialValues}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const applicationId = ownProps.match.params.id; //from the path '/application/:id'

  if (
    applicationId &&
    state.selectedApplicationReducer.application &&
    applicationId === state.selectedApplicationReducer.application.id
  ) {
    return {
      initialValues: state.selectedApplicationReducer.application
    };
  }
  return {
    initialValues: undefined
  };
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(applicationAction, dispatch)
});

AddOrEditApplicationContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AddOrEditApplicationContainer
);
