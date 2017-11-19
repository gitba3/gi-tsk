import React, { PropTypes, Component } from "react";
import { ReactMic } from "react-mic";
import { connect } from "react-redux";
import { Field, formValueSelector, change } from "redux-form";
// import AudioRecorder from './audio/AudioRecorder';
import SpeechRecognition from "react-speech-recognition";
import FieldInput from "../../common/FieldInput";

class Dictaphone extends Component {
  componentWillReceiveProps(c, p) {
    if (c.transcript !== p.transcript) {
      c.cb(c.transcript);
    }
  }
  render() {
    const {
      transcript,
      resetTranscript,
      browserSupportsSpeechRecognition,
      startListening,
      abortListening,
      stopListening
    } = this.props;
    console.log(this.props);
    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <div>
        {/*
        <button id="start_reading" type="button" onClick={startListening}>
          Start
        </button>
        <button id="abort_reading" type="button" onClick={abortListening}>
          abortListening
        </button>
        <button id="stop_reading" type="button" onClick={stopListening}>
          stopListening
        </button>
        <button id="reset_reading" type="button" onClick={resetTranscript}>
          resetTranscript
      </button>*/}
        <Field
          type="text"
          name="audio_text"
          label="Audio Text"
          component={FieldInput}
        />
      </div>
    );
  }
}

const Speech = SpeechRecognition({
  autoStart: false
})(Dictaphone);
// const Speech = Dictaphone;

export class CaptureAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      data: {}
    };
  }

  toggleRecording = () => {
    // let button = window.$("start_reading");
    // console.log("button", button.click());
    !this.state.record
      ? this.speech.resetTranscript() & this.speech.startListening()
      : this.speech.stopListening();
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
    // console.log(this.speech);
    return (
      <div className="border border-secondary m-1 p-1 mb-3">
        <p>Record Audio File</p>
        <div className="mx-auto" style={{ width: "100%" }}>
          {true && (
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
          )}
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
            <Speech
              cb={this.props.changeAudioText}
              ref={c => (this.speech = c)}
            />
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
  changeAudioData: val =>
    dispatch(change("ApplicationForm", "audio_data", val)),
  changeAudioText: val => dispatch(change("ApplicationForm", "audio_text", val))
});
export default connect(select, actions)(CaptureAudio);
