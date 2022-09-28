import React, { Component } from "react";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from  'recharts';
class Graphs extends Component{
    constructor(props) {
      super(props);
      this.state = {
        data : [
            {
                name: '(3, 1)',
                DWave: 11.982,
                Classical: 0.024,
                Qiskit: 1.504
            },
            {
                name: '(4, 1)',
                DWave: 4.048,
                Classical: 0.026,
                Qiskit: 51.437
            },
            {
                name: '(5, 1)',
                DWave: 7.231,
                Classical: 0.068
            },
            {
                name: '(6, 2)',
                DWave: 30.805,
                Classical: 0.031
            },
            {
                name: '(8, 3)',
                DWave: 32.012,
                Classical: 0.045
            },
            {
                name: '(10, 4)',
                DWave: 46.428,
                Classical: 0.062
            },
            {
                name: '(15, 5)',
                DWave: 75.489,
                Classical: 0.126
            },
            {
                name: '(20, 6)',
                DWave: 17.292,
                Classical: 0.102
            },
            {
                name: '(25, 8)',
                DWave: 27.162,
                Classical: 1.182
            },
            {
                name: '(30, 10)',
                DWave: 65.728,
                Classical: 1.902
            }]
        }
    }
      render() {
        const { data } = this.state;
        return (
                <div>
                <div style={{ textAlign: "center" }}>   
                    <h4>Computing Platform Performance</h4>
                </div>
               <ResponsiveContainer width="80%" height="30%" aspect={3}>
                <LineChart data={data} margin={{ left: 100 }}>
                    <CartesianGrid fill="#F2F4F4"/>
                    <XAxis dataKey="name" label={{ value: '(Number of destinations, Number of vehicles)', position:'insideBottomLeft', dy:20}}
                        interval={'preserveStartEnd'} />
                    <YAxis label={{ value: 'Execution time in seconds', angle: -90, position: 'insideLeft', dy: 60 }}></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey="DWave"
                        stroke="green" activeDot={{ r: 8 }} />
                    <Line dataKey="Classical"
                        stroke="blue" activeDot={{ r: 8 }} />
                    <Line dataKey="Qiskit"
                        stroke="brown" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
              </div>
        )
      }
  }
  export default Graphs;