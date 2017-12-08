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
import 'css/hero.css';

class Hero extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = { showHero: true }
	  this.close = this.close.bind(this);
	}
	// removeHero() {
	// 	this.parentNode.removeChild(parentNode); 
	// 	return false;
	// }

	getInitialState(){
	    return { showHero: true };
	}


	close(){
		this.setState({ showHero: false });
	}

	render() {
		return (
			<section className="collapsible-hero">
				<div>
				<span id='close' onClick={this.close}>x</span>
				<div className="collapsible-hero--content n-col-md-4 n-col-offset-3">
					<h5>Customer Spotlight</h5>
					<h1>Cerner is NetApp's 2017 Innovation Award Winner</h1>
					<a className="button">See how they did it</a> 
				</div>
				</div>
			</section>
		)

	}
}

export default Hero;