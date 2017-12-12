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

// import sub-components
import Filters from './filters';
import PaginationComponent from './pagination';
import Panel from './panel';
import Hero from './hero';

import 'css/netapp-library.min.css';
import 'css/app.css';

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
const RESULT_OFFSET = 10;
export class Search extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      all_photos: [],
      filtered_photos: [],
      facets: {
        'albumId' : [],
        'id' : [],
        'title': [],
        'url' : []
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }
  setFacets(new_facets) {
    this.setState({
      facets: new_facets
    }, () => {
      this.setFilteredResults();
    });
  }
  componentDidMount() {
    axios
    .get(`https://jsonplaceholder.typicode.com/photos?albumId=1&albumId=2`)
    .then(res => {
      this.setState({
        all_photos: res.data,
        filtered_photos: res.data,
        current: 1
      });
    })
    .catch(err => console.log(err))
  }

  handleChange(e) {
    this.setState({
      searchString: this.refs.search.value
    }, () => {
      this.setFilteredResults();
      this.refs.search.focus();
    });
  }
  shouldUseAlbumIdFilter() {
    return this.state.facets['albumId'].length > 0;
  }
  shouldUseIdFilter() {
    return this.state.facets['id'].length > 0;
  }
  shouldUseUrlFilter() {
    return this.state.facets['url'].length > 0;
  }
  shouldUseTitleFilter() {
    return this.state.facets['title'].length > 0;
  }


  setFilteredResults() {
    let {all_photos: photos, searchString=''} = this.state; // Destructuring - MDN
    searchString = searchString.trim().toLowerCase();

    if (this.shouldUseAlbumIdFilter()) {
      photos = photos.filter((photo) => {
        return this.state.facets['albumId'].indexOf(photo['albumId'].toString()) !== -1;
      });
    }
    if (this.shouldUseIdFilter()) {
      photos = photos.filter((photo) => {
        return this.state.facets['id'].indexOf(photo['id'].toString()) !== -1;
      });
    }
    if (this.shouldUseUrlFilter()) {
      photos = photos.filter((photo) => {
        return this.state.facets['url'].indexOf(photo['url']) !== -1;
      });
    }
    if (this.shouldUseTitleFilter()) {
      photos = photos.filter((photo) => {
        return this.state.facets['title'].indexOf(photo['title']) !== -1;
      });
    }
    if (searchString.length > 0) {
      photos = photos.filter(function(photo) {
        let combined_string = photo.albumId + photo.thumbnailUrl.toLowerCase() + photo.url + photo.id + photo.title.toLowerCase();
        return combined_string.toLowerCase().match(searchString);
      });
    }
    this.setState({
      filtered_photos : photos,
      current: 1
    });
  }
  
  onPaginationChange(e) {
    this.setState({
      current: e
    });
  }
  getPaginatedFinalResults() {
    let {current, filtered_photos: photos} = this.state; // Desstructuring

    // a = [1,2,   3,4,   5,6,   7,8]
    //                   --------
    // a = a.slice(4,6)

    // current = 3
    // (current-1)*RESULT_OFFSET, current*RESULT_OFFSET)
    //   (3 - 1)* 2, 3*2
    //   2*2, 6
    //   4, 6
    
    photos = photos.slice((current-1)*RESULT_OFFSET, current*RESULT_OFFSET);
    return photos;
  }
  render() {
    const photos = this.getPaginatedFinalResults();
    if (typeof photos == 'undefined' ||  (Array.isArray(photos) && !photos.length)) {
      return <span> Loading ... </span>;
    }
    return (
      <div>
          <Hero />
          <div className="n-container">
            <div className="n-row">
              <div className="header n-clearfix">
                <h2 className="header__heading"> Customer Stories</h2>
                <input className="header__search-bar"
                type="text"
                value={this.state.searchString}
                ref="search"
                onChange={(e) => this.handleChange(e)}
                placeholder="Search Customer Stories"
                />
              </div>
              <div className="n-row">
                <div className="n-col-md-3"> Filter Results By:
                </div>
                <div className="n-col-md-9">
                  <Pagination 
                    onChange={this.onPaginationChange}
                    current={this.state.current}
                    pageSize={10}
                    total={this.state.filtered_photos.length}
                  />
                </div>
              </div>
            </div>
          <div>
            <Filters photos={photos} setFacetsForFilter={(facets) => this.setFacets(facets)}/>
            <div className="card-wrapper" style={{display: 'flex', flexAlign: 'flex-start', flexFlow: 'row wrap'}}>
              {photos.map(l => {
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
      </div>
      </div>
    );
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
