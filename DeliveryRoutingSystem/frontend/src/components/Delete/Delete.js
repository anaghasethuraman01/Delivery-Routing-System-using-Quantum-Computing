import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BookID: "",
      isDeleted: false,
      isErrMsgNeeded: false,
      validationErr: {},
    };

    this.onBookIDChangeHandler = this.onBookIDChangeHandler.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.validateBookID = this.validateBookID.bind(this);
  }

  componentWillMount() {
    this.setState({
      isDeleted: false,
    });
  }

  deleteBook = (e) => {
      let errObj = {}
    e.preventDefault();
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    if (this.validateBookID()=== true) {
      console.log("inside delete")
      const data = {
        BookID: this.state.BookID,
      };

      axios
        .post("http://localhost:3001/delete", data)
        .then((response) => {
          if (response.status === 200 && response.data === "success") {
            this.setState({
              isDeleted: true,
            });
          } else {
            errObj["book"] = "This Book ID doesn't exist";
            this.setState({
              isDeleted: false,
              isErrMsgNeeded: true,
              validationErr : errObj
            });
            
            console.log(this.state.validationErr)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  onBookIDChangeHandler = (e) => {
    this.setState({
      BookID: e.target.value,
    });
  };

  validateBookID = () => {
    const regex = /^[0-9]+$/;
    let validationErr = {};
    let isValid = false;

    if (this.state.BookID === "") {
      validationErr["book"] = "Please enter a valid Book ID";
     } 
    else if (!this.state.BookID.match(regex)) {
      validationErr["book"] = "Please enter only digits";
    } 
    else {
      isValid = true;
    }
    this.setState({
      validationErr: validationErr,
    });

    return isValid;
  }

  render() {
    let redirectVar = "";
    if(!cookie.load("cookie")){
        redirectVar = <Redirect to="/home" />;
    }
    if (cookie.load("cookie") && this.state.isDeleted === true) {
      redirectVar = <Redirect to="/home"></Redirect>;
    } 
    return (
      <div>
        {redirectVar}
        <br />
        <div className="container">
          <form>
            <div className="errorMsg">{this.state.validationErr.book}</div>
            <div style={{ width: "50%", float: "left" }} className="form-group">
              <input
                type="text"
                className="form-control"
                onChange={this.onBookIDChangeHandler}
                name="BookID"
                placeholder="Search a Book by Book ID"
                required={true}
              />
            </div>
            <div style={{ width: "50%", float: "right" }}>
              <button
                className="btn btn-success"
                type="submit"
                onClick={this.deleteBook}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Delete;
