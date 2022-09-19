import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";

import { Modal, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { Tooltip } from "reactstrap";
//create the Navbar Component
class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			str: "",
			showpop: false,
			loading: false,
		};
	}

	//handle logout to destroy the cookie

	logout = (e) => {
		e.preventDefault();
		window.localStorage.clear();
		const { history } = this.props;
		history.push("/login");
	};
	goHome = (e) => {
		e.preventDefault();
		window.localStorage.clear();
		localStorage.setItem("pageFind", "admin");
		const { history } = this.props;
		history.push("/home");
	};
	goInfoPage = (e) => {
		e.preventDefault();
		window.localStorage.clear();
		localStorage.setItem("pageFind", "home");
		const { history } = this.props;
		history.push("/screen");
	};
	checkConnection = () => {
		this.setState({
			show: true,
		});
	};
	handleQuantumBackends = async () => {
		this.setState({
			showpop: true,
		});
		await axios
			.get("http://127.0.0.1:5000/getConnectionDetails")
			.then((response) => {
				console.log(response);
				this.setState({
					str: response.data.list,
				});
				this.setState({
					loading: true,
				});
			});
	};
	handleModalClose = () => {
		this.setState({ show: false });
	};
	handleQuantumModalClose = () => {
		this.setState({ showpop: false });
	};
	render() {
		var modalview = null;
		var quantummodal = null;
		if (this.state.showpop) {
			quantummodal = (
				<Modal show="true">
					<Modal.Body>
						<Button variant="success" disabled>
							<Spinner
								as="span"
								animation="grow"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
							Loading...
						</Button>
					</Modal.Body>
				</Modal>
			);
		}
		if (
			this.state.showpop &&
			this.state.str != null &&
			this.state.str.length != 0
		) {
			quantummodal = (
				<Modal show="true">
					<Modal.Body>
						<h4>
							<u>Available quantum cloud backends</u>
						</h4>
						{this.state.str.map((str1) => {
							return (
								<div>
									<p> {str1}</p>
								</div>
							);
						})}

						<Button variant="success" onClick={this.handleQuantumModalClose}>
							{" "}
							OK
						</Button>
					</Modal.Body>
				</Modal>
			);
		}
		if (this.state.show) {
			modalview = (
				<Modal show="true">
					<Modal.Body>
						<h4>
							Your Connection is Successful. Now connected quantum computer!
						</h4>
						<div className="infoPanel">
							<Button variant="success" onClick={this.handleModalClose}>
								{" "}
								OK
							</Button>
							<Button variant="success" onClick={this.handleQuantumBackends}>
								{" "}
								Available Quantum Backends
							</Button>
						</div>
					</Modal.Body>
				</Modal>
			);
		}
		redirectVar = <Redirect to="/login" />;
		const userSession = localStorage.getItem("pageFind");
		let sessionAvail = null;
		if (userSession == "admin") {
			sessionAvail = (
				<div>
					<Button
						className="conectbtn"
						variant="success"
						onClick={this.checkConnection}
					>
						Check Connection
					</Button>
					<Button className="btn-logout" variant="light" onClick={this.logout}>
						Logout
					</Button>
				</div>
			);
		} else if (userSession == "home") {
			sessionAvail = (
				<div>
					<div>
						<Button className="conectbtn" variant="light" onClick={this.goHome}>
							Home
						</Button>
						<Button
							className="btn-logout"
							variant="light"
							onClick={this.logout}
						>
							Logout
						</Button>
					</div>
				</div>
			);
		} else if (userSession == "maps") {
			sessionAvail = (
				<div>
					<div>
						{/* <Button
							className="infobtn"
							variant="light"
							onClick={this.goInfoPage}
						>
							InfoPage
						</Button> */}
						<Button className="conectbtn" variant="light" onClick={this.goHome}>
							Home
						</Button>
						<Button
							className="btn-logout"
							variant="light"
							onClick={this.logout}
						>
							Logout
						</Button>
					</div>
				</div>
			);
		}
		var redirectVar = null;
		return (
			<div>
				{redirectVar}
				<nav className="navbar navbar-inverse ">
					<div className="container-fluid">
						<div className="navbar-header ">
							<div className="navbar-brand">
								<h1 className="ubereats">
									<span style={{ color: "white" }}>Route</span>{" "}
									<span style={{ color: "green" }}>Planner</span>
								</h1>
								{sessionAvail}
								{modalview}
								{quantummodal}
							</div>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default Navbar;
