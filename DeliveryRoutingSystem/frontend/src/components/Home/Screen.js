import React, { Component, useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Input, Label} from 'reactstrap';
import { Button} from 'react-bootstrap';
import Navbar from '../LandingPage/Navbar';
import QuantumFlow from '../Home/QuantumFlow';
//Define a Login Component
function Screen(props) {
  //call the constructor method
    const[qubits, setQubits] = useState(props.location.state.qubit_needed);
    const[route, setRoute] = useState('');
    const[algo, setAlgo] = useState(props.location.state.algo.toUpperCase());
    const[redirectVal, setRedirectVal] = useState(null);
    const[quantumComputer, setQuantumComputer] = useState('Qiskit');
    useEffect(()=> {
        
    },[])
    const redirectTo = (e) => {
        let state = {};
        if(algo == 'classical') {
            state = {
                x: props.location.state.x,
                z: props.location.state.z,
                classical_cost: props.location.state.classical_cost
            }
        } else {
            state = {
                xc: props.location.state.xc,
                yc: props.location.state.yc,
                x_quantum: props.location.state.x_quantum,
                quantum_cost:props.location.state.quantum_cost,
                nodeMap:props.location.state.nodeMap,
                qubit_needed:props.location.state.qubit_needed,
                algo: props.location.state.algorithm
            }
        }
        let toVal = {
            pathname: "/maps",
            state: state,
        };
        setRedirectVal(<Redirect to={toVal} />)
    }
    return (
      <div className="background1" >
        {redirectVal}
        <h1 className="heading">{algo} statistics for {quantumComputer}</h1>
        <div className = " main-div1">
            {
                algo != 'classical'?
                <div>
                    <div className = 'row'>
                        <h3>Qubits:  {qubits}</h3>
                    </div> <br></br>
                    <div className = 'row'>
                        <h3>Quantum Cost:  {props.location.state.quantum_cost}</h3>
                    </div><br></br>
                    <div className = 'row'>
                        <h3>xc:  {props.location.state.xc}</h3>
                    </div> <br></br>
                </div>
                :
                <Label></Label>
            }
            <div className="row">
                <Button variant="success" onClick={()=>redirectTo()}>See Maps</Button>
              
            </div>
        </div>
        <QuantumFlow></QuantumFlow>
      </div>
    );
}
//export Login Component
export default Screen;
