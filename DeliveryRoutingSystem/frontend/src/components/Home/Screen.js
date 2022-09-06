import React, { Component, useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Input, Label } from "reactstrap";
import { Button } from "react-bootstrap";
import Navbar from "../LandingPage/Navbar";
import QuantumFlow from "../Home/QuantumFlow";
//Define a Login Component
function Screen(props) {
	//call the constructor method
	const [qubits, setQubits] = useState(props.location.state.qubit_needed);
	const [route, setRoute] = useState("");
	const [algo, setAlgo] = useState(props.location.state.algo.toUpperCase());
	const [redirectVal, setRedirectVal] = useState(null);
	const [quantumComputer, setQuantumComputer] = useState("Qiskit");
	const [nodeMap, setNodeMap] = useState(props.location.state.nodeMap);
	const [xc, setXc] = useState(props.location.state.xc);
	const [yc, setYc] = useState(props.location.state.yc);
	console.log(algo);
	const nodesLoc = [];
	for (let i = 0; i < xc.length; i++) {
		let ar = [];
		ar.push(xc[i]);
		ar.push(yc[i]);
		ar.push(nodeMap[i]);
		nodesLoc.push(ar);
	}
	console.log("nodes loc", nodesLoc);
	const nodeTr = nodesLoc.map((node) => {
		return (
			<tr>
				<td>{node[2]}</td>
				<td>{node[0].toFixed(2)}</td>
				<td>{node[1].toFixed(2)}</td>
			</tr>
		);
	});
	const nodeDiv = (
		<div className="row container-fluid">
			<h3>
				<b>Location Data</b>
			</h3>
			<table>
				<tr>
					<th>Location</th>
					<th>Latitude</th>
					<th>Longitude</th>
				</tr>
				{nodeTr}
			</table>
		</div>
	);

	useEffect(() => {}, []);
	const redirectTo = (e) => {
		localStorage.setItem("pageFind", "maps");
		let state = {};

		if (algo == "CPLEX") {
			console.log("hete");
			state = {
				xc: props.location.state.x,
				yc: props.location.state.z,

				quantum_cost: props.location.state.classical_cost,
				nodeMap: props.location.state.nodeMap,
				qubit_needed: 0,
				algo: props.location.state.algorithm,
			};
		} else {
			state = {
				xc: props.location.state.xc,
				yc: props.location.state.yc,
				x_quantum: props.location.state.x_quantum,
				quantum_cost: props.location.state.quantum_cost,
				nodeMap: props.location.state.nodeMap,
				qubit_needed: props.location.state.qubit_needed,
				algo: props.location.state.algorithm,
			};
		}
		let toVal = {
			pathname: "/maps",
			state: state,
		};
		setRedirectVal(<Redirect to={toVal} />);
	};
	return (
		<div className="background1">
			{redirectVal}
			{algo != "DBSCAN" ? (
				<h1 className="heading">
					{algo} statistics for {quantumComputer}
				</h1>
			) : (
				<h1 className="heading">{algo} Solver statistics for DWave</h1>
			)}
			{algo != "CPLEX" ? (
				<div className="rowMain">
					<div className="col1">
						<h3>
							<b>Quantum Data</b>
						</h3>
						<h5>
							<table>
								<tr>
									<th>Quantum Cost</th>
									<th>Qubits</th>
								</tr>
								<tr>
									<td>{props.location.state.quantum_cost.toFixed(2)}</td>
									<td>{qubits}</td>
								</tr>
							</table>
						</h5>
					</div>{" "}
					<br></br>
					<div className="col2">
						<h5>{nodeDiv}</h5>
					</div>{" "}
					<br></br>
				</div>
			) : (
				<div className="rowMain">
					<br></br>
					<div className="col2">
						<h5>{nodeDiv}</h5>
					</div>{" "}
					<br></br>
				</div>
			)}

			<Button
				className="mapbutton"
				variant="success"
				onClick={() => redirectTo()}
			>
				See Maps
			</Button>
			<div className="main-div1">
				<h3>
					Steps in solving the Vehicle Routing Problem (VRP) using quantum
					computing!{" "}
				</h3>
				<QuantumFlow></QuantumFlow>
			</div>
		</div>
	);
}
//export Login Component
export default Screen;
