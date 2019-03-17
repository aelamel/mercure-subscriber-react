import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import Layout from './components/layout/Layout';

import './App.css';
import { ConnectedRouter } from 'connected-react-router';

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <React.Fragment>
          <Switch>
              <Route path="/"  name="Home" component={Layout} />
              <Route path="**" name="Home" component={Layout} />
          </Switch>
        </React.Fragment>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired
}

export default App;
