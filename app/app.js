// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import axios from 'axios';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';
import Pagination from 'rc-pagination';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/icon-72x72.png';
import '!file-loader?name=[name].[ext]!./images/icon-96x96.png';
import '!file-loader?name=[name].[ext]!./images/icon-120x120.png';
import '!file-loader?name=[name].[ext]!./images/icon-128x128.png';
import '!file-loader?name=[name].[ext]!./images/icon-144x144.png';
import '!file-loader?name=[name].[ext]!./images/icon-152x152.png';
import '!file-loader?name=[name].[ext]!./images/icon-167x167.png';
import '!file-loader?name=[name].[ext]!./images/icon-180x180.png';
import '!file-loader?name=[name].[ext]!./images/icon-192x192.png';
import '!file-loader?name=[name].[ext]!./images/icon-384x384.png';
import '!file-loader?name=[name].[ext]!./images/icon-512x512.png';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles';

// import sub-components
import Filters from './filters';
import PaginationComponent from './pagination';


// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
      import('intl/locale-data/jsonp/de.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

export class Search extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      photos: [],
      facets: {
        'albumId' : [],
        'id' : [],
        'title': [],
        'url' : []
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  setFacets(new_facets) {
    this.setState({
      facets: new_facets
    });
  }
  componentDidMount() {
    
    var photos = this;
    axios
    .get(`https://jsonplaceholder.typicode.com/photos?albumId=1&albumId=2`)
    .then(res => this.setState({ photos: res.data }))
    .catch(err => console.log(err))

    this.setState({
      photos: photos
    });
    
  }

  handleChange() {
    this.setState({
      searchString: this.refs.search.value
    });
    this.refs.search.focus();
  }
  // shouldUseAlbumIdFilter() {
  //   return this.state.facets['albumId'].length > 0;
  // }
  // shouldUseIdFilter() {
  //   return this.state.facets['id'].length > 0;
  // }
  shouldUseUrlFilter() {
    return this.state.facets['url'].length > 0;
  }
  shouldUseTitleFilter() {
    return this.state.facets['title'].length > 0;
  }
  render() {
    let _photos = this.state.photos;
    let search = this.state.searchString.trim().toLowerCase();
    
    if (search.length > 0) {
      _photos = _photos.filter(function(photo) {

        let combined_string = photo.albumId + photo.thumbnailUrl.toLowerCase() + photo.url + photo.id + photo.title.toLowerCase();
            
        return combined_string.toLowerCase().match(search);
      });
      
    }
    // Arrow functions  :   ( ar1, ar2) => { console.log('abc') }   ===>   function(ar1, ar2) { console.log('abc')  }
    if (_photos != null && Array.isArray(_photos)) {
      // if (this.shouldUseAlbumIdFilter()) {
      //   _photos = _photos.filter((photo) => {
      //     return this.state.facets['albumId'].indexOf(photo['albumId']) !== -1;
      //   });
      // }
      // if (this.shouldUseIdFilter()) {
      //   _photos = _photos.filter((photo) => {
      //     return this.state.facets['id'].indexOf(photo['id']) !== -1;
      //   });
      // }
      if (this.shouldUseUrlFilter()) {
        _photos = _photos.filter((photo) => {
          return this.state.facets['url'].indexOf(photo['url']) !== -1;
        });
      }
      if (this.shouldUseTitleFilter()) {
        _photos = _photos.filter((photo) => {
          return this.state.facets['title'].indexOf(photo['title']) !== -1;
        });
      }
      return (
        <div>
          <h3>React - filter and search</h3>
          <div>
            <Filters photos={_photos} setFacetsForFilter={(facets) => this.setFacets(facets)}/>
            <input style = {{float: 'left'}}
              type="text"
              value={this.state.searchString}
              ref="search"
              onChange={this.handleChange}
              placeholder="type name here"
            />
            {
            <div>
            <Pagination
              onChange={this.onChange}
              // current={this.state.current}
              total={50}
              showLessItems
              showTitle={true}
            />
          </div>
            } 
            {_photos.map(l => {
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
        </div>
      );
    } else {
      return <span> Loading ... </span>;
    }
  }
}




ReactDOM.render(<Search />, document.getElementById("app"));
//end search functionality
// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
