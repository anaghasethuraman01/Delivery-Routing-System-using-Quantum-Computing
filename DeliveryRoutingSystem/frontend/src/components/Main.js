import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Home from "./Home/Home";
import Maps from "./Home/Maps";
import Results from "./Home/Results";
import Navbar from "./LandingPage/Navbar";
import Screen from "./Home/Screen";
import Graphs from "./Home/Graphs"
//Create a Main Component
class Main extends Component {
	render() {
		return (
			<Router>
				<div>
					{/*Render Different Component based on Route*/}
					<Route path="/" component={Navbar} />
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
					<Route path="/home" component={Home} />
					<Route path="/compare" component={Graphs} />
					{/* <Route path="/maps" component={Maps}/>  */}
					<Route path="/results" component={Results} />
					<Route path="/screen" component={Screen} />
					<Route path="/maps" render={(props) => <Maps {...props} />} />
				</div>
			</Router>
		);
	}
}
//Export The Main Component
export default Main;
