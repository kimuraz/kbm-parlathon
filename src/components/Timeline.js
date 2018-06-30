import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import { AccountBalance } from "@material-ui/icons";
import queryString from "query-string";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import Api from "../utils/Api";

class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pl: null,
      isLoading: false
    };
  }

  componentDidMount() {
    const selectedPlId = this.props.match.params.plId;
    const { ano, num } = queryString.parse(this.props.location.search);

    Api.getPropositionCamara(num, ano).then((dt) => {
      console.log(dt)
      this.setState({ ...this.state, pl: dt });
    });
  }

  render() {
    const { pl, isLoading } = this.state;
    return (
      <VerticalTimeline>
        {pl &&
          !isLoading && (
            pl.tramitacoes.map(t =>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              style={{minHeight: '20vh'}}
              date="2011 - present"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<AccountBalance/>}
              key={t.sequencia}
            >
              {JSON.stringify(t)}
            </VerticalTimelineElement>)
          )}
        {isLoading && (
          <CircularProgress
            style={{
              marginTop: "40%",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          />
        )}
      </VerticalTimeline>
    );
  }
}

export default Timeline;
