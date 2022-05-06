import React from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser'; 
import { Link, useParams } from 'react-router-dom';

import PostEfekty from './PostEfekty';

export default class post extends React.Component {
	constructor(props){
		super(props);
	
		this.state = {
			id: this.props.post.Id || '',
			title: this.props.post.Title || '',
			text: this.props.post.Text || '',
			autor: this.props.post.Autor || '',
			// Obecnie zalogowane konto.
			rola: this.props.rola,
			efekty: [],
			Zakres_Id: {
				Frakcja: [],
				Prowincja: [],
				Miasto: [],
				Budynek: [],
				Armia: [],
				Jednostka: [],
			},
			edit: '',
		}
		this.onClick=this.onClick.bind(this);
		this.onChange=this.onChange.bind(this);
		this.deletePost=this.deletePost.bind(this);
	}
	
	componentDidMount() {
		// console.log(this.props.data)
		this.getZakresId('Prowincja')

	}

	componentDidUpdate() {
		// console.log(this.state)
	}

	onClick(e){
		this.setState({ edit: e.target.value});
	}
	onChange(e){
		this.setState({ [e.target.name]: e.target.value});
				// console.log(e.target)
	}

	deletePost() {
		const post = {
			id: this.state.id,
		};

		return axios
			.post('../api/wydarzenia/post/delete', post)
			.then(response =>{
					this.props.getPost();
					this.props.history.replace('/Wydarzenia');
				})
				.catch(err => {
					console.log(err);
				})
	}

	getZakresId() {
		return axios
			.get('/api/wydarzenia/efekty/Zakres')
			.then(response =>{
				this.setState({Zakres_Id: response.data});
				})
				.catch(err => {
					console.log(err);
				})
	}

	submitted() {
	}
	Submit() {
		const efekty = this.state.efekty;

		return axios
			.post('../api/wydarzenia/efekty/Dodaj', efekty)
			.then(response =>{
				console.log(response.data)
				this.setState({edit: ''});
				})
				.catch(err => {
					console.log(err);
				})
	}

	render() {
		return (
				<div>
					<Link to='/Wydarzenia'>
						<button>{"<<< Powrót"}</button>
					</Link>
					<hr/>
					<h2>{this.state.title}</h2>
					<div> { ReactHtmlParser (this.state.text) } </div>
					<hr/>
					<p>{this.state.autor}</p>
					{/*Modyfikacja ze strony GM*/}
					{this.state.rola==='GM' && 
					<div>
						<hr />
						<p>Moderacja:	
							<button onClick={this.onClick} value={'Efekty'}>Efekty</button> 
							<button onClick={this.onClick} value={'Usuń'}>Usuń</button>
						</p>

						{(this.state.edit==='Efekty' && this.props.wydarzenia_efekty) && 
							<PostEfekty
								wydarzenia_efekty={this.props.wydarzenia_efekty}
								Zakres_Id={this.state.Zakres_Id}
							/>
						}

						{this.state.edit==='Usuń' && 
						<p>Na pewno? 
							<button onClick={this.deletePost}>Usuń</button>
						</p>}
					</div>
					}
				</div>
		)}
}

