/* ****************************************
https://www.npmjs.com/package/react-google-charts
https://stackoverflow.com/questions/32950708/google-charts-json-date-react
https://react-google-charts.com/data-sources/from-api
*************************************************** */
const React = require('react');
const Link = require('react-router-dom').Link
//const Header = require('./Header');
const  { Chart }= require('react-google-charts'); 
var data = google.visualization.arrayToDataTable([
      ['Year', 'Product', 'Value'],
      [2015, 'A', 10],
      [2015, 'B', 20],
      [2016, 'C', 30],
      [2016, 'D', 40]
    ]);

    // format year as string
    var formatYear = new google.visualization.NumberFormat({
      pattern: '0000'
    });
    formatYear.format(data, 0);

    // create data view
    var view = new google.visualization.DataView(data);

    // init column arrays
    var aggColumns = [];

    // use formatted year as first column
    var viewColumns = [{
      calc: function (dt, row) {
        return dt.getFormattedValue(row, 0);
      },
      label: data.getColumnLabel(0),
      type: 'string'
    }];







const chartEvents = [
  {
    eventName: "select",
    callback({ chartWrapper }) {
      console.log("Selected ", chartWrapper.getChart().getSelection());
    }
  }
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
      height="400px"
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

