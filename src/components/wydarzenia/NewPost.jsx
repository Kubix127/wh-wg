import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

import EdytorTekstu from '../general/edytorTekstu';

export default class NewPost extends React.Component {
	constructor(props){
		super(props);
	
		this.state = {
			title: '',
			text: '',
			autor: '',
			podpis: '',
			posts: [],
			rola: this.props.rola,
			calendar: false,
			date: new Date(),
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.onCalendarChange = this.onCalendarChange.bind(this)
		this.showCalendar = this.showCalendar.bind(this)
		this.onEdytorChange = this.onEdytorChange.bind(this)
	}
	
	componentDidMount() {
		console.log(this.props);
		console.log(this.state.date);
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value});
	}

	onEdytorChange(editorState){
		this.setState({text: editorState})
	}

	onSubmit(e){
		e.preventDefault();

		var date = this.getDate();
		const post = {
			title: this.state.title,
			text: this.state.text,
			autor: this.state.rola,
			date: date,
		}

		if(post.title && post.text){
		return axios
			.post('/api/Wydarzenia', { post })
			.then(response => {
				this.props.getPost();
				this.props.history.replace('/Wydarzenia');
			})
			.catch(err => {
				console.log(err);
			})
		} else {
			alert('Należy wypełnić wszystkie pola')
		}

	}


	onCalendarChange(date) {
		this.setState({date: date});
	} 

	getDate() {
		var year = this.state.date.getFullYear();
		var month = this.state.date.getMonth()+1;
		var day = this.state.date.getDate();

		var date = year+'-'+month+'-'+day;

		return date;
	}

	showCalendar() {
		if(this.state.calendar) {
			this.setState({calendar: false});
		} else {
			this.setState({calendar: true});
		}
	}

	getKwartal() {
		const start = new Date(2022,0,7);
		var kwartal = Math.floor((this.state.date - start)/86400000+1);
		return kwartal
	}

	render() {
		return (
			<div>
				<Link to='/Wydarzenia'>
					<button>{"<<< Powrót"}</button>
				</Link>
				<hr/>

				<form onSubmit={this.onSubmit}>
					<label>Tytuł: </label>
					<input type='text' minLength='1' maxLength='60' onChange={this.onChange} name='title' value={this.state.title} />

					<div onClick={this.showCalendar}>Data: {this.getDate()}, Kwartał: {this.getKwartal()}</div>

					{this.state.rola==='GM' && 
					<div>
						<label>Podpis: </label>
						<input type='text' minLength='1' maxLength='60' onChange={this.onChange} name='podpis' value={this.state.podpis} />
					</div>}

					{this.state.calendar &&
						<div>
							<Calendar 
								minDate = {new Date()}
								onChange = {this.onCalendarChange}
								value = {this.state.date}
							/>
						</div>}
					<br/>
					
					<EdytorTekstu
						text={this.state.text}
						onEdytorChange={this.onEdytorChange}
					/>
					<p><input type='submit' value='Utwórz' /></p>
				</form>
			</div>
		)}
}

