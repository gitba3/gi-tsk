import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Field, change, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import FieldInput from "../../common/FieldInput";
const style = {
  width: "100%",
  height: 230
};
const mapStyle = {
  width: "92%",
  height: 150
};
export class MapContainer extends Component {
  state = { position: {} };
  updateValue = c => {
    this.props.changeAddress(c[0].formatted_address);
  };
  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.setState({
          position: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          },
          isLoading: false
        });
        if (this.props.loaded) {
          const Geocoder = window.google.maps.Geocoder;
          const LatLng = window.google.maps.LatLng;
          this.geoCoder = new Geocoder();
          this.geoCoder.geocode(
            {
              latLng: new LatLng(pos.coords.latitude, pos.coords.longitude)
            },
            this.updateValue
          );
        }
      });
    }
  }

  render() {
    const { position, isLoading, address } = this.state;
    return (
      <div>
        <div style={style}>
          <h4>
            <b>5. </b> Location
          </h4>
          <Map
            scrollwheel={false}
            containerStyle={mapStyle}
            style={mapStyle}
            centerAroundCurrentLocation={true}
            visible={this.props.loaded}
            google={this.props.google}
            zoom={15}
            size={{ width: 450, height: 200 }}
          >
            <Marker
              position={position}
              onClick={this.onMarkerClick}
              name={"Current location"}
            />
            <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>{"no"}</h1>
              </div>
            </InfoWindow>
          </Map>
        </div>

        <Field
          // defaultValue={address}
          type="text"
          name="current_address"
          label="Address"
          // value={"Hello"}
          component={FieldInput}
        />
      </div>
    );
  }
}

const selector = formValueSelector("ApplicationForm");
const select = state => ({
  current_address: selector(state, "current_address")
});

const actions = dispatch => ({
  changeAddress: val =>
    dispatch(change("ApplicationForm", "current_address", val))
});
export default connect(select, actions)(
  GoogleApiWrapper({
    apiKey: "AIzaSyDyy_qI9vyHbYAFwCMM9eXUhWywl017p_E"
  })(MapContainer)
);
