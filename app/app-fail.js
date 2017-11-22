// /**
//  * app.js
//  *
//  * This is the entry file for the application, only setup and boilerplate
//  * code.
//  */
// // Needed for redux-saga es6 generator support
// import 'babel-polyfill';

// // Import all the third party stuff
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
// import axios from 'axios';
// import FontFaceObserver from 'fontfaceobserver';
// import createHistory from 'history/createBrowserHistory';
// import 'sanitize.css/sanitize.css';



// // Import root app
// import App from 'containers/App';

// // Import Language Provider
// import LanguageProvider from 'containers/LanguageProvider';

// // Load the favicon, the manifest.json file and the .htaccess file
// /* eslint-disable import/no-webpack-loader-syntax */
// import '!file-loader?name=[name].[ext]!./images/favicon.ico';
// import '!file-loader?name=[name].[ext]!./images/icon-72x72.png';
// import '!file-loader?name=[name].[ext]!./images/icon-96x96.png';
// import '!file-loader?name=[name].[ext]!./images/icon-120x120.png';
// import '!file-loader?name=[name].[ext]!./images/icon-128x128.png';
// import '!file-loader?name=[name].[ext]!./images/icon-144x144.png';
// import '!file-loader?name=[name].[ext]!./images/icon-152x152.png';
// import '!file-loader?name=[name].[ext]!./images/icon-167x167.png';
// import '!file-loader?name=[name].[ext]!./images/icon-180x180.png';
// import '!file-loader?name=[name].[ext]!./images/icon-192x192.png';
// import '!file-loader?name=[name].[ext]!./images/icon-384x384.png';
// import '!file-loader?name=[name].[ext]!./images/icon-512x512.png';
// import '!file-loader?name=[name].[ext]!./manifest.json';
// import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
// /* eslint-enable import/no-webpack-loader-syntax */

// import configureStore from './configureStore';

// // Import i18n messages
// import { translationMessages } from './i18n';

// // Import CSS reset and Global Styles
// import './global-styles';

// // import sub-components
// import Filters from './filters';
// import { Search } from './search';

// // Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// // the index.html file and this observer)
// const openSansObserver = new FontFaceObserver('Open Sans', {});

// // When Open Sans is loaded, add a font-family using Open Sans to the body
// openSansObserver.load().then(() => {
//   document.body.classList.add('fontLoaded');
// }, () => {
//   document.body.classList.remove('fontLoaded');
// });

// // Create redux store with history
// const initialState = {};
// const history = createHistory();
// const store = configureStore(initialState, history);
// const MOUNT_NODE = document.getElementById('app');

// const render = (messages) => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <LanguageProvider messages={messages}>
//         <ConnectedRouter history={history}>
//           <App />
//         </ConnectedRouter>
//       </LanguageProvider>
//     </Provider>,
//     MOUNT_NODE
//   );
// };

// if (module.hot) {
//   // Hot reloadable React components and translation json files
//   // modules.hot.accept does not accept dynamic dependencies,
//   // have to be constants at compile-time
//   module.hot.accept(['./i18n', 'containers/App'], () => {
//     ReactDOM.unmountComponentAtNode(MOUNT_NODE);
//     render(translationMessages);
//   });
// }

// // Chunked polyfill for browsers without Intl support
// if (!window.Intl) {
//   (new Promise((resolve) => {
//     resolve(import('intl'));
//   }))
//     .then(() => Promise.all([
//       import('intl/locale-data/jsonp/en.js'),
//       import('intl/locale-data/jsonp/de.js'),
//     ]))
//     .then(() => render(translationMessages))
//     .catch((err) => {
//       throw err;
//     });
// } else {
//   render(translationMessages);
// }
// //start search functionality
// // let users = [
// //   {
// //     name: "Leonard Rogers",
// //     email: "egestas@justonecante.org"
// //   },
// //   {
// //     name: "Walker Pace",
// //     email: "erat.eget.tincidunt@idsapienCras.org"
// //   },
// //   {
// //     name: "Lance Mcintyre",
// //     email: "Nam.ligula@quamvel.net"
// //   },
// //   {
// //     name: "Rudyard Conway",
// //     email: "sit@nunc.org"
// //   },
// //   {
// //     name: "Chadwick Oneal",
// //     email: "laoreet@dictum.edu"
// //   },
// //   {
// //     name: "Isaiah Kent",
// //     email: "diam.dictum@lobortisquam.co.uk"
// //   },
// //   {
// //     name: "Griffith Perkins",
// //     email: "congue@acfermentumvel.ca"
// //   },
// //   {
// //     name: "Lawrence Wheeler",
// //     email: "ac.libero@Duisac.org"
// //   },
// //   {
// //     name: "Preston Walker",
// //     email: "egestas.rhoncus@eudui.co.uk"
// //   },
// //   {
// //     name: "Simon Brewer",
// //     email: "nunc.sed@Fuscediamnunc.co.uk"
// //   }
// // ];

// class SearchApp extends React.Component {
 
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchString: "",
//       photos: []
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   componentDidMount() {
    
//     var photos = this;
//     // axios
//     // .get(`https://jsonplaceholder.typicode.com/photos`)
//     // .then(res => this.setState({ photos: res.data }))
//     // .catch(err => console.log(err))

//     this.setState({
//       photos: photos
//     });
//     this.refs.search.focus();
//   }

//   handleChange() {
//     this.setState({
//       searchString: this.refs.search.value
//     });
//   }

//   render() {
//     let _photos = this.state.photos;
//     let search = this.state.searchString.trim().toLowerCase();

//     if (search.length > 0) {
//       _photos = _photos.filter(function(photo) {
//         return photo.title.toLowerCase().match(search);
//         return photo.albumId.toLowerCase().match(search);
//       });
//     }

//     return (
//       <div>
//         <h3>React - filter and search</h3>
//         <div>
//           <Filters photos={this.state.photos}/>
//           <Search />
//         </div>
//       </div>
//     );
//   }
// }




// ReactDOM.render(<SearchApp />, document.getElementById("app"));
// //end search functionality
// // Install ServiceWorker and AppCache in the end since
// // it's not most important operation and if main code fails,
// // we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
