
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
			facets: {
				'albumId': [],
				'id': [],
				'title': [],
				'url': []
			}
		}
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(e) {
		
		const { checked, value, name } = e.target;
		
		let { facets } = this.state;

		if (typeof facets[name] === 'undefined') {
			facets[name] = [];
		}
		if (checked && facets[name].indexOf(value) === -1) {
			facets[name].push(value);
		} else {
			facets[name] = facets[name].filter(i => i !== value )
		}
		this.props.setFacetsForFilter(facets);
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
						name='albumId'
						checked={this.state.facets['albumId'].toString().indexOf('1') !== -1}
						onChange={this.handleChange} />
					1
				</label>
				</div>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='2'
						name='albumId'
						checked={this.state.facets['albumId'].indexOf('2') !== -1}
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
						name='id'
						checked={this.state.facets['id'].indexOf('1') !== -1}
						onChange={this.handleChange} />
					1
				</label>
				</div>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						name='id'
						value='2'
						checked={this.state.facets['id'].indexOf('2') !== -1}
						onChange={this.handleChange} />
					2
				</label>
				</div>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						name='id'
						value='3'
						checked={this.state.facets['id'].indexOf('3') !== -1}
						onChange={this.handleChange} />
					3
				</label>
				</div>
				<h4>URL</h4>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='http://placehold.it/600/f66b97'
						name='url'
						checked={this.state.facets['url'].indexOf('http://placehold.it/600/f66b97') !== -1}
						onChange={this.handleChange} />
					http://placehold.it/600/f66b97
				</label>
				</div>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='http://placehold.it/600/d32776'
						name='url'
						checked={this.state.facets['url'].indexOf('http://placehold.it/600/d32776') !== -1}
						onChange={this.handleChange} />
					http://placehold.it/600/d32776
				</label>
				</div>
				<h4>Title</h4>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='accusamus ea aliquid et amet sequi nemo'
						name='title'
						checked={this.state.facets['title'].indexOf('accusamus ea aliquid et amet sequi nemo') !== -1}
						onChange={this.handleChange} />
					accusamus ea aliquid et amet sequi nemo
				</label>
				</div>
				<div className='checkbox'>
				<label>
					<input
						type='checkbox'
						value='harum velit vero totam'
						name='title'
						checked={this.state.facets['title'].indexOf('harum velit vero totam') !== -1}
						onChange={this.handleChange} />
					harum velit vero totam
				</label>
				</div>
				<br />
				Active Filters:
				{
					<div dangerouslySetInnerHTML={{__html: this.renderFacets(this.state.facets) }}></div>
				}
			</div>
		)
	}
	renderFacets(facets) {
		let all_facet_keys = Object.keys(facets);
		let str = '';
		all_facet_keys.map(function (key) {
			str += key;
			str = str + ' : ' + facets[key].join(' ') + '<br />'
		})
		return str;
	}
}

export default Filters;
// ReactDOM.render(<App />, document.getElementById('app'));
