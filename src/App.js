import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3'; //import all of d3

const Container = styled.div`
  background-color: black;
  .App{
    display: flex;
    color: white;
    font-size: .8rem;
    transform: scaleY(-1);
    style-bar{
      background-color: red;
      flex: 1;
      padding: 10px;
      border: 1px solid white;
      margin: 4px;
      transform: scaleY(-1);
    }
  }
`

class App extends Component {
  state = {
    fakeDataArr: [
      1, 2, 3, 10, 20, 100, 1000, 25, 800,
    ]
  }
  createBarChart = () => {
    let bar = d3.scaleLinear()
      .domain([0, d3.max(this.state.fakeDataArr)])
      .range([0, 400]); //this is the height of the chart.
    d3.select('.App')
      .selectAll('div')
      .data(this.state.fakeDataArr)
      .enter().append('style-bar')
      .style('height', (data) =>  { return bar(data) + 'px'; }) //the length of the bar chart.
      .text((data) => { return data; });
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
