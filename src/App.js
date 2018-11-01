import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3'; //import all of d3

const Container = styled.div`
  background-color: black;
  .App{
    color: white;
    div{
      background-color: red;
    }
  }
`

class App extends Component {
  state = {
    fakeDataArr: [
      1, 2, 3, 10, 20, 100,
    ]
  }
  createBarChart = () => {
    let x = d3.scaleLinear()
      .domain([0, d3.max(this.state.fakeDataArr)])
      .range([0, 420]);
    d3.select('.App')
      .selectAll('div')
      .data(this.state.fakeDataArr)
      .enter().append('div')
      .style('width', function (d) { return x(d) + 'px'; })
      .text(function (d) { return d; });
  }
  componentDidMount() {
    this.createBarChart();
  }
  render() {
    
    return (
      <Container>
        <div className="App">

        </div>
      </Container>
    );
  }
}

export default App;
