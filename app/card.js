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
import 'css/card.css';

class Card extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			photos: []
		}
	}

	render() {
		return (
			<div style={{display: 'flex', flexAlign: 'flex-start', flexFlow: 'row wrap'}}>
			  {this.state.photos.map(l => {
			    return (
			      <div className="card" style={{border: '1px solid #454545', width: '150px', height: '270px', margin: '10px', display: 'inline-block', float: 'left', clear: 'left'}} key={l.id.toString()}>
			        <div>
			          {l.name} <img src={l.thumbnailUrl} style={{display: 'block'}}/>
			          {l.id} <a href="#">{l.title}</a>
			        </div>
			      </div>
			    );
			  })}
			</div>
		)
	}
}

export default Card;