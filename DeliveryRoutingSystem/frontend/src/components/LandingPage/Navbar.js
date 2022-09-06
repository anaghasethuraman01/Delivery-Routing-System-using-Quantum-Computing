import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";

import { Modal, Button } from "react-bootstrap";
import axios from "axios";
//create the Navbar Component
class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			str: "",
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
		axios.get("http://127.0.0.1:5000/getConnectionDetails").then((response) => {
			console.log(response);
			this.setState({
				str: response.data.list,
			});
		});
	};
	handleModalClose = () => {
		this.setState({ show: false });
	};
	render() {
		var redirectVar = <Redirect to="/login" />;
		var modalview = null;
		if (
			this.state.show &&
			this.state.str != null &&
			this.state.str.length != 0
		) {
			modalview = (
				<Modal show="true">
					<Modal.Body>
						<h4>Connection Successful : Available quantum cloud backends</h4>
						{this.state.str.map((str1) => {
							return (
								<div>
									<p> {str1}</p>
								</div>
							);
						})}
						<Button variant="success" onClick={this.handleModalClose}>
							{" "}
							OK
						</Button>
					</Modal.Body>
				</Modal>
			);
		}

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
								<div className="connectbtn">{modalview}</div>
							</div>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default Navbar;
