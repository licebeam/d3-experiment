import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3'; //import all of d3

const Container = styled.div`
  background-color: white;
  height: 100vh;
  background: linear-gradient(270deg, #dc64ff, #ffd364);
  background-size: 400% 400%;
  animation: AnimationName 30s ease infinite;
  @keyframes AnimationName { 
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
  }
  .App{
    display: flex;
    color: white;
    font-size: .8rem;
    transform: scaleY(-1);
    /* border: 2px solid white; */
    style-bar{
      background-color: blueviolet;
      flex: 1;
      border: 1px solid darkblue;
      margin: 4px;
      transform: scaleY(-1);
      justify-content: middle;
      vertical-align: middle;
      text-align: center;
      padding: 20px;
    }
  }
   .data{
      color: white;
      padding: 10px; 
      margin-top: 10px;
      text-align: center;
      font-size: 2rem;
      height: 100px;
    }
`
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fakeDataArr: [
        1, 2, 3, 10, 20, 100, 1000, 25, 800,
      ],
      screenHeight: 100,
      currentData: null
    }
  }
 
  createBarChart = () => {
    var that = this // rebinds this to call state
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
        d3.select(this).style('background-color', 'orange')
          .text((data) => { return data; });
      })
      .on("mouseout", function () {
        d3.select(this).style('background-color', 'blueviolet')
          .text(() => { return ''; });
      })
      .on("click", function (data) {
       that.setNumber(data)
      })
  }

  setNumber = (data) => {
    this.setState({ currentData: data })
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

  componentDidUpdate(prevProps, prevState) {//REMEMBER TO USE BOTH ARGUMENTS
    if (this.state.fakeDataArr !== prevState.fakeDataArr && this.state.currentData === prevState.currentData) {
      console.log('updating chart');
      this.createBarChart();
    }
  }

  render() {
    
    return (
      <Container>
        <div className="App"/>
        <div className ='data'>{this.state.currentData}</div>
        <button onClick={() => this.addItemToChart()}>Add Item</button>
      </Container>
    );
  }
}

export default App;
