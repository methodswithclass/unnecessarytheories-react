import React, { Component } from 'react';
import './App.css';
import '../assets/css/classes.css';

import {UIRouter, UIView} from '@uirouter/react';

import ErrorBoundary from "./components/error/ErrorBoundary";
import Footer from "./components/footer/Footer";

import * as state from "./services/state.service";
import * as u from "./services/utility.service";

class App extends Component {


  componentWillMount() {



    // u.forceMobile();
    console.log("check mobile app", u.checkMobile());
  }

  render() {
    return (
        <div className="absolute width height">
			<ErrorBoundary>
			<UIRouter plugins={state.plugins} states={state.states} config={state.configRouter}>

				<div className="absolute width height cutoff">


					<UIView/>

				</div>
			</UIRouter>
			</ErrorBoundary>
        </div>

    );
  }
}

export default App;


