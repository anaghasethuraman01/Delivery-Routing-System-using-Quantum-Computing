import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Button } from "reactstrap";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
  };
  goHome = e => {
    e.preventDefault();
    const {history} = this.props;
    history.push('/home'); 
    
  }
  render() {
    var redirectVar = <Redirect to="/login" />
    return (
      <div >
        {redirectVar}
        <nav className="navbar navbar-inverse ">
          <div className="container-fluid">
            <div className="navbar-header">
            <div className=" navbar-brand headerbtn"><h1 className="ubereats"><span style={{ color:"white"}}>Route Planner</span></h1>
            <Button onClick={this.goHome}>Home</Button>
           
            </div>
             </div>
          </div>
        </nav>
       
      </div>
    );
  }
}

export default Navbar;
