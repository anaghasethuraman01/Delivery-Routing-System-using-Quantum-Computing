import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Button } from 'react-bootstrap';
class Register extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: "",
      password: "",
      authFlag: false,
      validationErr: {},
    };
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    console.log("compWillMount");
    this.setState({
      authFlag: false,
    });
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
  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    let loginErr = {};
    console.log("submit");
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    if (this.validateLogin() === true) {
      const data = {
        username: this.state.username,
        password: this.state.password,
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post("http://localhost:3001/login", data)
        .then((response) => {
          console.log("Status Code : ", response.status);
          console.log("Status Code : ", response.data);
          if (response.status === 200 && response.data === "Success") {
            console.log("inside success");
            this.setState({
              authFlag: true,
            });
          } else {
            loginErr["login"] = "Invalid Login Credentials!";
            console.log("inside fail");
            this.setState({
              authFlag: false,
              validationErr: loginErr,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  validateLogin = () => {
    let validationErr = {};
    let isValid = true;

    if (this.state.username === "" || this.state.password === "") {
      validationErr["login"] = "*Please enter all the fields";
      isValid = false;
    }

    this.setState({
      validationErr: validationErr,
    });
    return isValid;
  };

  render() {
    //redirect based on successful login
    console.log("render called");
    let redirectVar = null;
    let errorMsg = "";
    if (cookie.load("cookie")) {
      redirectVar = <Redirect to="/home" />;
    }
    // if (this.state.loadError) {
    //   errorMsg = "Incorrect login credentials";
    // } else {
    //   errorMsg = "";
    // }

    return (
      <div>
        {redirectVar}
        <div className="container body-login">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Welcome to Route Planner!</h2>
                <p>Please enter the required details to register.</p>
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
                  Create Account
                </button>
               
                <h4>Already have an account?<Button  variant="link" onClick={this.login}><h4>Login</h4></Button></h4>
              </div>

              <div className="form-group">
                <p id="error" className="errorMsg">
                  {this.state.validationErr.login}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
