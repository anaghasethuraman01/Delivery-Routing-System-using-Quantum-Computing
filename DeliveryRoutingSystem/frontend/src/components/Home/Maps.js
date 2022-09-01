import React, { Component } from "react";
import "../../App.css";
import MapRenderer from './MapRenderer'

//Define a Login Component
class Maps extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      xc: this.props.location.state.xc,
      yc: this.props.location.state.yc,
      x_quantum: this.props.location.state.x_quantum,
      quantum_cost:  this.props.location.state.quantum_cost,
      nodeMap:  this.props.location.state.nodeMap,
      points: [],
      totalDistance:0
    };
    //Bind the handlers to this class
    
    this.results = this.results.bind(this);

  }

 
  //username change handler to update state variable with the text entered by the user

  //password change handler to update state variable with the text entered by the user
  

  results = (e) =>{
    e.preventDefault();
    window.location.href='/results';
  }

render(){
  var ids = Object.keys(this.state.nodeMap);
  var values = Object.values(this.state.nodeMap);
  for(let i=0;i<this.state.xc.length;i++){
    this.state.points.push({
      id: ids[i],
      title:values[i],
      lat:this.state.xc[i],
      lng:this.state.yc[i]
    });
  }


  return (
    <div>
    <div>
    <MapRenderer
      googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCW_z0jpZ5YrhNdywn5D8b7p7Qc39CIogg' +
        '&libraries=geometry,drawing,places'
      }
      markers={this.state.points}
      // loadingElement={<div style={{height: `120%`}}/>}
      // containerElement={<div style={{height: `80vh`}}/>}
      // mapElement={ <div style={{height: `120%`, marginLeft:`30%`}}/>}
      loadingElement={<div style={{height: `100%`}}/>}
      containerElement={<div style={{height: "80vh"}}/>}
      mapElement={ <div style={{height: `100%`}}/>}
      defaultCenter={{lat: 25.798939, lng: -80.291409}}
      defaultZoom={15}
    />
    </div>
    </div>
  );

      }
    }

export default Maps;
