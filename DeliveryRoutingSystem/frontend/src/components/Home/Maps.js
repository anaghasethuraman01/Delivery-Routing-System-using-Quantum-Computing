import React, { Component } from "react";
import "../../App.css";
import MapRenderer from './MapRenderer'

//Define a Login Component
class Maps extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      xc: this.props.location.state.xc,
      yc: this.props.location.state.yc,
      x_quantum: this.props.location.state.x_quantum,
      quantum_cost:  this.props.location.state.quantum_cost,
      nodeMap:  this.props.location.state.nodeMap,
      points: [],
    };
    //Bind the handlers to this class
    
    this.results = this.results.bind(this);

  }

  results = (e) =>{
    e.preventDefault();
    window.location.href='/results';
  }

render(){
  var ids = Object.keys(this.state.nodeMap);
  var values = Object.values(this.state.nodeMap);
  let idx = 0;
  for(let i=0;i<this.state.xc.length;i++){
    let temp = [];
    for(let j=0;j<this.state.xc[i].length;j++){
    temp.push({
      id: ids[idx],
      title:values[idx],
      lat:this.state.xc[i][j],
      lng:this.state.yc[i][j]
    });
    idx++;
  }
  this.state.points.push(temp);
}
let index = parseInt(localStorage.getItem('index'));
if (index+1<this.state.points.length && this.state.points[index+1].length==0){
  localStorage.setItem('nextExists', 'false');
}
let routeMarkers = this.state.points[index];
localStorage.setItem('length', this.state.points.length);

  return (
      <div>
    <MapRenderer
      googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCW_z0jpZ5YrhNdywn5D8b7p7Qc39CIogg' +
        '&libraries=geometry,drawing,places'
      }
      markers={routeMarkers}
      loadingElement={<div style={{height: `100%`}}/>}
      containerElement={<div style={{height: "80vh"}}/>}
      mapElement={ <div style={{height: `100%`}}/>}
      defaultCenter={{lat: 25.798939, lng: -80.291409}}
      defaultZoom={15}
    />
    </div>   
  );

      }
    }

export default Maps;
