import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Input } from "reactstrap";

import { Modal, Button } from "react-bootstrap";
import Navbar from "../LandingPage/Navbar";
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
			algorithm: "",
			authFlag: false,
			validationErr: {},
			redirect: null,
			show: false,
			str: "",
		};
		//Bind the handlers to this class
		this.destinationsChangeHandler = this.destinationsChangeHandler.bind(this);
		this.vehiclesChangeHandler = this.vehiclesChangeHandler.bind(this);
		this.algorithmChangeHandler = this.algorithmChangeHandler.bind(this);
		this.optimize = this.optimize.bind(this);
	}

  componentDidMount() {
    localStorage.setItem('index', 0);
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
	handleModalClose = () => {
		this.setState({ show: false });
	};

	optimize = (e) => {
		localStorage.setItem("pageFind", "home");
		axios
			.get(
				"http://127.0.0.1:5000/getRoute/" +
					this.state.destinations +
					"/" +
					this.state.vehicles +
					"/" +
					this.state.algorithm,
				{}
			)
			.then((response) => {
				response = JSON.parse(JSON.stringify(response.data));
				console.log("Response: ", response);
				let json = {};
				if (this.state.algorithm == "cplex") {
					json = {
						xc: response.xc,
						yc: response.yc,
            nodeMap: response.nodeMap,
						classical_cost: response.classical_cost,
						algo: "CPLEX",
					};
					localStorage.setItem("xc", response.xc);
					localStorage.setItem("yc", response.yc);
					localStorage.setItem("classical_cost", response.classical_cost);
          localStorage.setItem("nodeMap", JSON.stringify(response.nodeMap));
				} else {
					json = {
						xc: response.xc,
						yc: response.yc,
						x_quantum: response.x_quantum,
						quantum_cost: response.quantum_cost,
						nodeMap: response.nodeMap,
						qubit_needed: response.qubit_needed,
						algo: this.state.algorithm,
						image: response.image,
					};
					localStorage.setItem("xc", response.xc);
					localStorage.setItem("yc", response.yc);
					localStorage.setItem("x_quantum", response.x_quantum);
					localStorage.setItem("quantum_cost", response.quantum_cost);
					localStorage.setItem("qubit_needed", response.qubit_needed);
					localStorage.setItem("image", response.image);
					localStorage.setItem("nodeMap", JSON.stringify(response.nodeMap));
				}
				let val = {
					pathname: "/screen",
					state: json,
				};
				this.setState({
					redirect: <Redirect to={val} />,
				});
			});
	};

	render() {
		return (
			<div className="body-home">
				{this.state.redirect}
				<div>
					<h1 className="heading">Optimize Routes, Save Time</h1>
				</div>
				<div className="main-div1">
					<h5>Number of Destinations: </h5>
					<Input
						className="form-control"
						type="number"
						name="destinations"
						placeholder="Value should be 2 or more"
						onChange={this.destinationsChangeHandler}
					></Input>
					<br />
					<h5>Number of Vehicles: </h5>
					<Input
						className="form-control"
						type="number"
						name="vehicles"
						placeholder="Value should be 1 or more"
						onChange={this.vehiclesChangeHandler}
					></Input>
					<br />
					<h5>Choose Algorithm:</h5>
					<select
						className="form-control"
						name="algo"
						onChange={this.algorithmChangeHandler}
					>
						<option value="Select">Select </option>
						<option value="cplex">CPLEX</option>
						<option value="qaoa">Qiskit QAOA</option>
						<option value="vqe">Qiskit VQE</option>
						<option value="DBScan">DWave DBScan Solver</option>
						<option value="FullQubo">DWave FullQubo Solver</option>
					</select>
					<br />
					<Button variant="success" onClick={this.optimize}>
						Optimize Route
					</Button>
					<br />
				</div>
			</div>
		);
	}
}
//export Login Component
export default Home;
