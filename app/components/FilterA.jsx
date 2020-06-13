//Fillter component used in many pages
const React = require('react');
//const ReactDOM = require('react-dom');

//const style = require('../styles/FilterA');

class FilterA extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      model: '', 
      pn: '' ,
      comment: '' ,
      sel_radio_a: '',
      sel_radio_b: '',
      sel_radio_c: '',
      sel_radio_d: '',
      supplier:'',
      source:'',
      destination:'',
      riN:"",
      clearFilter:false
      
} 

   this.handleChangeValue = this.handleChangeValue.bind(this);
    this.submitForm = this.submitForm.bind(this);
      this.clearForm = this.clearForm.bind(this);
     this.onRadioChange = this.onRadioChange.bind(this);
     this.onRadioChangeB = this.onRadioChangeB.bind(this);
    this.onRadioChangeC = this.onRadioChangeC.bind(this);
    this.onRadioChangeD = this.onRadioChangeD.bind(this);
}  
submitForm(e) { 
  e.preventDefault(); 
  //check if any filter was set
  this.props.handleData(this.state) } ;  

  clearForm() {
    this.setState({ 
       model: '', 
      pn: '' ,
       comment: '' ,
     sel_radio_a: '',
      sel_radio_b: '',
       sel_radio_c: '',
      sel_radio_d: '',
      supplier:'',
  source:'',
  destination:'',
       riN:"",
      clearFilter:true //do not load table
         
    }); 
  }
  
  
   handleChangeValue(event) {
     const target = event.target;
      const value = target.value;
     if (value !== ''){this.setState( {clearFilter:false})};
      const name = target.name;
      this.setState({ [name]: value });
  }
  
   onRadioChange(e){
    this.setState({
      sel_radio_a: e.target.value
    });
        if (e.target.value !== ''){this.setState( {clearFilter:false})};
     
  }
  onRadioChangeB(e){
    this.setState({
      sel_radio_b: e.target.value
    });
      if (e.target.value !== ''){this.setState( {clearFilter:false})};
  }
   onRadioChangeC(e){
    this.setState({
      sel_radio_c: e.target.value
    });
       if (e.target.value !== ''){this.setState( {clearFilter:false})};
  }
  onRadioChangeD(e){
    this.setState({
      sel_radio_d: e.target.value
    });
      if (e.target.value !== null){this.setState( {clearFilter:false})};
  }
  render() { return (        <div>        
<form>
  RI Number: <br />
  <input className="filter_input_a" type="text" name="riN"  value={this.state.riN} 
    onChange={this.handleChangeValue}/>  <br />
Description/ Model: <br />
  <input className="filter_input_a" type="text" name="model"  value={this.state.model} 
    onChange={this.handleChangeValue}/>  <br />
Part Number: <br />
  <input className="filter_input_a" type="text" name="pn"  value={this.state.pn} 
    onChange={this.handleChangeValue} /> <br />
  
  Comment: <br />
  <input className="filter_input_a" type="text" name="comment"  value={this.state.comment} 
    onChange={this.handleChangeValue} /> <br /> 
  Inspector: 
    <ul>
      <li>
              <label>
                <input
                  type="radio"
                  value="Tuan"
                  checked={this.state.sel_radio_a === "Tuan"}
                  onChange={this.onRadioChange}
                />
                <span className="filter_lbl">Tuan</span>
              </label>
            </li>

            
            <li>
              <label>
                <input
                  type="radio"
                  value="Jim"
                  checked={this.state.sel_radio_a === "Jim"}
                  onChange={this.onRadioChange}
                />
                <span className="filter_lbl">Jim</span>
              </label>  
      </li>              
            <li>
              <label>
                <input
                  type="radio"
                  value="Other"
                  checked={this.state.sel_radio_a === "Other"}
                  onChange={this.onRadioChange}
                />
                <span className="filter_lbl" >Other</span>
              </label>
            </li> 
          </ul>  
  
  supplier: <br />
  <input className="filter_input_a" type="text" name="supplier"  value={this.state.supplier} 
    onChange={this.handleChangeValue} /> <br />
 Source: <br />
  <input className="filter_input_a" type="text" name="source"  value={this.state.source} 
    onChange={this.handleChangeValue} /> <br />
  Destination: <br />
  <input className="filter_input_a" type="text" name="destination"  value={this.state.destination} 
    onChange={this.handleChangeValue} /> <br />

Pass/Fail: 
    <ul>
      <li>
              <label>
                <input
                  type="radio"
                  value="Pass"
                  checked={this.state.sel_radio_b === "Pass"}
                  onChange={this.onRadioChangeB}
                />
                <span className="filter_lbl">Pass</span>
              </label>
            </li>

            
            <li>
              <label>
                <input
                  type="radio"
                  value="Fail"
                  checked={this.state.sel_radio_b === "Fail"}
                  onChange={this.onRadioChangeB}
                />
                <span className="filter_lbl">Fail</span>
              </label>  
      </li>              
            <li>
              <label>
                <input
                  type="radio"
                  value="Other"
                  checked={this.state.sel_radio_b === "Other"}
                  onChange={this.onRadioChangeB}
                />
                <span className="filter_lbl" >Other</span>
              </label>
            </li> 
          </ul>    
  
  
   
 Lot Size: 
    <ul>
      <li>
              <label>
                <input
                  type="radio"
                  value="<100"
                  checked={this.state.sel_radio_c === "<100"}
                  onChange={this.onRadioChangeC}
                />
                <span className="filter_lbl">  &lt; 100 </span>
              </label>
            </li>

            
            <li>
              <label>
                <input
                  type="radio"
                  value="100-1000"
                  checked={this.state.sel_radio_c === "100-1000"}
                  onChange={this.onRadioChangeC}
                />
                <span className="filter_lbl">100-1000</span>
              </label>  
      </li>              
            <li>
              <label>
                <input
                  type="radio"
                  value=">1000"
                  checked={this.state.sel_radio_c === ">1000"}
                  onChange={this.onRadioChangeC}
                />
                <span className="filter_lbl" > &gt; 1000 </span>
              </label>
            </li> 
          </ul>  
  Date Span: 
    <ul>
      <li>
              <label>
                <input
                  type="radio"
                  value="last12"
                  checked={this.state.sel_radio_d === "last12"}
                  onChange={this.onRadioChangeD}
                />
                <span className="filter_lbl"> last 12 months</span>
              </label>
            </li>

            
            <li>
              <label>
                <input
                  type="radio"
                  value="all"
                  checked={this.state.sel_radio_d === "all"}
                  onChange={this.onRadioChangeD}
                />
                <span className="filter_lbl">all</span>
              </label>  
      </li>              
            
          </ul>  

  <input type="button" value="Submit" onClick={this.submitForm}/></form> 
   
    <input type="button" value="Clear" onClick={this.clearForm}/>
    </div>    )  }}


module.exports = FilterA;

