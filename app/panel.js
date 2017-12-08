
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
import 'panel.css';


class Panel extends React.Component {
  state = {
    isOpen: true,
  };
  
  togglePanel() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  
  render() {
    const button = (
      <button 
        onClick={this.togglePanel.bind(this)}
        >
        Open me...
      </button>
    );
    
    return (
      <div>
        {button}
        <div className={`Panel ${this.state.isOpen ? 'open' : 'hide'}`}>
          <div>{this.props.title}</div>
        </div>
      </div>
    );
  }
}

// const panels = [
//   {
//     title: 'First panel',
//   },
//   {
//     title: 'Second panel',
//   },
//   {
//     title: 'Third panel',
//   },
// ];

export default Panel;

// class App extends React.Component {
//   renderPanel = (item, key) => {
//     return (
//       <Panel key={key} title={item.title}/>
//     );
//   };
  
//   render() {
//     return (
//         <div>
//           <h1>Panels</h1>
//           {
//             panels.map(this.renderPanel)
//           }
//         </div>
//     );
//   }
// }

// ReactDOM.render(
//   <App title="12333333"/>,
//   document.getElementById('app')
// );
