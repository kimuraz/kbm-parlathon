import React, { Component } from "react";
import {
  CircularProgress,
  Typography,
  IconButton,
  Card,
  CardContent,
  Button
} from "@material-ui/core";
import {
  AccountBalance,
  ArrowBack,
  NewReleases,
  ArrowUpward,
  Done,
  MoveToInbox,
  Send,
  AddBox,
  Undo
} from "@material-ui/icons";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import { Link } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import "react-vertical-timeline-component/style.min.css";
import "./styles/timeline.css";

import Api from "../utils/Api";

import TramitacaoCard from "./TramitacaoCard";

class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pl: null,
      isLoading: true,
      parsed: null,
      showTimeline: false
    };
  }

  _getClassName(t, idx) {
    let style = {};

    if (idx === 0) {
      return Object.assign(style, {
        backgroundColor: "#66BB6A",
        color: "#FFF"
      });
    }

    switch (parseInt(t.idTipoTramitacao, 10)) {
      case 240:
      case 244:
      case 241:
      case 239:
      case 238:
      case 237:
      case 241:
      case 196:
      case 195:
      case 191:
      case 336:
      case 338:
      case 1261:
      case 1235:
        style = Object.assign(style, {
          backgroundColor: "#66BB6A",
          color: "#FFF"
        });
        break;
      case 502:
      case 134:
      case 1034:
      case 1035:
      case 1024:
      case 630:
      case 131:
        style = Object.assign(style, {
          backgroundColor: "#C62828",
          color: "#FFF"
        });
        break;

      case 500:
        style = Object.assign(style, {
          backgroundColor: "#FFCA28",
          color: "#FFF"
        });
        break;

      case 400:
      case 226:
      case 401:
        style = Object.assign(style, {
          backgroundColor: "#29B6F6",
          color: "#FFF"
        });
        break;

      case 140:
      case 135:
      case 640:
      case 650:
      case 503:
        style = Object.assign(style, {
          backgroundColor: "#26A69A",
          color: "#FFF"
        });
        break;

      default:
        style = Object.assign(style, {
          backgroundColor: "#FF7961",
          color: "#FFF"
        });
    }

    return style;
  }

  _getIcon(t, idx) {
    if (idx === 0) {
      return <NewReleases />;
    } else {
      switch (parseInt(t.idTipoTramitacao, 10)) {
        case 240:
        case 244:
        case 241:
        case 239:
        case 238:
        case 237:
        case 241:
        case 196:
        case 195:
        case 191:
        case 336:
        case 338:
        case 1261:
        case 1235:
          return <Done />;
        case 502:
        case 134:
        case 1034:
        case 1035:
        case 1024:
        case 630:
        case 131:
          return <MoveToInbox />;

        case 500:
          return <Send />;

        case 400:
        case 226:
        case 401:
          return <AddBox />;

        case 140:
        case 135:
        case 640:
        case 650:
        case 503:
          return <Undo />;
        default:
          return <AccountBalance />;
      }
    }
  }

  _openTimeline() {
    this.setState({ ...this.state, showTimeline: true }, () => {
      window.scrollTo(0, 100);
    });
  }

  componentDidMount() {
    const selectedPlId = this.props.match.params.plId;
    const search = this.props.location.search.substring(1);
    const { ano, num } = JSON.parse(
      '{"' +
        decodeURI(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );

    Api.getPropositionCamara(num, ano).then(dt => {
      this.setState({ ...this.state, pl: dt, isLoading: false });
    });
  }

  render() {
    const { pl, isLoading, showTimeline } = this.state;
    return (
      <div style={{ maxWidth: "100vw" }}>
        <header
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center"
          }}
        >
          <Link to="/">
            <IconButton
              color="primary"
              variant="contained"
              aria-label="Back"
              style={{ marginTop: "-10px" }}
            >
              <ArrowBack />
            </IconButton>
          </Link>
          <Typography
            variant="headline"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            {pl && "PL" + pl.numeroCasaIniciadora + "/" + pl.anoCasaIniciadora}
          </Typography>
        </header>
        {isLoading && (
          <CircularProgress
            style={{
              margin: "auto",
              float: "none"
            }}
          />
        )}
        {!isLoading &&
          !showTimeline && (
            <Card
              style={{ display: "block", width: "100%", marginTop: "20px" }}
            >
              <CardContent>
                <Typography color="textSecondary">
                  Resumo do Plano de Lei
                </Typography>
                {pl.toStatusString()}
                <Button
                  style={{ width: "100%" }}
                  color="primary"
                  onClick={() => this._openTimeline()}
                >
                  <br />
                  <br />
                  Clique e veja a linha do tempo!
                </Button>

                <br />
                <Typography color="textSecondary">
                  Compartilhe o <a href={pl.url}>documento</a> na íntegra!
                </Typography>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <FacebookShareButton
                    url={pl.url}
                    quote={
                      "Veja o Projeto de Lei" +
                      pl.numeroCasaIniciadora +
                      "/" +
                      pl.anoCasaIniciadora
                    }
                  >
                    <FacebookIcon round />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={pl.url}
                    title={
                      "Veja o Projeto de Lei" +
                      pl.numeroCasaIniciadora +
                      "/" +
                      pl.anoCasaIniciadora
                    }
                  >
                    <WhatsappIcon round />
                  </WhatsappShareButton>
                  <TwitterShareButton
                    url={pl.url}
                    title={
                      "Veja o Projeto de Lei " +
                      pl.numeroCasaIniciadora +
                      "/" +
                      pl.anoCasaIniciadora
                    }
                  >
                    <TwitterIcon round />
                  </TwitterShareButton>
                </div>
              </CardContent>
            </Card>
          )}
        {showTimeline && (
          <VerticalTimeline>
            {pl &&
              !isLoading &&
              pl.tramitacoes.map((t, idx) => (
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  style={{ minHeight: "10vh" }}
                  iconStyle={this._getClassName(t, idx)}
                  icon={this._getIcon(t, idx)}
                  key={idx}
                >
                  <TramitacaoCard tramitacao={t} />
                </VerticalTimelineElement>
              ))}
          </VerticalTimeline>
        )}
        {showTimeline && (
          <Button
            variant="fab"
            color="primary"
            aria-label="add"
            style={{ position: "fixed", bottom: "10px", right: "10px" }}
            onClick={() => window.scrollTo(0, 0)}
          >
            <ArrowUpward />
          </Button>
        )}
      </div>
    );
  }
}

export default Timeline;
