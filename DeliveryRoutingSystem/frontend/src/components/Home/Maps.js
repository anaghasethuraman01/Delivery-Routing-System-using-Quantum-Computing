import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Input} from 'reactstrap';
import { Button} from 'react-bootstrap';
import Navbar from '../LandingPage/Navbar';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'

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
      points: []
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
  console.log(this.state.points);

  return (
    <div className="App">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCW_z0jpZ5YrhNdywn5D8b7p7Qc39CIogg",
          language: "en",
          region: "US"
        }}
        defaultCenter={{ lat: 39.50, lng: -98.35}}
        defaultZoom={-20}
      >
        {this.state.points.map(({ lat, lng, id, title }) => {
          return (
            <Marker
              key={id}
              lat={lat}
              lng={lng}
              text={id}
              tooltip={title}
            />
            
          );
        })}
      </GoogleMapReact>
    </div>
  );

      }
    }


 
//export Login Component
export default Maps;
