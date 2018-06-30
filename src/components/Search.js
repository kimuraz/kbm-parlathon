import React, { Component } from "react";
import {
  TextField,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import "./styles/search.css";

import Api from "../utils/Api";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      queryType: 0,
      pls: [],
      isLoading: false
    };

    this.selectPL = this.selectPL.bind(this);
  }

  search() {
    this.setState({ ...this.state, isLoading: true }, () => {
        Api.searchCamara(this.state.query).then(data => {
          this.setState({ ...this.state, pls: data.dados, isLoading: false });
        })
      }
    );
  }

  updateQuery(query) {
    this.setState({ ...this.state, query });
  }

  queryType(evt, queryType) {
    this.setState({ ...this.state, queryType });
  }

  selectPL(pl) {
    this.props.history.push(`/pl/${pl.id}?num=${pl.numero}&ano=${pl.ano}`);
  }

  render() {
    const { queryType, pls, isLoading } = this.state;
    return (
      <div className="search">
      
        <BottomNavigation
          value={queryType}
          onChange={(e, val) => this.queryType(e, val)}
          showLabels
          className="selector"
        >
          <BottomNavigationAction
            label="Todos"
            style={{ backgroundColor: queryType === 0 ? "#BBDEFB" : "#FFF" }}
          />
          <BottomNavigationAction
            label="Câmara dos Deputados"
            style={{ backgroundColor: queryType === 1 ? "#BBDEFB" : "#FFF" }}
          />
          <BottomNavigationAction
            label="Senado Federal"
            style={{ backgroundColor: queryType === 2 ? "#BBDEFB" : "#FFF" }}
          />
        </BottomNavigation>
        <div className="input">
          <TextField
            label="Pesquisa"
            onChange={e => this.updateQuery(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => this.search()}
          >
            Pesquisar
          </Button>
        </div>

        <div className="listContainer">
         { isLoading && <CircularProgress style={{marginTop: '30%'}}/> }
          <List>
            {pls && !isLoading &&
              pls.map(pl => (
                <ListItem key={pl.id} button onClick={() => this.selectPL(pl)}>

                  <ListItemText
                    primary={`${pl.siglaTipo} ${pl.numero}/${pl.ano}`}
                    secondary={pl.ementa}
                  />
                </ListItem>
              ))}
          </List>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
