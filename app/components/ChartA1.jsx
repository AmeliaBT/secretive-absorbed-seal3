/* ****************************************
https://www.npmjs.com/package/react-google-charts
https://stackoverflow.com/questions/32950708/google-charts-json-date-react
https://react-google-charts.com/data-sources/from-api
*************************************************** */
const React = require('react');
const Link = require('react-router-dom').Link
const Header = require('./Header');
const  { Chart }= require('react-google-charts'); 
const chartEvents = [
  {
    eventName: "select",
    callback({ chartWrapper }) {
      console.log("Selected ", chartWrapper.getChart().getSelection());
    }
  }
];
const data = [
  ["age", "weight"],
  [8, 12],
  [4, 5.5],
  [11, 14],
  [4, 5],
  [3, 3.5],
  [6.5, 7]
];
 
const options = {
  title: "Age vs. Weight comparison",
  hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
  vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  legend: "none"
};


class ChartA1 extends React.Component {
  
  render() {
  
//const ExampleChart = () => {
  return (
    <Chart
      chartType="ScatterChart"
      data={data}
      options={options}
      graphID="ScatterChart"
      width="100%"
      height="300px"
      legendToggle
      chartEvents={chartEvents}
    />
  );
};
}
  /*
  render() {
    return (
      <div>    <Header/>
      <div className={"my-pretty-chart-container"}>
        <Chart
          chartType="ScatterChart"
          data={[["Age", "Weight"], [4, 5.5],  [5, 9], [6, 12]]}
          width="100%"
          height="400px"
          legendToggle
        />
      </div>
        </div>
    );
  }
}
 */ 
  
module.exports = ChartA1;

