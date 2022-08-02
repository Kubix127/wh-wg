import React from 'react';
import axios from 'axios';
import { Route, Switch, Link } from 'react-router-dom';

import './wydarzenia.css';

import Post from './post';
import NewPost from './NewPost';

export default class wydarzenia extends React.Component {
	constructor(props){
		super(props);
	
		this.state = {
			posts: [],
		}
		this.getPost=this.getPost.bind(this);
	}
	
	componentDidMount() {
		this.getPost();
	}
	
	getPost() {
		return axios
			.get('/api/Wydarzenia')
			.then(response => {
				// console.log(response.data);
				this.setState({posts: response.data})
			})
			.catch(err => {
				console.log(err);
			})
	}




	render() {
		var id = parseInt(new URLSearchParams(this.props.location.search).get("id"));
		var posts = this.state.posts;
		var post = posts.find(e=>e.Id===id);


		return (
			<div id='wydarzenia'>
			<Switch>

				<Route path="/Wydarzenia/new">
					<NewPost rola={this.props.rola} getPost={this.getPost} history={this.props.history}/>
			</Route>
				<Route path="/Wydarzenia" exact>
				<div id='new_post'><Link to='/Wydarzenia/new'><button>Utwórz nowy</button></Link></div>
				<hr />
					{this.state.posts.map(post =>
						<Link className='post_link' to={"/Wydarzenia/post?id="+post.Id} key={post.Id}>
							<div className='post'>
								<h2>{post.Kwartał} | {post.Title}<span className='wydarzenia_autor'>{post.Autor}</span></h2>
							</div>
						</Link>
					)}
				</Route>
				<Route path="/Wydarzenia/post/">
					{post ? 
						<Post 
							post={post} 
							rola={this.props.rola} 
							getPost={this.getPost} 
							wydarzenia_efekty = {this.props.wydarzenia_efekty}
							history={this.props.history}
						/>
					: <div>Jeżeli post się nie ładuje, to najprawdopodobniej nie istnieje, albo coś się zepsuło. :/</div>}
				</Route>
			</Switch>
			</div>
		)}
}

