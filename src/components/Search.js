import React, { Component } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { Search as SearchIcon } from "@material-ui/icons";
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
      });
    });
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
    const { pls, isLoading } = this.state;
    return (
      <div className="search">
        <div className="input">
          <TextField
            label="Pesquisa"
            className="textField"
            onChange={e => this.updateQuery(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => this.search()}
          >
            Pesquisar
            <SearchIcon style={{ marginLeft: "10px" }} />
          </Button>
        </div>

        <div className="listContainer">
          {isLoading && <CircularProgress style={{ marginTop: "30%" }} />}
          <List>
            {pls &&
              !isLoading &&
              pls.map(pl => (
                <ListItem
                  key={pl.id}
                  button
                  onClick={() => this.selectPL(pl)}
                  style={{
                    backgroundColor: "#FFF",
                    borderRadius: "2px",
                    marginTop: "5px"
                  }}
                >
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
