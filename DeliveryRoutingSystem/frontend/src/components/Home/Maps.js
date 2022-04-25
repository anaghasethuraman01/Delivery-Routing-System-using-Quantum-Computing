import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Input} from 'reactstrap';
import { Button} from 'react-bootstrap';
import Navbar from '../LandingPage/Navbar';
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



  render() {
    

    return (
      
      <div className="background1" >
        
        <h1 className="heading">Optimize Routes, Save Time</h1>
        <div className = " main-div1">
        
          <h1>Map here</h1>
          <br/>
            <Button variant="success" onClick={this.results}>View Results</Button>
            <br/>
        </div>
      </div>
    );
  }
}
//export Login Component
export default Maps;
