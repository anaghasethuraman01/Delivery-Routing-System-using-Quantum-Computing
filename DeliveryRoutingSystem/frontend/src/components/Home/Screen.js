import React, { Component, useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Input, Label } from "reactstrap";
import { Button, Card, ListGroup, Container } from "react-bootstrap";
import Navbar from "../LandingPage/Navbar";
import QuantumFlow from "../Home/QuantumFlow";
import Graphs from "../Home/Graphs";
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
	localStorage.setItem("algo", algo);
	const nodesLoc = [];
	for (let i = 1; i < Object.keys(nodeMap).length; i++) {
		let ar = [];
		ar.push(nodeMap[i]);
		nodesLoc.push(ar);
	}

	const nodeTr = nodesLoc.map((node) => {
		return (
			<ListGroup variant="flush">
				<ListGroup.Item>{node[0]}</ListGroup.Item>
			</ListGroup>
		);
	});
	const nodeDiv = (
		<Container
			style={{
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "flex-start",
			}}
		>
			<Card style={{ width: "18rem", margin: "0.8em" }}>
				<Card.Header>Destinations</Card.Header>
				{nodeTr}
			</Card>
		</Container>
	);

	useEffect(() => {}, []);
	const redirectTo = (e) => {
		localStorage.setItem("pageFind", "maps");
		let state = {};
		if (algo == "CPLEX") {
			localStorage.setItem("algo", "cplex");
			state = {
				xc: props.location.state.xc,
				yc: props.location.state.yc,
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
			<h4 className="heading">Vehicle Routing optimization statistics</h4>
			<Button
				className="mapbutton"
				variant="success"
				onClick={() => redirectTo()}
			>
				See Maps
			</Button>

			<QuantumFlow></QuantumFlow>
			<br></br>
			<Graphs></Graphs>
			{algo != "CPLEX" ? (
				<div className="rowMain">
					<div className="col1">
						<h5>
							<Container
								style={{
									display: "flex",
									flexWrap: "wrap",
									justifyContent: "flex-start",
								}}
							>
								{algo == "QAOA" || algo == "VQE" ? (
									<Card style={{ width: "18rem", margin: "0.8em" }}>
										<Card.Header>Quantum Environment</Card.Header>
										<ListGroup variant="flush">
											<ListGroup.Item>IBM Qiskit</ListGroup.Item>
										</ListGroup>
									</Card>
								) : (
									<Card style={{ width: "18rem", margin: "0.8em" }}>
										<Card.Header>Quantum Environment</Card.Header>
										<ListGroup variant="flush">
											<ListGroup.Item>D-Wave</ListGroup.Item>
										</ListGroup>
									</Card>
								)}
								<Card style={{ width: "18rem", margin: "0.8em" }}>
									<Card.Header>Algorithm Used</Card.Header>
									<ListGroup variant="flush">
										<ListGroup.Item>{algo}</ListGroup.Item>
									</ListGroup>
								</Card>
								<Card style={{ width: "18rem", margin: "0.8em" }}>
									<Card.Header>Quantum Cost</Card.Header>
									<ListGroup variant="flush">
										<ListGroup.Item>
											{props.location.state.quantum_cost.toFixed(2)}
										</ListGroup.Item>
									</ListGroup>
								</Card>
								<Card style={{ width: "18rem", margin: "0.8em" }}>
									<Card.Header>Qubits</Card.Header>
									<ListGroup variant="flush">
										<ListGroup.Item>{qubits}</ListGroup.Item>
									</ListGroup>
								</Card>
							</Container>
						</h5>
					</div>
					<div className="col2">
						<h5>{nodeDiv}</h5>
					</div>
					<div className="col3">
						<h5>
							<Container
								style={{
									display: "flex",
									flexWrap: "wrap",
									justifyContent: "flex-start",
								}}
							>
								<Card style={{ width: "18rem", margin: "0.8em" }}>
									<Card.Header>Source</Card.Header>
									<ListGroup variant="flush">
										<ListGroup.Item>{nodeMap[0]}</ListGroup.Item>
									</ListGroup>
								</Card>
								<Card style={{ width: "18rem", margin: "0.8em" }}>
									<Card.Header>Number of vehicles</Card.Header>
									<ListGroup variant="flush">
										<ListGroup.Item>{xc.length}</ListGroup.Item>
									</ListGroup>
								</Card>
							</Container>
						</h5>
					</div>
					<br></br>
				</div>
			) : (
				<div className="rowMain">
					<div className="col1">
						<h5>
							<Container
								style={{
									display: "flex",
									flexWrap: "wrap",
									justifyContent: "flex-start",
								}}
							>
								<Card style={{ width: "18rem", margin: "0.8em" }}>
									<Card.Header>Algorithm Used</Card.Header>
									<ListGroup variant="flush">
										<ListGroup.Item>{algo}</ListGroup.Item>
									</ListGroup>
								</Card>
								<Card style={{ width: "18rem", margin: "0.8em" }}>
									<Card.Header>Classical cost</Card.Header>
									<ListGroup variant="flush">
										<ListGroup.Item>
											{props.location.state.classical_cost.toFixed(2)}
										</ListGroup.Item>
									</ListGroup>
								</Card>
							</Container>
						</h5>
					</div>
					<div className="col2">
						<h5>{nodeDiv}</h5>
					</div>{" "}
				</div>
			)}
		</div>
	);
}
//export Login Component
export default Screen;
