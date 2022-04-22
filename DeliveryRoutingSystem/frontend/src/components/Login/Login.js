import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Button } from 'react-bootstrap';
//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: "",
      password: "",
    
      message: null,

    };
    //Bind the handlers to this class
    // this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    // this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    // this.submitLogin = this.submitLogin.bind(this);
    // this.validateLogin = this.validateLogin.bind(this);
  }
 
 
  //username change handler to update state variable with the text entered by the user
  usernameChangeHandler = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  submitLogin = (e) => {
    e.preventDefault();
    this.setState({
        message: ""
    })
    var username = this.state.username;
    var password = this.state.password;
    console.log(username,password)
    if (username === "" && password === ""){
        this.setState({
            message: "Credentials cannot be Empty!"
        })
    } else 
    if (username === "admin" && password === "admin"){
        window.location.href='/home';
    } 
    else {
        this.setState({
            message: "Invalid Credentials!"
        })
    }
  
  }
 
 
  register = (e) => {
    e.preventDefault();
    window.location.href='/register';
  }

  
  render() {
    
    return (
      <div>
       
        <div className="container body-login">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Let's get started!</h2>
                <p>Please enter your email and password</p>
              </div>

              <div className="form-group">
                <input
                  onChange={this.usernameChangeHandler}
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={this.passwordChangeHandler}
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <button onClick={this.submitLogin} className="btn btn-primary">
                  Login
                </button>
                <h4>New to Route Planner?<Button variant="link" onClick={this.register}><h4>Create an account</h4></Button></h4>
              </div>

              <div className="form-group">
                <p id="error" className="errorMsg">
                 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
export default Login;
