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
      margin: 2px;
      transform: scaleY(-1);
      justify-content: middle;
      vertical-align: middle;
      text-align: center;
      padding: 20px;
      transition: .2s all;
      &:hover{
        flex: 1.2;
      }
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
    .button-container{
      height: 120px;
      .add-button{
      width: 100px;
      height: 40px;
      border-radius: 18px;
      margin: 40px;
      border: none;
      background: blueviolet;
      color: white;
      transition: .2s all;
      &:hover{
        width: 110px;
        height: 50px;
        background-color: orange;
      }
    }
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
    if (this.state.fakeDataArr.length < 20) {
      console.log('adding item')
      const randomNumber = Math.floor(Math.random() * 1000)
      this.setState({
        fakeDataArr: Object.assign([], this.state, [...this.state.fakeDataArr, randomNumber])
      }) 
    }
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
        <div className='button-container'>
          <button className='add-button' onClick={() => this.addItemToChart()}>Add Item</button>
        </div>
        
        <div className="App" />
        
        <div className ='data'>{this.state.currentData}</div>
      </Container>
    );
  }
}

export default App;
