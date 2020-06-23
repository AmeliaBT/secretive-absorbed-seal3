// component item for Table View  (with edits disabled)
const React = require('react');
const Link = require('react-router-dom').Link
// react-bootstrap
const { Col, Row, Button, Glyphicon } = require('react-bootstrap');
// style 
const style = require('../styles/RIlistItem');
/* component for displaying one line of list  */
class RIlistItemAll extends React.Component {

  constructor(props) {
    super(props);
    let jwo2;
    let jwo = this.props.jwo;//Date Inspected:
    if (jwo == null) { jwo2 = "" } else { jwo2 = jwo.slice(0, -14) };
    let pfColor;
    if (this.props.two === "Pass") { pfColor = "text-success" } else { pfColor = "text-danger" };
    this.state = {
      //img_url: this.props.img_url,
      inspector: this.props.inspector,
      reportID: this.props.reportnumber,
      fwo: this.props.fwo,
      Gwo: this.props.Gwo,
      jwo: jwo2, //this.props.jwo.slice(0,-14), //Date Inspected:
      two: this.props.two, //Pass / Fail:
      owo: this.props.owo,
      record: this.props.record,
      lwo: this.props.lwo,
      pfColor: pfColor

    }
  }


  render() {
    // const {report, showDelete, showDelete2} = this.props;  key={this.state.reportID}
    return (
      <div >

        <div className="table-row-line"  >

          <Row  > 
            <Col sm={1} >{this.state.reportID} </Col>
            <Col sm={1} > {this.state.inspector}</Col>

            <Col sm={1} > <p style={{ fontSize: 12 }}> {this.state.fwo} </p> </Col>
            <Col sm={2} > {this.state.Gwo}</Col>
            <Col sm={1} > {this.state.jwo}</Col>
            <Col sm={1}  ><p style={{ fontWeight: 'bold', fontSize: 14 }} className={this.state.pfColor}>  {this.state.two}</p></Col>
            <Col sm={1} > {this.state.owo}</Col>
            <Col sm={3} > {this.state.record}</Col>
            <Col sm={1} > <Link to={'report-view/' + this.state.reportID}>
              <Button bsSize="xsmall"  >
                <Glyphicon glyph="eye-open" />   </Button></Link> </Col>

            </Row>
        </div>

      </div>
    );
  }
}
module.exports = RIlistItemAll;

