import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import './index.css';

import Search from './components/Search';
import Timeline from './components/Timeline';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Typography color="primary" style={{ marginTop: "10px", textAlign: "center"}} variant="headline">
          Trilha Legislativa!
        </Typography>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Search} />
            <Route path='/pl/:plId' component={Timeline}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
