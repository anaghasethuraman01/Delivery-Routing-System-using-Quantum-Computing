import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Input} from 'reactstrap';
import { Button} from 'react-bootstrap';
import Navbar from '../LandingPage/Navbar';
//Define a Login Component
class Results extends Component {
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
  

  optimze = (e) =>{
    e.preventDefault();
    window.location.href='/maps';
  }



  render() {
    

    return (
      
      <div className="background1" >
        
        <h1 className="heading">Optimize Routes, Save Time</h1>
        <div className = " main-div1">
        
          <h1>Graphs here</h1>
       
        </div>
      </div>
    );
  }
}
//export Login Component
export default Results;
