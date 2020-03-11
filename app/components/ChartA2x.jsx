/* ****************************************
https://www.npmjs.com/package/react-google-charts
https://stackoverflow.com/questions/32950708/google-charts-json-date-react
https://react-google-charts.com/data-sources/from-api
https://www.github.com/rakannimer/react-google-charts
cd react-google-charts
see this: clowned by myself from github
https://rakannimer-react-google-charts.glitch.me/
*************************************************** */
const React = require('react');
const Link = require('react-router-dom').Link
const Header = require('./Header');
const  { Chart }= require('react-google-charts'); 


//import * as React from "react";
//import * as ReactDOM from "react-dom";
//import { Chart } from "../src";
// Reference : https://developers.google.com/chart/interactive/docs/gallery/timeline
const columns = [
  { type: "string", id: "President" },
  { type: "date", id: "Start" },
  { type: "date", id: "End" }
];

const rows = [
  ["Washington", new Date(1789, 3, 30), new Date(1797, 2, 4)],
  ["Adams", new Date(1797, 2, 4), new Date(1801, 2, 4)],
  ["Jefferson", new Date(1801, 2, 4), new Date(1809, 2, 4)]
];

const companyOne = [
  ["Name", "Popularity"],
  ["Cesar", 250],
  ["Rachel", 4200],
  ["Patrick", 2900],
  ["Eric", 8200]
];

const companyTwo = [
  ["Name", "Popularity"],
  ["Cesar", 370],
  ["Rachel", 600],
  ["Patrick", 700],
  ["Eric", 1500]
];
const DiffChart = () => {
  return (
    <Chart
      chartType="ColumnChart"
      diffdata={{ old: companyOne, new: companyTwo }}
      width="100%"
      height="400px"
    />
  );
};

class ChartA extends React.Component {
  /*
  componentDidMount() {
    setInterval(() => {
      this.setState({ refresh: Date.now() });
    }, 1000);
  }*/
  
  render() {
    return (
      <div className="App">
        <DiffChart />
        <Chart
          chartType="Timeline"
          data={[columns, ...rows]}
          width="100%"
          height="400px"
        />
      </div>
    );
  }
}




//class ChartB extends React.Component< {}, { data: any[][] } > {

/*
  
 */ 
  
module.exports = ChartA;

