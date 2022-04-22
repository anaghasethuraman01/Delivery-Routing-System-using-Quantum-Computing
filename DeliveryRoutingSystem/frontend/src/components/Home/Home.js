import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Input} from 'reactstrap';
import { Button} from 'react-bootstrap';
import Navbar from '../LandingPage/Navbar';
//Define a Login Component
class Home extends Component {
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
        
          Number of Destinations: <Input className="form-control" type="text" name="username"   ></Input>
          Number of Vehicles: <Input className="form-control" type="text" name="username"   ></Input>
          Choose Algorithm:  :
            <select className="form-control" name=""  >
            <option value="">Select </option> 
              <option value="">QAOA</option> 
              <option value="" >VQE</option>
              <option value=""  >ADMM</option>
            </select>
            <br/>
            <Button variant="success" onClick={this.optimze}>Optimize Route</Button>
            <br/>
       
        </div>
      </div>
    );
  }
}
//export Login Component
export default Home;
