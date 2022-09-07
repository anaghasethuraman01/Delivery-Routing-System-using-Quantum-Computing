import React, { Component } from "react";
import { Card, Container, Table, Carousel } from "react-bootstrap";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import img_path from "../QuantumImage.jpg";
import { Modal, Button } from "react-bootstrap";
class QuantumFlow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			str: "",
			data: [
				{
					title: "Define Combinatorial Problem",
					definition:
						"Combinatorial optimizational problem means finding an optimal solution from a finite or countably infinite set of solutions. Optimality is determined with respect to some criterion function which is also referred to as cost function or objective function. This route optimization problem can be defined as a combinatorial optimization problem in which the solution will be the optimal path with the shortest possible distance between the nodes. ",
				},
				{
					title: "Convert problem into Binary Optimization",
					definition:
						"This is required to minimize the objective function which in this case is the cost function. From the resulting problem the Ising Hamiltonian is constructed.",
				},
				{
					title: "Convert to Quadratic Problem(QP)",
					definition:
						"In this step, the problem is mapped to Quadratic Problem which is required to solve using Quantum computing.",
				},
				{
					title: "Select solver type",
					definition:
						"There are different optimization algorithms such as VQE, QAOA, ADMM which can be using solve thee Quadratic Problem created in the last step. This can be invoked using simulator such Qiskit or by connecting to actual quantum computer using token.",
				},
				{
					title:
						"Send quadratic program to Qiskit Simulator or Quantum computer",
					definition:
						"The optimal solution for the Quadratic formulation will be returned by the quantum computing optmization algorithm and minimum eigen optimizer.",
				},
				{
					title: "Get Results",
					definition:
						"The final result will have the order of nodes to be traversed along with the optimized cost function.",
				},
			],
			dwavedata: [
				{
					title: "Define Combinatorial Problem",
					definition:
						"Combinatorial optimizational problem means finding an optimal solution from a finite or countably infinite set of solutions. Optimality is determined with respect to some criterion function which is also referred to as cost function or objective function. This route optimization problem can be defined as a combinatorial optimization problem in which the solution will be the optimal path with the shortest possible distance between the nodes. ",
				},
				{
					title: "Formulate Quantum Problem",
					definition:
						"Break down optimization problem into distinct objectives and constraints. Rather than storing information using bits represented by 0s or 1s in classical computers, quantum computers use quantum bits, or qubits, to encode information as 0s, 1s, or both at the same time.",
				},
				{
					title: "Formulate quadratic models",
					definition:
						"In this step, the problem is mapped to Quadratic Problem which is required to solve using Quantum computing. The two formulations for objective functions are the Ising Model and QUBO both of which are binary quadratic models.",
				},
				{
					title: "Select solver type",
					definition:
						"There are different optimization solvers such as DBScanSolver, FullQUBOSolver which will be used to solve the Quadratic Problem created in the last step.",
				},
				{
					title: "Finding solution using Quantum Annealing",
					definition:
						"D-Wave uses Quantum Annealing to find the minimum of an energy landscape defined by the biases and couplings applied to its qubits in the form of a problem Hamiltonian. To solve a problem on quantum samplers, we formulate the problem as an objective function, usually in Ising or QUBO format. Low energy states of the objective function represent good solutions to the problem. ",
				},
				{
					title: "Get Results",
					definition:
						"The final result will have the order of nodes to be traversed along with the optimized cost function.",
				},
			],
		};
	}
	openPanel = () => {
		this.setState({
			show: true,
		});

		this.setState({
			str: "Qiskit",
		});
	};
	openDwavePanel = () => {
		this.setState({
			show: true,
		});

		this.setState({
			str: "Dwave",
		});
	};
	closePanel = () => {
		this.setState({ show: false });
	};
	render() {
		const { data, dwavedata } = this.state;
		const Details = data.map((entry) => (
			<Carousel.Item>
				<img
					className="d-block w-100 mx-auto"
					src={img_path}
					alt="First slide"
				/>
				<Carousel.Caption>
					<h2>{entry.title}</h2>
					<p>{entry.definition}</p>
				</Carousel.Caption>
			</Carousel.Item>
		));
		const dwaveDetails = dwavedata.map((entry) => (
			<Carousel.Item>
				<img
					className="d-block w-100 mx-auto"
					src={img_path}
					alt="First slide"
				/>
				<Carousel.Caption>
					<h2>{entry.title}</h2>
					<p>{entry.definition}</p>
				</Carousel.Caption>
			</Carousel.Item>
		));
		var modalview = null;
		if (this.state.show && this.state.str == "Qiskit") {
			modalview = (
				<Modal show="true">
					<Carousel fade style={{ width: "35rem" }}>
						{Details}
					</Carousel>
					<Button style={{ width: "35rem" }} onClick={this.closePanel}>
						OK
					</Button>
				</Modal>
			);
		} else if (this.state.show && this.state.str == "Dwave") {
			modalview = (
				<Modal show="true">
					<Carousel fade style={{ width: "35rem" }}>
						{dwaveDetails}
					</Carousel>

					<Button style={{ width: "35rem" }} onClick={this.closePanel}>
						OK
					</Button>
				</Modal>
			);
		}

		return (
			<div className="infoPanel container-fluid">
			
				<div>
					<Button onClick={this.openPanel}>
						<h5>Qiskit</h5>
					</Button>
					{modalview}
				</div>

				<div>
					<Button onClick={this.openDwavePanel}>
						<h5>D-wave</h5>
					</Button>
					{modalview}
				</div>
			</div>
		);
	}
}

export default QuantumFlow;
