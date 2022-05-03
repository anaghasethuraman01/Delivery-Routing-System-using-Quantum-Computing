import React, { Component } from 'react';
import {
    Card,
    Container,
    Table,
  } from 'react-bootstrap';
import { BsFillArrowRightSquareFill } from "react-icons/bs";

class QuantumFlow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [
            {
                title:'Define Combinatorial Problem',
                definition: 'Combinatorial optimizational problem means finding an optimal solution from a finite or countably infinite set of solutions. Optimality is determined with respect to some criterion function which is also referred to as cost function or objective function. This route optimization problem can be defined as a combinatorial optimization problem in which the solution will be the optimal path with the shortest possible distance between the nodes. '
            },
            {
                title:'Convert problem into Binary Optimization',
                definition: 'This is required to minimize the objective function which in this case is the cost function. From the resulting problem the Ising Hamiltonian is constructed.'
            }, 
            {
                title:'Convert to Quadratic Problem(QP)',
                definition: 'In this step, the problem is mapped to Quadratic Problem which is required to solve using Quantum computing.'
            }, 
            {
                title:'Select solver type',
                definition: 'There are different optimization algorithms such as VQE, QAOA, ADMM which can be using solve thee Quadratic Problem created in the last step. This can be invoked using simulator such Qiskit or by connecting to actual quantum computer using token.'
            },
            {
                title:'Send quadratic program to Qiskit Simulator or Quantum computer',
                definition: 'The optimal solution for the Quadratic formulation will be returned by the quantum computing optmization algorithm and minimum eigen optimizer.'
            },
            {
                title:'Get Results',
                definition: 'The final result will have the order of nodes to be traversed along with the optimized cost function.'
            },
          ]
        };
      }
  render() {
      const { data } = this.state
      const Details = data.map((entry) => (
        <div>
          <Table bordered>
          <Card border="primary" style={{ width: '35rem', height: '20rem', margin: '0.8em' }}>
            <Card.Body>
              <Card.Title>
                <b>{entry.title}</b>
              </Card.Title>
              <Card.Text>
                {entry.definition}
              </Card.Text>
            </Card.Body>
          </Card><div style={{marginLeft: '25em'}}><BsFillArrowRightSquareFill></BsFillArrowRightSquareFill></div>
          </Table>
        </div>
      ));
    return (
      <div>
          <div style={{marginLeft: '10em'}}>
          <h3>How quantum computing process the request?</h3>
          </div>
            <Container style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {Details}
            </Container>
      </div>
    )
  }
}
  
  export default QuantumFlow;
