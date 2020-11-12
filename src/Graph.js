import React from "react";
import logo from "./brand-logo.png";
import * as d3 from 'd3' 

 const generateGraph = () =>  {

    var maxVal = d3.max(this.state.data.map(details => Number(details.balance)));
    console.log(maxVal);
    var svg = d3
      .select("#visualisation")
      .append("svg")
      .attr("width", 500)
      .attr("height", 200);

    svg
      .selectAll("rect")
      .data(this.state.data)
      .enter()
      .append("rect")
      .attr("transform", function (d, i) {
        return "translate(" + 60 + "," + i * 25 + ")";
      })
      .attr("fill", "blue")
      .attr("height", 20)
      .attr("width", function (d) {
        return d.balance /maxVal * 500 + "px";
      });
      
    svg
      .selectAll("text")
      .data(this.state.data)
      .enter()
      .append("text")
      .attr("transform", function (d, i) {
        return "translate(0," + Number(i * 25 + 15) + ")";
      })
      .attr("fill", "red")
      .text(function (d) {
        return d.account;
      });
  } 
  
  export default generateGraph;