import React, { Component, useState } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Input} from 'reactstrap';
import { Button} from 'react-bootstrap';
import Navbar from '../LandingPage/Navbar';
//Define a Login Component
function Screen(props) {
  //call the constructor method
    const[qubits, setQubits] = useState('');
    const[route, setRoute] = useState('');
    const[algo, setAlgo] = useState('');
    const[quantumComputer, setQuantumComputer] = useState('');
    return (
      <div className="background1" >
        
        <h1 className="heading">{algo} statistics for {quantumComputer}</h1>
        <div className = " main-div1">
          
       
        </div>
      </div>
    );
}
//export Login Component
export default Screen;
