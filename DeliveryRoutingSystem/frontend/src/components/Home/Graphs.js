import React, { Component } from "react";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from  'recharts';
class Graphs extends Component{
    constructor(props) {
      super(props);
      this.state = {
        data : [
            {
                name: '(3, 1)',
                DWave: 46.56,
                Classical: 24,
                Qiskit: 1504
            },
            {
                name: '(4, 1)',
                DWave: 40.48,
                Classical: 26,
                Qiskit: 3437
            },
            {
                name: '(6, 3)',
                DWave: 36.6,
                Classical: 20
            },
            {
                name: '(15, 5)',
                DWave: 950,
                Classical: 450
            },
            {
                name: '(20, 6)',
                DWave: 277,
                Classical: 702
            },
            {
                name: '(30, 10)',
                DWave: 998,
                Classical: 1039
            },
            {
                name: '(40, 10)',
                DWave: 1051,
                Classical: 2393
            },
            {
                name: '(50, 10)',
                DWave: 2695,
                Classical: 3038
            }]
        }
    }
      render() {
        const { data } = this.state;
        return (
                <div>
                    <br></br>
                <div style={{ textAlign: "center" }}>   
                    <h4>Computing Platform Performance Comparison</h4>
                </div>
               <ResponsiveContainer width="90%" height="70%" aspect={3}>
                <LineChart data={data} margin={{ left: 100 }}>
                    <CartesianGrid fill="#F2F4F4"/>
                    <XAxis dataKey="name" label={{ value: '(Number of destinations, Number of vehicles)', position:'insideBottomLeft', dy:20}}
                        interval={'preserveStartEnd'} />
                    <YAxis label={{ value: 'Execution time in milliseconds', angle: -90, position: 'insideLeft', dy: 60 }}></YAxis>
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