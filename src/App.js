import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Search from './components/Search';
import Timeline from './components/Timeline';

class App extends Component {

  render() {
    return (
      <div className="App">
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
