import React, { Component } from 'react';
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker,
    DirectionsRenderer
  } from "react-google-maps";
import "../../App.css";
import { Button } from "react-bootstrap";


class MapDirectionsRenderer extends Component {
  state = {
    directions: null,
    error: null,
    totalDistance: 0,
    totalDuration:0
      };

      nextRoute = () => {
        let index = parseInt(localStorage.getItem('index'));
        let length = parseInt(localStorage.getItem('length'));
        if(index<length-1){
        localStorage.setItem('index', parseInt(index)+1);
        window.location.reload(false);
      }
    }
    
    prevRoute = () => {
      let index = parseInt(localStorage.getItem('index'));
      if(index>0){
      localStorage.setItem('index', parseInt(index)-1);
      window.location.reload(false);
    }
    }

  componentDidMount() {
    const { places, travelMode } = this.props;
    const waypoints = places.map(p =>({
        location: {lat: p.lat, lng:p.lng},
        stopover: true
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;
    
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
          var legs = this.state.directions.routes[0].legs;
          let dist = 0;
          var time = 0;
          for(let i=0;i<legs.length;i++){
                dist = dist + legs[i].distance.value;
                time = time + legs[i].duration.value;
          }
          dist = parseFloat(dist*0.000621371192).toFixed(2);
          time = parseFloat(time*0.000277778*60).toFixed(2);
          
          this.setState({
            totalDistance : dist,
            totalDuration: time
          });

        } else {
          this.setState({ error: result });
        }
      }
    );

  }

  sendData = () => {
    this.props.parentCallback(this.state.totalDistance);
}

  render() {
    if (this.state.error) {
      return <h1>{this.state.error}</h1>;
    }
  let nextButton;
  let prevButton;
  let index = parseInt(localStorage.getItem('index'));
  let length = parseInt(localStorage.getItem('length'));
  if(index<length-1){
    nextButton = <Button className="nextButton"variant="success" onClick={() => this.nextRoute()}>Next</Button>
  }
  else {nextButton = null;}

  if(index>0){
    prevButton  = <Button className="prevButton"variant="success" onClick={() => this.prevRoute()}>Previous</Button>
  }
  else {prevButton = null;}

    return (this.state.directions &&
      <div>  
      <div>
      <DirectionsRenderer directions={this.state.directions} />
    </div>
      <div className="details">
      <div><h4>Vehicle {index+1}</h4> </div>
        <div> Total Distance: {this.state.totalDistance} miles</div>
        <div> Total Duration: {this.state.totalDuration} minutes</div>
        <div>{prevButton} {nextButton}</div>
      </div>
      </div>
      )
  }
}

const MapRenderer = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >

      {props.markers.map((marker, index) => {
        const position = { lat: marker.latitude, lng: marker.longitude };
          return <Marker 
          key={index} position={position} />;
      })}
      <MapDirectionsRenderer
        places={props.markers}
        travelMode={window.google.maps.TravelMode.DRIVING}
      />
    </GoogleMap>
  ))
);

export default MapRenderer;