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
      username: "",
      password: "",
      message:null,
      authFlag: false,
      validationErr: {},
    };
    //Bind the handlers to this class
    

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
