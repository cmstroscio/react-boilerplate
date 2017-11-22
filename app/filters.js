
//Filters
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
// import axios from 'axios';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';
//may want to npm uninstall this, if not used
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class Filters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			facets: []
		}
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(e) {
		const { checked, value } = e.target;
		let { facets } = this.state;
		if(checked && facets.indexOf(value) === -1) {
			facets.push(value);
		}else {
			facets = facets.filter(i => i !== value)
		}
		
		this.props.setFacets(facets);
		this.setState({
			facets
		});
	}
	render() {
		const { facets } = this.state;
		return (
			<div className='container'>
				<h3>Filters:</h3>
				<h4>Album ID</h4>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='1'
						checked={facets.indexOf('albumId') !== -1}
						onChange={this.handleChange} />
					1
				</label>
				</div>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='2'
						checked={facets.indexOf('albumId') !== -1}
						onChange={this.handleChange} />
					2
				</label>
				</div>
				<h4>ID</h4>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='1'
						checked={facets.indexOf('albumId') !== -1}
						onChange={this.handleChange} />
					1
				</label>
				</div>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='2'
						checked={facets.indexOf('albumId') !== -1}
						onChange={this.handleChange} />
					2
				</label>
				</div>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='3'
						checked={facets.indexOf('albumId') !== -1}
						onChange={this.handleChange} />
					3
				</label>
				</div>
				<h4>URL</h4>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='Products'
						checked={facets.indexOf('http://placehold.it/600/f66b97') !== -1}
						onChange={this.handleChange} />
					http://placehold.it/600/f66b97
				</label>
				</div>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='Products'
						checked={facets.indexOf('http://placehold.it/600/d32776') !== -1}
						onChange={this.handleChange} />
					http://placehold.it/600/d32776
				</label>
				</div>
				<h4>Title</h4>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='Title'
						checked={facets.indexOf('accusamus ea aliquid et amet sequi nemo') !== -1}
						onChange={this.handleChange} />
					accusamus ea aliquid et amet sequi nemo
				</label>
				</div>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='Title'
						checked={facets.indexOf('harum velit vero totam') !== -1}
						onChange={this.handleChange} />
					harum velit vero totam
				</label>
				</div>
				<br />
				Active Filters:{facets.join(', ')}
			</div>
		)
	}
}

export default Filters;
// ReactDOM.render(<App />, document.getElementById('app'));
