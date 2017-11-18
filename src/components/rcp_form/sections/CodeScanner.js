import React, { PropTypes, Component } from "react";
import { Field, change, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import FieldInputBtn from "../../common/FieldInputBtn";

class CodeScanner extends Component {
  state = { scanning: false };
  scanner = null;

  setScannedText = result => {
    this.props.changeCodeValue(result.code);
    this.stopScanning();
  };
  stopScanning = () => {
    this.setState({ scanning: false }, () => this.scanner.stop());
  }
  componentDidMount() {
    const txt =
      "innerText" in HTMLElement.prototype ? "innerText" : "textContent";
    const arg = {
      resultFunction: this.setScannedText,
      successTimeout: 500
    };
    const WebCodeCamJS = window.WebCodeCamJS;
    const canvas = document.querySelector("#scanner-canvas");
    this.scanner = new WebCodeCamJS(canvas).init(arg);
    // this.scanner = window.codeScanner;
  }

  render() {
    return (
      <div>
        <p>Scan your Item</p>
        <div className="mx-auto" style={{ width: 320 }}>
          <canvas
            id="scanner-canvas"
            className={`${this.state.scanning ? "" : "scanner-hide"}`}
          />
          {this.state.scanning && (
            <button
              type="button"
              className="mt-3 mb-3 btn btn-outline-danger"
              onClick={this.stopScanning}
            >
              Cancel
            </button>
          )}
        </div>
        <Field
          type="text"
          name="code_text"
          label="Code Value"
          placeholder={"Scan Code"}
          props={{
            btnTxt: "Scan",
            btnIcon: "fa fa-qrcode",
            btnAction: () =>
              this.setState({ scanning: true }, () => this.scanner.play())
          }}
          component={FieldInputBtn}
        />
      </div>
    );
  }
}

const selector = formValueSelector("ApplicationForm");
const select = state => ({
  code_text: selector(state, "code_text")
});

const actions = dispatch => ({
  changeCodeValue: val => dispatch(change("ApplicationForm", "code_text", val))
});
export default connect(select, actions)(CodeScanner);
