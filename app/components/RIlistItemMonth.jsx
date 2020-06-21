// component item for Table View  (with edits disabled)
const React = require('react');
// react-bootstrap
const { Col, Row } = require('react-bootstrap');
// style 
const style = require('../styles/RIlistItem');
/* component for displaying one line of list  */
class RIlistItemMonth extends React.Component {
  constructor(props) {
    super(props);
    let pfColor;

    if (this.props.lar < 100) { pfColor = "text-danger" } else { pfColor = "text-success" }
    this.state = {
      month_year: this.props.month_year,
      lotT: this.props.lotT,
      lotA: this.props.lotA,
      lar: this.props.lar,
      lotQty: this.props.lotQty,
      qtyT: this.props.qtyT,
      def: this.props.def,
      defR: this.props.defR,
      pfColor: pfColor
    }
  }
  render() {
    return (
      <div>
        <div className="table-row-line"> <Row >
          <Col sm={3} >{this.state.month_year} </Col>
          <Col sm={1} > {this.state.lotT}</Col>
          <Col sm={1} > {this.state.lotA}</Col>
          <Col sm={1} ><p style={{ fontWeight: 'bold', fontSize: 14 }} className={this.state.pfColor}> {this.state.lar} </p> </Col>

          <Col sm={2} > {this.state.lotQty}</Col>
          <Col sm={2} > {this.state.qtyT}</Col>
          <Col sm={1} > {this.state.def}</Col>
          <Col sm={1} > {this.state.defR}</Col>

        </Row> </div>
      </div>
    );
  }
}
module.exports = RIlistItemMonth;
