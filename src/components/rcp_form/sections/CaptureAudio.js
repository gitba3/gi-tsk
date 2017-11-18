import React, { PropTypes, Component } from "react";
import { ReactMic } from "react-mic";
import { connect } from "react-redux";
import { Field, formValueSelector, change } from "redux-form";

import FieldInput from "../../common/FieldInput";

export class CaptureAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      data: {}
    };
  }

  toggleRecording = () => {
    this.setState({
      record: !this.state.record
    });
  };

  onStop = data => {
    const reader = new window.FileReader();
    reader.readAsDataURL(data.blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      // console.log(base64data);
      this.setState({ data, base64data }, () =>
        this.props.changeAudioData(base64data)
      );
    };
  };

  render() {
    const { record, data } = this.state;
    return (
      <div>
        <p>Record Audio File</p>
        <div className="mx-auto" style={{ width: 320 }}>
          <ReactMic
            width={320}
            mimeType="audio/wav"
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            strokeColor="#007bff"
            backgroundColor="#fff"
            // visualSetting=""
          />
          <div>
            <audio
              ref="audioSource"
              controls="controls"
              src={this.props.audio_data}
            />
          </div>
          <div className="mb-2 mt-2">
            {record ? (
              <button
                className="btn btn-outline-danger"
                onClick={this.toggleRecording}
                type="button"
              >
                <i className="fa fa-stop" aria-hidden="true" />
                {" Stop"}
              </button>
            ) : (
              <button
                className="btn btn-outline-primary"
                onClick={this.toggleRecording}
                type="button"
              >
                <i className="fa fa-play" aria-hidden="true" />
                {" Start"}
              </button>
            )}
          </div>
        </div>
        <Field
          // defaultValue={address}
          type="hidden"
          name="audio_data"
          label=""
          // value={"Hello"}
          component={FieldInput}
        />
      </div>
    );
  }
}
const selector = formValueSelector("ApplicationForm");
const select = state => ({
  audio_data: selector(state, "audio_data")
});
const actions = dispatch => ({
  changeAudioData: val => dispatch(change("ApplicationForm", "audio_data", val))
});
export default connect(select, actions)(CaptureAudio);
