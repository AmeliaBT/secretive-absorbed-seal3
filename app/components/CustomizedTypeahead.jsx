
const React = require('react');
const Link = require('react-router-dom').Link
//const options =require('./exampleData');
const {Typeahead} = require('react-bootstrap-typeahead');
let test = {a: 1, b: 2};
/* 


ReactDOM.render(
    <div {...test} />,
    document.getElementById('app')
);


*/
class CustomizedTypeahead extends React.Component {
  render() {
    let injectedProps = {};

   // const { options, labelKey } = this.props;

    const { onChange, options, labelKey } = this.props;
    // const { onChange} = this.props;
    
    injectedProps.onChange = (selected) => {

      /* apply interception */
      const forbiddenSelections = ["California", "Texas"];
      // check if user has selected both the forbidden selection
      const isInvalid = selected.filter(option => {
        const label = option[labelKey];
        return forbiddenSelections.includes(label);
      }).length > 1;

      if (isInvalid) {
        alert(`You can't select ${forbiddenSelections.join(',')} together.`);
        // clear all inputs
        this.typeahead.getInstance().clear();
      }

      // run the original onBlur event listener
      if (onChange) onChange(selected);
    }

    return <Typeahead 
      ref={(typeahead) => this.typeahead = typeahead} 
      {...this.props} 
      {...injectedProps} />
  }
}
module.exports = CustomizedTypeahead;


/* 
  return <Typeahead 
      ref={(typeahead) => this.typeahead = typeahead} 
      {...this.props} 
      {...injectedProps} />
*/
//      {...this.props} 
