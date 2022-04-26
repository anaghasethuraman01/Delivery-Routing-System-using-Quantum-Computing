import React, { Component } from 'react';
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker,
    DirectionsRenderer
  } from "react-google-maps";


  class MapDirectionsRenderer extends Component {
    state = {
      directions: null,
      error: null
        };
  
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
          } else {
            this.setState({ error: result });
          }
        }
      );
    }
  
    render() {
      if (this.state.error) {
        return <h1>{this.state.error}</h1>;
      }
      return (this.state.directions && <DirectionsRenderer directions={this.state.directions} />)
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