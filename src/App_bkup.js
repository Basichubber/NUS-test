/* Demo for FinTech@SG Course 
Generation of Charts Based on JSON data from Server
Author: Prof Bhojan Anand */
//Install d3.js:   npm install d3 --save
import React from "react";
import logo from "./brand-logo.png";
import * as d3 from 'd3' 
//import "./Graph.js"
import "./App.css";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 

      data: [], 
      showChart:false,
      showChart1:false,
      showChart2:false
      
    };
    this.showHideChart = this.showHideChart.bind(this);
    this.showHideChart1 = this.showHideChart1.bind(this);
    this.showHideChart2 = this.showHideChart2.bind(this);
  }



  callAPIServer() {
    //fetch("C:\Users\Pei Wen\Desktop\Devkit1code\Day2\accounts.txt")
    fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/accounts")
    .then(res => res.text())
      .then(res => this.setState({ data: JSON.parse(res) }))
      .catch(err => err);

    }

    callAPIServer1() {
      //fetch("C:\Users\Pei Wen\Desktop\Devkit1code\Day2\accounts.txt")
      fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/transactions")
        .then(res => res.text())
        .then(res => this.setState({ data: JSON.parse(res) }))
        .catch(err => err);
        
      
  
      }

      callAPIServer2() {
        //fetch("C:\Users\Pei Wen\Desktop\Devkit1code\Day2\accounts.txt")
        fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/accounts")
          .then(res => res.text())
          .then(res => this.setState({ data: JSON.parse(res) }))
          .catch(err => err);
    
        }
  
  componentDidMount() {
    // react lifecycle method componentDidMount()
    //will execute the callAPIserver() method after the component mounts.
  }
 

 componentDidUpdate() {
  
  /* prepare data */
  console.log(this.state.data);

  // this.state.data.forEach(d=> {
  this.state.data.forEach(function (d) {
    

    if(d.balance){
      d.balance = d.balance.replace(/[^0-9.-]+/g,"");  //regular expression to convert currency to Numeric form
    }

    if(d.amount){
      d.amount = d.amount.replace(/[^0-9.-]+/g,"");  //regular expression to convert currency to Numeric form
    }
   
  });
  
  
  this.showChart();  //improved version way to chart

}

showHideChart(){
  
  this.setState(prevState => ({
   
    showChart: !prevState.showChart
    
  }));
  this.setState({showChart1 : false});
  this.setState({showChart2 : false});
  this.callAPIServer(); console.log(this.data)
}

showHideChart1(){
  
  this.setState(prevState => ({
   
    showChart1: !prevState.showChart1
    
  }));
  this.setState({showChart2 : false});
  this.setState({showChart : false});
  this.callAPIServer1(); console.log(this.data)
}

showHideChart2(){
  
  this.setState(prevState => ({
   
    showChart2: !prevState.showChart2
    
  }));
  this.setState({showChart1 : false});
  this.setState({showChart : false});
  this.callAPIServer2(); console.log(this.data)
}


showChart() {

  
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  var width = 1000 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
  var svg = d3.select("#barChart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  
  svg.selectAll("*").remove();

  var x = d3.scaleBand().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  x.domain(this.state.data.map(details => details.account));
  y.domain([0, d3.max(this.state.data.map(details => details.balance))]);



  svg.selectAll(".bar")
    .data(this.state.data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.account))
    .attr("width", x.bandwidth() - 10)
    .attr("y", d => y(d.balance))
    .attr("height", d => height - y(d.balance));

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  svg.append("g")
    .call(d3.axisLeft(y));
}

showChart1() {

  
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  var width = 1000 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
  var svg = d3.select("#barChart1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  
  svg.selectAll("*").remove();

  var x = d3.scaleBand().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  x.domain(this.state.data.map(details => details.category));
  y.domain([0, d3.max(this.state.data.map(details => details.amount))]);



  svg.selectAll(".bar")
    .data(this.state.data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.category))
    .attr("width", x.bandwidth() - 10)
    .attr("y", d => y(d.amount))
    .attr("height", d => height - y(d.amount));

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  svg.append("g")
    .call(d3.axisLeft(y));
}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">NUSmoney App by Anuflora Bank</h1>
        </header>

      
        {/* {if(this.state.showChart == true)} */}
        {this.state.showChart ? //Show chart true
        //Click and set show chart to false
          <button onClick={this.showHideChart}>
            Hide Accounts
          </button>
        :null} 

          {!this.state.showChart ? //Show Chart false
          //Click and set show chart to true 
            <button onClick={this.showHideChart}>
              Show Accounts
             </button>
           :null} 

  
  {this.state.showChart1 ? 
          <button onClick={this.showHideChart1}>
            Hide Transactions
          </button>
        :null} 

          {!this.state.showChart1 ? 
            <button onClick={this.showHideChart1}>
              Show Transactions
             </button>
           :null} 

  {this.state.showChart2 ? 
          <button onClick={this.showHideChart2}>
            Hide Customers
          </button>
        :null} 

          {!this.state.showChart2 ? 
            <button onClick={this.showHideChart2}>
              Show Customers
             </button>
           :null}

       
       <div>
          <h2> Visualisation of Data</h2>
            
            
            {this.state.showChart ?
            <div id="chart">
            <table className="myTable">
          <tbody>
          {this.state.data.map((item) => {
            return (
              <tr key={item.id}>
                <td> {item.account} </td>
                <td> {item.balance} </td>
              </tr>
            );
          })}
          </tbody>
        </table>
            <svg id="barChart"></svg>
            </div> 
            
            
            :null } 

{this.state.showChart1 ?
            <div id="chart">
            <table className="myTable">
          <tbody>
          {this.state.data.map((item) => {
            return (
              <tr key={item.id}>
                <td> {item.timestamp} </td>
                <td> {item.category} </td>
                <td> {item.account} </td>
                <td> {item.amount} </td>
              </tr>
            );
          })}
          </tbody>
        </table>
            <svg id="barChart1"></svg>
            </div> 
            
            
            :null } 

{this.state.showChart2 ?
            <div id="chart">
            <table className="myTable">
          <tbody>
          {this.state.data.map((item) => {
            return (
              <tr key={item.id}>
                <td> {item.account} </td>
                <td> {item.balance} </td>
              </tr>
            );
          })}
          </tbody>
        </table>
            <svg id="barChart2"></svg>
            </div> 
            
            
            :null } 



       </div>
           
      

      
      </div>
    );
  }
}

export default App;