import React from 'react';
import axios from 'axios';

import DropdownListSelect from '../general/dropdownListSelect';


export default class Prowincja extends React.Component {
	constructor(props){
		super(props);
		this.state = {
      edyktId: this.props.edyktId || '',
      edykt: 'Brak',
      opis: '',
      edit: 0,
		}
    this.onChange=this.onChange.bind(this);
    this.saveEydyktChange=this.saveEydyktChange.bind(this);
    this.changeEdykt=this.changeEdykt.bind(this);
    this.init=this.init.bind(this);
	}

  componentDidMount() {
    if (this.props.edyktId !== undefined) {
    this.setState({edykt: this.props.edykty.find(e=> {return e.Id == this.props.edyktId}).Nazwa})
    this.setState({opis: this.props.edykty.find(e=> {return e.Id == this.props.edyktId}).Opis})
    }
  }

  componentDidUpdate(){
    // console.log(this.props)
    // console.log(this.state)
  }

  onChange(e) {
    this.setState({edyktId: e.target.value})
    this.setState({edykt: this.props.edykty.find(element => {return element.Id == e.target.value}).Nazwa})
    this.setState({opis: this.props.edykty.find(element=> {return element.Id == e.target.value}).Opis})
  }

  init(Id) {
    this.setState({edyktId: Id})
    this.setState({edykt: this.props.edykty.find(element => {return element.Id == Id}).Nazwa})
    this.setState({opis: this.props.edykty.find(element=> {return element.Id == Id}).Opis})
  }

  changeEdykt() {
    this.setState({edit: 1})
  }

  saveEydyktChange() {
    const edykt = {
      edyktId: this.state.edyktId,
      prowincjaId: this.props.prowincjaId,
    };


    return axios
			.post('/api/users/prowincje/changeEdykt', edykt)
      .then(response =>{
        this.setState({
          edit: 0,
        })
      })
			.catch(err => {
				console.log(err);
			})
  }

	render(){
    const list = [...this.props.edykty]
    var newList = []
    list.forEach(element => {
      newList.push({name: element.Nazwa, value: element.Id})
    });
			return (
        <>
        {this.state.edit ?
          <>
            <DropdownListSelect
              list={newList}
              onChange={this.onChange}
              init={this.init}
              value={this.state.edyktId}
            />
            <button onClick={this.saveEydyktChange}>Ok!</button>
            <div>{this.state.opis}</div>
          </>
          :
          <>
            {' '+this.state.edykt+' '}
            <button onClick={this.changeEdykt}>Zmień</button>
          </>
        }
        </>
      )
	}
}

