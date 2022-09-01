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
      error: null,
      totalDistance: 0,
      totalDuration:0
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
            var legs = this.state.directions.routes[0].legs;
            let dist = 0;
            var time = 0;
            for(let i=0;i<legs.length;i++){
                  dist = dist + legs[i].distance.value;
                  time = time + legs[i].duration.value;
            }
            dist = parseInt(dist*0.000621371192);
            time = parseInt(time*0.000277778);
            
            this.setState({
              totalDistance : dist,
              totalDuration: time
            });

          console.log('Total Distance: ', this.state.totalDistance);
          console.log('Total duration: ', this.state.totalDuration );
          console.log("Markers: ", this.sendData);

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