import React, { PropTypes, Component } from "react";
import Webcam from "react-webcam";
import Modal from "react-bootstrap-modal";
import { Field, formValueSelector, change } from "redux-form";
import FieldInput from "../../common/FieldInput";
import { connect } from "react-redux";

class Capture extends Component {
  state = { open: false };
  setRef = webcam => {
    this.webcam = webcam;
  };

  saveAndClose = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.props.changeValue("image_data", imageSrc);
    this.closeModal();
  };
  closeModal = () => this.setState({ open: false });
  openModal = () => this.setState({ open: true });
  render() {
    return (
      <div className="border border-secondary m-1 p-1 align-middle">
        <p>Capture Photo</p>
        {/*<Modal
          show={this.state.open}
          onHide={this.closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id="ModalHeader">Capture Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Webcam
              audio={false}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
            />
          </Modal.Body>
          <Modal.Footer>
            // If you don't have anything fancy to do you can use // the
            convenient `Dismiss` component, it will // trigger `onHide` when
            clicked
            <Modal.Dismiss className="btn btn-default">Cancel</Modal.Dismiss>
            // Or you can create your own dismiss buttons
            <button className="btn btn-primary" onClick={this.saveAndClose}>
              Save
            </button>
          </Modal.Footer>
        </Modal>*/}
        {this.state.open && (
          <Webcam
            audio={false}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
          />
        )}
        <div>
          {!this.state.open && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.openModal}
            >
              Capture
            </button>
          )}
          {this.state.open && (
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.saveAndClose}
              >
                Save Photo
              </button>
              <button
                type="button"
                className="btn btn-outline-danger ml-2"
                onClick={this.closeModal}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <Field
          type="hidden"
          name="image_data"
          label=""
          component={FieldInput}
        />
      </div>
    );
  }
}
const selector = formValueSelector("ApplicationForm");
const select = state => ({
  image_data: selector(state, "image_data")
});

const actions = dispatch => ({
  changeValue: (field, val) => dispatch(change("ApplicationForm", field, val))
});
export default connect(select, actions)(Capture);
