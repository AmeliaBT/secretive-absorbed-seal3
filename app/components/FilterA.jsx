const React = require('react');
const Link = require('react-router-dom').Link
// style for BOOKS
const style = require('../styles/FormRI');
// other components and etc
const options =require('./exampleData');
const CustomizedTypeahead =require('./CustomizedTypeahead');

//const {Typeahead} = require('react-bootstrap-typeahead');
let test = {a: 1, b: 2};


class FilterA extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }
// <Typeahead
  render() {
    return (
      <div>
          <div className="px-5 py-5">
       
      <CustomizedTypeahead
          labelKey="name" 
        options={options}
        multiple
          placeholder="Choose a state..."
        />      
            
      </div>
         </div>
    );
  }
}
module.exports = FilterA;

/* 
ReactDOM.render(
    <div {...test} />,
    document.getElementById('app')
);


*/