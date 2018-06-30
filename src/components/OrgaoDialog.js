import React, { Component } from "react";
import {
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class OrgaoDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgao: null
    };
  }

  componentDidMount() {
    fetch(this.props.orgaoLink)
      .then(res => res.json())
      .then(data => {
        this.setState({ ...this.state, orgao: data.dados });
      });
  }

  render() {
    const { closeDialog } = this.props;
    const { orgao } = this.state;
    return (
      <Dialog fullScreen open={true}>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit">
              {orgao && orgao.apelido}
            </Typography>

            <IconButton
              color="inherit"
              aria-label="Close"
              style={{ marginLeft: "auto" }}
              onClick={() => closeDialog()}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Card
          style={{
            marginTop: "20%",
            marginLeft: "auto",
            marginRight: "auto",
            width: "90%",
            padding: "10px"
          }}
        >
          <Typography variant="subheading">
            {orgao && orgao.nome}
            <br />
            <br />
            Sigla: {orgao && orgao.sigla}
            <br />
            <br />
            Tipo: {orgao && orgao.tipoOrgao}
          </Typography>
        </Card>
      </Dialog>
    );
  }
}

export default OrgaoDialog;
