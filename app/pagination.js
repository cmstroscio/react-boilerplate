
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
import '../node_modules/rc-pagination/assets/index.css';
class PaginationComponent extends React.Component {
	state = {
	    current: 3,
	    facets: {
	    	'albumId': [],
	    	'id': [],
	    	'title': [],
	    	'url': []
	    }
	  };
	  onChange = (page) => {
	    console.log(page);
	    this.setState({
	      current: page,
	    });
	  }
	  render() {
	    return <Pagination onChange={this.onChange} current={this.state.current} total={10} />;
	  }
}

export default PaginationComponent;