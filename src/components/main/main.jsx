import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import parse from 'html-react-parser';

import PageEdit from '../general/PageEdit'

export default class Main extends React.Component {
constructor(props) {
	super(props)
	this.state = {
		name: 'main',
		paragraphs: this.props.paragraphs || []
	}
	this.editPage = this.editPage.bind(this)
}

componentDidUpdate(prevProps) {
	if (prevProps.paragraphs !== this.props.paragraphs) { 
		this.setState({paragraphs: this.props.paragraphs});
	}
	console.log(this.state)
}

editPage(paragraphs) {
	this.setState({paragraphs: paragraphs})
}
	
render(){
	if(this.state.paragraphs===null){
		this.setState({paragraphs: []})
		return
	}
	
	return (
	<div className='wide'><Switch>
		
			<Route path="/main" exact>
				<>
					{this.props.rola==='GM' &&
					<>
						<Link to='/main/edit'><button>Edycja</button></Link>
						<hr/>
					</>
					}
					{this.state.paragraphs.length && this.state.paragraphs.map(paragraph =>
						<div key={paragraph.page+'_'+paragraph.pageId}>
							{parse(paragraph.content)}
						</div>
					)}
				</>
			</Route>
			<Route path="/main/edit">
				{this.props.rola==='GM' &&
					<>
						<Link to='/main'><button>Powrót</button></Link>
						<hr/>
						<PageEdit
							name = {this.state.name}
							paragraphs = {this.state.paragraphs}
							editPage = {this.editPage}
						/>
					</>
				}
			</Route>
		
	</Switch></div>)
}
}