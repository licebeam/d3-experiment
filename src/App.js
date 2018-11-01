import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3'; //import all of d3

const Container = styled.div`
  background-color: white;
  height: 100vh;
  .App{
    display: flex;
    color: white;
    font-size: .8rem;
    transform: scaleY(-1);
    border: 2px solid black;
    style-bar{
      background-color: black;
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
    ],
    screenHeight: 100
  }
  createBarChart = () => {
    d3.select('.App').selectAll("style-bar").remove(); //removes old data and allows us to add new data
    let dataArr = this.state.fakeDataArr.sort((a, b) => a - b); // sorts the data highest to lowest
    let bar = d3.scaleLinear()
      .domain([0, d3.max(dataArr)])
      .range([0, 500]); //this is the height of the chart.
    d3.select('.App')
      .selectAll('div')
      .data(dataArr)
      .enter().append('style-bar')
      .style('height', (data) => { return bar(data) + 'px'; }) //the length of the bar chart.
      .on("mouseover", function () {
        d3.select(this).style('background-color', 'red')
          .text((data) => { return data; });
      })
      .on("mouseout", function () {
        d3.select(this).style('background-color', 'black')
          .text(() => { return ''; });
      })
      // .text((data) => { return this.setNumber(data); });
  }

  setNumber = (data) => {
    return data; //sets the number for the view
  }

  addItemToChart = () => {
    console.log('adding item')
    this.setState({
      fakeDataArr: Object.assign([], this.state, [...this.state.fakeDataArr, 100 ])
   }) 
  }

  componentDidMount() {
    this.createBarChart();
  }

  componentDidUpdate(prevState) {
    if (prevState.fakeDataArr !== this.state.fakeDataArr) {
      console.log('updating chart');
      this.createBarChart();
    }
  }

  render() {
    
    return (
      <Container>
        <div className="App">

        </div>
        <button onClick={() => this.addItemToChart()}>Add Item</button>
      </Container>
    );
  }
}

export default App;
