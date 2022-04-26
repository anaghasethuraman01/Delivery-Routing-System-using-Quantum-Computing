import React, { Component } from "react";
import "../../App.css";


class Marker extends Component {

  constructor(props) {
    super(props);

    this.state ={
      tooltip: this.props.tooltip,
      text:this.props.text
    }

  }

  render() {
      return (
        <div className="circle">
              <span className="circleText" title={this.state.tooltip}>
                {this.state.text}
             </span>
            </div>
  )
  }

}

export default Marker;