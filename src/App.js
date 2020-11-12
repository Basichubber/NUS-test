/* Demo for FinTech@SG Course 
Generation of Charts Based on JSON data from Server
Author: Prof Bhojan Anand */
//Install d3.js:   npm install d3 --save
import React from "react";
import logo from "./brand-logo.png";
import * as d3 from 'd3' ;
import * as d3Collection from 'd3-collection';
//import "./Graph.js"
import "./App.css";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [], 
      showAcctChart:false,
      showTransChart:false,
      showCustomerChart:false
    }
    this.callAccountsAPI = this.callAccountsAPI.bind(this);
    this.callTransactionAPI = this.callTransactionAPI.bind(this);
    this.callCustomersAPI = this.callCustomersAPI.bind(this);
  }

  callAccountsAPI() {
    // fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/accounts")
    fetch("http://localhost:8000/account/all")
    .then(res => res.text())
      .then((res) =>{
        this.setState({ data: JSON.parse(res) })
        // console.log(this.state.data);
        this.drawAcctChart();
       
      })
      .catch(err => err);
  }

  callTransactionAPI() {
    fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/transactions")
      .then(res => res.text())
      .then((res) =>{
        this.setState({ data: JSON.parse(res) })
        this.drawTransChart();
      })
      .catch(err => err);
  }

  callCustomersAPI() {
    fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/customers")
      .then(res => res.text())
      .then((res) =>{
        this.setState({data: JSON.parse(res)})
        // this.setState({showAcctChart:false, showTransChart:false, showCustomerChart:true})
        this.setState(prevState => ({
          showAcctChart: false,
          showTransChart:false,
          showCustomerChart: !prevState.showCustomerChart
        }));
      } )
      .catch(err => err);

  }

  drawAcctChart(){
    // this.setState({showAcctChart:true, showTransChart:false, showCustomerChart:false})
    this.setState(prevState => ({
      showAcctChart: !prevState.showAcctChart,
      showTransChart:false,
      showCustomerChart: false
    }));
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    var width = 1000 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var svg = d3.select("#barChart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    // svg.selectAll("*").remove();

    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    x.domain(this.state.data.map(details => details.account));
    y.domain([0, d3.max(this.state.data.map(details => +details.balance))]);
    

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

  drawTransChart(){
    // this.setState({showAcctChart:false, showTransChart:true, showCustomerChart:false})
    this.setState(prevState => ({
      showAcctChart: false,
      showTransChart:!prevState.showTransChart,
      showCustomerChart: false
    }));
    var totalVals = d3Collection.nest().key(function(d) {
      return d.category;
    })
    .rollup(function(grp) {
      // console.log(grp);
      return d3.sum(grp, function(d) {
        return d.amount;
      });
    }).entries(this.state.data)
    .map(function(d) {
      return {
        category: d.key,
        totalValue: d.value
      };
    });
    

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
  
    x.domain(totalVals.map(details => details.category));
    y.domain([0, d3.max(totalVals.map(details => +details.totalValue))]);
  

    

    totalVals.forEach(function(element) {
      // console.log(element);
      element.totalValue = Math.abs(element.totalValue);
      console.log(element);
    });
    svg.selectAll(".bar")
      .data(totalVals)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.category))
      .attr("width", x.bandwidth() - 10)
      .attr("y", d =>{
        y(+d.totalValue);
        // d.totalValue = Math.abs(d.totalValue)
        // console.log(d.totalValue)
      })
      // .attr("height", d =>  Math.abs(height -y(d.totalValue)));
      // .attr("height", d =>  console.log(height - y(Math.abs(d.totalValue))));
      .attr("height", d =>  height - y(d.totalValue));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
  
    svg.append("g")
      .call(d3.axisLeft(y));
  }

  componentDidUpdate() {

    
  /*    this.state.data.forEach(function (d) {

        // console.log(d)
        if(d.balance){
          d.balance = d.balance.replace(/[^0-9.-]+/g,"");  //regular expression to convert currency to Numeric form
        }
    
        if(d.amount){
          d.amount = d.amount.replace(/[^0-9.-]+/g,"");  //regular expression to convert currency to Numeric form
          // console.log(d.amount)
          // totalAmt = totalAmt+ (+d.amount);
          // d.amount = totalAmt
        }
      
      });*/
  }




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">NUSmoney App by Anuflora Bank</h1>
        </header>

        <button onClick={this.callAccountsAPI}>
           {this.state.showAcctChart?
              <span>Hide Accounts</span>
              :<span> Show Accounts</span>
            }
           
        </button>
        <button onClick={this.callTransactionAPI}>
           {this.state.showTransChart?
              <span>Hide Transactions</span>
              :<span>Show Transactions</span>
            }
           
        </button>
        <button onClick={this.callCustomersAPI}>
            {this.state.showCustomerChart?
              <span>Hide Customers</span>
              :<span>Show Customers</span>
            }
        </button>

        {this.state.showAcctChart?
          // <p>hello</p>
          <div className="acctContainer">
            <table className="myTable acctTable">
              <tbody>
                <tr>
                  <td>account_number</td>
                </tr>
              {this.state.data.map((item) => {
                return (
                  <tr key={item.account_number}>
                    <td> {item.account_number} </td>
                    <td> {item.userid} </td>
                    <td> {item.balance} </td>
                    <td> {item.max_limit} </td>
                    <td> {item.date_created} </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
            <svg id="barChart"></svg>
          </div>
        :null}

        {this.state.showTransChart?
            <div className="transContainer">
              <table className="myTable transTable">
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
          :null}

          {this.state.showCustomerChart?
            <div className="custContainer">
              <table className="myTable custTable">
                <tbody>
                {this.state.data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td> {item.first_name} </td>
                      <td> {item.last_name} </td>
                      <td> {item.email} </td>
                      <td> {item.gender} </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
             
            </div>
          :null}



         </div>
      
    );
  }
}

export default App;