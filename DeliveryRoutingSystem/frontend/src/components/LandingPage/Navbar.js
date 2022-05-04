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
  render() {
    //if Cookie is set render Logout Button
    // let navLogin = null;
    // if (cookie.load("cookie")) {
    //   console.log("Able to read cookie");
    //   navLogin = (
    //     <ul className="nav navbar-nav navbar-right">
    //       <li>
    //         <Link to="/" onClick={this.handleLogout}>
    //           <span className="glyphicon glyphicon-user"></span>Logout
    //         </Link>
    //       </li>
    //     </ul>
    //   );
    // } else {
    //   //Else display login button
    //   console.log("Not Able to read cookie");
    //   navLogin = (
    //     <ul className="nav navbar-nav navbar-right ">
    //       <li>
    //         <Link to="/login">
    //           <span className="glyphicon glyphicon-log-in"></span> Login
    //         </Link>
    //       </li>
    //     </ul>
    //   );
    // }
    // let redirectVar = null;
    // if (cookie.load("cookie")) {
    //   redirectVar = <Redirect to="/home" />;
    // } else {
    //   redirectVar = <Redirect to="/register" />;
    // }
    return (
      <div >
        {/* {redirectVar} */}
        <nav className="navbar navbar-inverse ">
          <div className="container-fluid">
            <div className="navbar-header">
            <div className=" navbar-brand headerbtn"><h1 className="ubereats"><span style={{ color:"white"}}>Route Planner</span></h1>
            <Button>Home</Button>
            </div>
             </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
