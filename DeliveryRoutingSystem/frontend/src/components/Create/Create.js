import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BookID: "",
      Title: "",
      Author: "",
      isCreated: false,
      isErrMsgNeeded: false,
      validationErr: {},
    };

    //bind the handlers to this class
    this.bookIDChangeHandler = this.bookIDChangeHandler.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);
    this.authorChangeHandler = this.authorChangeHandler.bind(this);
    this.Create = this.Create.bind(this);
    this.validateCreate = this.validateCreate.bind(this);
  }
  componentWillMount() {
    console.log("compWillMount");
    this.setState({
      isCreated: false,
    });
  }

  bookIDChangeHandler = (e) => {
    this.setState({
      BookID: e.target.value,
    });
  };

  titleChangeHandler = (e) => {
    this.setState({
      Title: e.target.value,
    });
  };

  authorChangeHandler = (e) => {
    this.setState({
      Author: e.target.value,
    });
  };

  Create = (e) => {
    let errors = {}
    e.preventDefault();
    if (this.validateCreate() === true) {
      const data = {
        BookID: this.state.BookID,
        Title: this.state.Title,
        Author: this.state.Author,
      };
   
      axios.defaults.withCredentials = true;
      axios
        .post("http://localhost:3001/create", data)
        .then((response) => {
          if (response.status === 200 && response.data === "Success") {
            this.setState({
              isCreated: true,
            });
          } else {
            errors["book"] = " This Book ID already exists"
            this.setState({
              isCreated: false,
              isErrMsgNeeded: true,
              validationErr : errors
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  validateCreate = () => {
    let validationErr = {};
    let isValid = true;
     const bookid = this.state.BookID;
     console.log(bookid.length);
    if (this.state.BookID === "") {
      validationErr["book"] = "*Please enter a Book ID";
      isValid = false
    }
    if (!this.state.BookID.match(/^[0-9]+$/)) {
     validationErr["book"] = "Book ID cannot contain alphabets";
     isValid = false
    }

    if (this.state.Title === "" || this.state.Title === " ") {
      validationErr["title"] = "Please enter a title ";
      isValid = false
    }
    if (this.state.Author === "") {
      validationErr["author"] = "Please enter a author name";
      isValid = false
    }

    this.setState({
      validationErr: validationErr,
    });

    return isValid;
  };

  render() {
    console.log("inside create render");
    let redirectVar = null;
    if(!cookie.load("cookie")){
        redirectVar = <Redirect to="/home" />;
    }
    if (cookie.load("cookie") && this.state.isCreated === true) {
      redirectVar = <Redirect to="/home" />;
    }
    
    return (
      <div>
        {redirectVar}
        <br />
        <div className="container">
          <form action="http://127.0.0.1:3000/create" method="post">
            <div className="errorMsg">{this.state.validationErr.book}</div>
            <div style={{ width: "30%" }} className="form-group">
              <input
                onChange={this.bookIDChangeHandler}
                type="text"
                className="form-control"
                name="BookID"
                placeholder="Book ID"
              />
            </div>
            <br />
            <div className="errorMsg">{this.state.validationErr.title}</div>
            <div style={{ width: "30%" }} className="form-group">
              <input
                onChange={this.titleChangeHandler}
                type="text"
                className="form-control"
                name="Title"
                placeholder="Book Title"
                required
              />
            </div>
            <br />
            <div className="errorMsg">{this.state.validationErr.author}</div>
            <div style={{ width: "30%" }} className="form-group">
              <input
                onChange={this.authorChangeHandler}
                type="text"
                className="form-control"
                name="Author"
                placeholder="Book Author"
              />
            </div>
            <br />
            <div style={{ width: "30%" }}>
              <button
                className="btn btn-success"
                type="submit"
                onClick={this.Create}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
