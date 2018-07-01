import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography
} from "@material-ui/core";
import moment from "moment";
import { AccountBalance, InsertDriveFile } from "@material-ui/icons";

import OrgaoDialog from "./OrgaoDialog";

class TramitacaoCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOrgaoOpen: false
    };

    this.closeOrgao = this.closeOrgao.bind(this);
  }

  openOrgao() {
    this.setState({ ...this.state, isOrgaoOpen: true });
  }

  closeOrgao() {
    this.setState({ ...this.state, isOrgaoOpen: false });
  }

  render() {
    const { tramitacao } = this.props;
    const { isOrgaoOpen } = this.state;

    return (
      <div>
        <Card style={{ border: "none", boxShadow: "none" }}>
          <CardContent>
            <Typography color="textSecondary">
              {moment(tramitacao.dataHora).format("LLL")}
            </Typography>
            <Typography variant="headline" component="h2">
              {tramitacao.descricaoTramitacao}
            </Typography>
            <Typography component="p">{tramitacao.despacho}</Typography>
          </CardContent>
          <CardActions>
            <Button
              color="secondary"
              style={{ width: "100%" }}
              onClick={() => this.openOrgao()}
            >
              <AccountBalance style={{ marginRight: "10px" }} />
              Órgao: {tramitacao.siglaOrgao}
            </Button>
          </CardActions>

          {tramitacao.url && (
            <CardActions>
              <a
                href={tramitacao.url}
                target="_blank"
                download={`PL${tramitacao.numero}/${tramitacao.ano}`}
                style={{ width: "100%" }}
              >
                <Button style={{ width: "100%" }} color="primary">
                  <InsertDriveFile style={{ marginRight: "10px" }} />
                  Ver esse documento
                </Button>
              </a>
            </CardActions>
          )}
        </Card>
        {isOrgaoOpen && (
          <OrgaoDialog
            orgaoLink={tramitacao.uriOrgao}
            closeDialog={this.closeOrgao}
          />
        )}
      </div>
    );
  }
}

export default TramitacaoCard;
