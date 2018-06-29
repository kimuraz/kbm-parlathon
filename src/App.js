import React, { Component } from 'react';
import { SectionsContainer, Section } from 'react-fullpage';

import Search from './components/Search';

class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedPL: null,
    }

    this.selectPL = this.selectPL.bind(this);
  }

  selectPL(pl) {
    console.log(pl);
  }

  render() {
    const { selectedPL } = this.state;
    const options = {};

    return (
      <div className="App">
        <SectionsContainer {...options}>
          <Section>
            <Search selectPL={this.selectPL}/>
          </Section>

          { selectedPL && selectedPL.stages.map(s => <Section/>) }
        </SectionsContainer>
      </div>
    );
  }
}

export default App;
