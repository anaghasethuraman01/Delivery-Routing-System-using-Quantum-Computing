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
      destinations: 0,
      vehicles: 0,
      algorithm:"",
      authFlag: false,
      validationErr: {},
    };
    //Bind the handlers to this class
    this.destinationsChangeHandler = this.destinationsChangeHandler.bind(this);
    this.vehiclesChangeHandler = this.vehiclesChangeHandler.bind(this);
    this.algorithmChangeHandler = this.algorithmChangeHandler.bind(this);
    this.optimize = this.optimize.bind(this);
  }
 
  //no. of destinations change handler to update state variable with the text entered by the user
  destinationsChangeHandler = (e) => {
    this.setState({
      destinations: e.target.value,
    });
  };

  //no. of vehicles change handler to update state variable with the text entered by the user
  vehiclesChangeHandler = (e) => {
    this.setState({
      vehicles: e.target.value,
    });
  };

   //algorithm selected change handler to update state variable with the text entered by the user
  algorithmChangeHandler = (e) => {
    this.setState({
      algorithm: e.target.value,
    });
  };
  

  optimize = (e) =>{    
    axios.get("http://127.0.0.1:5000/getRoute/"+this.state.destinations+"/"+this.state.vehicles+"/"+this.state.algorithm, 
         { 
          }).then((response) => {
            response = JSON.parse(JSON.stringify(response.data))
            console.log(response)
            let json = {};
            if(this.state.algorithm == 'classical') {
              json = {
                'x': response.x,
                'z': response.z,
                'classical_cost': response.classical_cost,
                'algo': 'classical'
              }
              localStorage.setItem("x", response.x)
              localStorage.setItem("z", response.z)
              localStorage.setItem("classical_cost", response.classical_cost)
            }
            else {
              json = {
                xc: response.xc,
                yc: response.yc,
                x_quantum: response.x_quantum,
                quantum_cost:response.quantum_cost,
                nodeMap:response.nodeMap,
                qubit_needed:response.qubit_needed,
                algo: this.state.algorithm
              }
              localStorage.setItem("xc", response.xc)
              localStorage.setItem("yc", response.yc)
              localStorage.setItem("x_quantum", response.x_quantum)
              localStorage.setItem("quantum_cost", response.quantum_cost)
              localStorage.setItem("qubit_needed", response.qubit_needed)
              localStorage.setItem("nodeMap", JSON.stringify(response.nodeMap))
            }
            this.props.history.push({
                pathname: '/screen',
                state: json
            })

  })
}



  render() {

    return (
      <div className="background1" >
        
        <h1 className="heading">Optimize Routes, Save Time</h1>
        <div className = " main-div1">
          Number of Destinations: <Input className="form-control" type="number" name="destinations"  onChange={this.destinationsChangeHandler} ></Input>
          Number of Vehicles: <Input className="form-control" type="number" name="vehicles"  onChange={this.vehiclesChangeHandler}  ></Input>
          Choose Algorithm:  :
            <select className="form-control" name="algo"  onChange={this.algorithmChangeHandler}  >
            <option value="Select">Select </option> 
              <option value="qaoa">QAOA</option> 
              <option value="vqe" >VQE</option>
              <option value="admm" >ADMM</option>
            </select>
            <br/>
            <Button variant="success" onClick={this.optimize}>Optimize Route</Button>
            <br/>
       
        </div>
      </div>
    );
  }
}
//export Login Component
export default Home;
