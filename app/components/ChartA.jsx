/* ****************************************
https://www.npmjs.com/package/react-google-charts
https://stackoverflow.com/questions/32950708/google-charts-json-date-react
*************************************************** */
const React = require('react');
const Link = require('react-router-dom').Link
const Header = require('./Header');
const  { Chart }= require('react-google-charts'); 



class ChartA extends React.Component {
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
  
  
module.exports = ChartA;

