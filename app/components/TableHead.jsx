const React = require('react');
//
const { Row, Col } = require('react-bootstrap');
class TableHead extends React.Component {
   render() {
      return (<div> <Row> 
         <Col sm={1}> <b>RI </b>  </Col>
         <Col sm={1} ><b> Inspector</b> </Col>
         <Col sm={1} ><b> Part Number </b></Col>
         <Col sm={2} ><b>Description </b></Col>
         <Col sm={1} ><b> Date Inspected</b> </Col>
         <Col sm={1} ><b>Pass /Fail </b> </Col>
         <Col sm={1} > <b>Lot Size </b> </Col>
         <Col sm={2} > <b>Comment</b> </Col>
         <Col sm={1} > <b>View </b> </Col>
            </Row> </div>)
   }

}


module.exports = TableHead;