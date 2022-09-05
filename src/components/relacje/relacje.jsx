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
    this.setState({frakcja: {
			Id: this.state.relacje.frakcje.find(element => {return element.Id == Id}).Id,
			Nazwa: this.state.relacje.frakcje.find(element=> {return element.Id == Id}).Nazwa
		}})
  }


	render() {
		if (this.state.loaded)
		return (
			<div style={{'text-align': 'center'}}>
				<DropdownListSelect
					list = {this.state.dropdownList} 
					value = {this.state.frakcja.Id}
					init = {this.init}
				/>
				<div>
					{/* <Protrait frakcja={this.props.rola}/>
					<Protrait frakcja={this.state.frakcja.Nazwa}/> */}
					<div style={{float: 'left'}}>
						<Protrait frakcja={'emblemPlaceholder'}/>
						<div>emblemPlaceholder</div>
					</div>
					<div style={{float: 'right'}}>
						<Protrait frakcja={'emblemPlaceholder'} />	
						<div>emblemPlaceholder</div>
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
