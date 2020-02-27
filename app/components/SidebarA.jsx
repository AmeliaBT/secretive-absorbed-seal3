/
const React = require('react');
const Link = require('react-router-dom').Link
// style for BOOKS
//const style = require('../styles/FormRI');
// other components and etc
const options =require('./exampleData');
//const CustomizedTypeahead =require('./CustomizedTypeahead');

const {Typeahead} = require('react-bootstrap-typeahead');


class SudebarA extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'xxReact'
    };
  }
// <Typeahead
  render() {
    return (
      <div>
          <div className="px-5 py-5">
       
      <Typeahead
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
module.exports = SudebarA;

/*<CustomizedTypeahead
          labelKey="name" 
        options={options}
        multiple
          placeholder="Choose a state..."
        />   */