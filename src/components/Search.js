import React, { Component } from "react";
import {
  TextField,
  Button,
  BottomNavigation,
  BottomNavigationAction
} from "@material-ui/core";
import './search.css';

import Api from '../utils/Api';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      queryType: 0,
      pls: [],
    };
  }

  search() {
    Api.searchCamara(this.state.query).then((data) => {
        this.setState({ ...this.state, pls: data.dados });
    });
  }

  updateQuery(query) {
    this.setState({ ...this.state, query });
  }

  queryType(evt, queryType) {
    this.setState({ ...this.state, queryType })
  }

  render() {
    const { queryType, pls } = this.state
    return (
      <div className="search">
        <div className="input">
            <TextField
            label="Pesquisa"
            onChange={e => this.updateQuery(e.target.value)}
            />
            <Button variant="contained" color="primary" size="small" onClick={() => this.search()}>
                Pesquisar
            </Button>
        </div>

        <BottomNavigation
          value={queryType}
          onChange={(e, val) => this.queryType(e, val)}
          showLabels
          className="selector"
        >
          <BottomNavigationAction label="Todos" style={{backgroundColor: queryType === 0 ? '#BBDEFB' : '#FFF'}} />
          <BottomNavigationAction label="Câmara dos Deputados" style={{backgroundColor: queryType === 1 ? '#BBDEFB' : '#FFF'}}/>
          <BottomNavigationAction label="Senado Federal" style={{backgroundColor: queryType === 2 ? '#BBDEFB' : '#FFF'}}/>
        </BottomNavigation>

        <div className="listContainer">
            {pls && pls.map(pl => <p key={pl.id}>{pl.siglaTipo} {pl.numero}/{pl.ano} - {pl.ementa}</p>)}
        </div>
      </div>
    );
  }
}

export default Search;
