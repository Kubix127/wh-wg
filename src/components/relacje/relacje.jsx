import React from 'react';
import DropdownListSelect from '../general/dropdownListSelect';

import Protrait from '../general/portrait';

export default class Relacje extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			frakcja: {
				Id: null,
				Nazwa: ''
			},
			relacje: this.props.relacje || {},
			dropdownList: [],
			loaded: false,
		}
		this.init = this.init.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		if (!this.state.loaded) {
			this.waitForDataLoad()
		}
		console.log('relacje mount')
		console.log(this.state)
		console.log(this.props)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.relacje !== this.props.relacje)
			this.setState({relacje: this.props.relacje})

		if (!this.state.loaded) {
			this.waitForDataLoad()
		}
		console.log('relacje update')
		console.log(this.state)
		console.log(this.props)
	}

	waitForDataLoad() {
		if (typeof(this.state.relacje.frakcje) === 'object' && this.state.relacje.frakcje.length) {
			console.log('relacje loaded!')
			this.createList()
			this.setState({loaded: true})
		}
	}

	createList() {
		const list = this.state.relacje.frakcje
		var newList = []
		list.forEach(element => {
			newList.push({name: element.Nazwa, value: element.Id})
		});

		this.setState({dropdownList: newList})
	}

	init(Id) {
    this.setState({frakcja: this.state.relacje.frakcje.find(element => {return element.Id == Id})})
  }

	onChange(e) {
    this.setState({frakcja: this.state.relacje.frakcje.find(element => {return element.Id == e.target.value})})
  }


	render() {
		if (this.state.loaded)
		return (
			<div style={{'textAlign': 'center'}}>
				<DropdownListSelect
					onChange = {this.onChange}
					list = {this.state.dropdownList} 
					value = {this.state.frakcja.Id}
					init = {this.init}
				/>
				<div>
					<div style={{float: 'left'}}>
						<Protrait frakcja={'emblemPlaceholder'}/>
						{/* <Protrait frakcja={this.props.frakcja.Nazwa}/> */}
						<div>{this.props.frakcja.Nazwa}</div>
					</div>
					<div style={{float: 'right'}}>
						<Protrait frakcja={'emblemPlaceholder'} />	
						{/* <Protrait frakcja={this.state.frakcja.Nazwa}/> */}
						<div>{this.state.frakcja.Nazwa}</div>
					</div>
				</div>
			</div>
		)
		else 
		return (
			<div>
				Loading...
			</div>
		)
	}
}
