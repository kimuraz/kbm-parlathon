import React from "react";
import { Typography } from '@material-ui/core';

export default class Proposition {
  /*
  * Colocar aqui as principais informações que precisarmos da proposição.
  * O intuito dessa class é mostrar, de forma padronizada,
  * as proposições vindas das duas diferentes APIs.
  */
  constructor(
    numeroCasaIniciadora,
    anoCasaIniciadora,
    numeroCasaRevisadora,
    anoCasaRevisadora,
    autores,
    ementa,
    explicacaoEmenta,
    formaTramitacao,
    regimeTramitacao,
    dataHoraTramitacao,
    orgaoTramitacao,
    acaoTramitacao,
    situacaoAtual,
    tempoCorridoDias,
    tramitacoes,
    urlInteiroTeor
  ) {
    this.numeroCasaIniciadora = numeroCasaIniciadora;
    this.anoCasaIniciadora = anoCasaIniciadora;
    this.numeroCasaRevisadora = numeroCasaRevisadora;
    this.anoCasaRevisadora = anoCasaRevisadora;
    this.autores = autores;
    this.ementa = ementa;
    this.explicacaoEmenta = explicacaoEmenta;
    this.formaTramitacao = formaTramitacao;
    this.regimeTramitacao = regimeTramitacao;
    this.dataHoraTramitacao = dataHoraTramitacao;
    this.orgaoTramitacao = orgaoTramitacao;
    this.acaoTramitacao = acaoTramitacao;
    /*
     * TODO: Verificar se existem mais dados de tramitação
     */
    this.situacaoAtual = situacaoAtual;
    this.tempoCorridoDias = tempoCorridoDias;
    this.tramitacoes = tramitacoes;
    this.url = urlInteiroTeor;
  }

  toStatusString() {
    return (
      <Typography>
        Esse Projeto de Lei foi criado em{" "}
        <strong style={{ fontSize: "14px", color: "#81D4FA" }}>
          {this.anoCasaIniciadora}
        </strong>! E ela passou por{" "}
        <strong style={{ fontSize: "14px", color: "#81D4FA" }}>
          {this.tramitacoes.length} andamentos
        </strong>, hoje seu status é:{" "}
        <strong style={{ fontSize: "14px", color: "#80D4FA" }}>
          {this.tramitacoes[this.tramitacoes.length - 1].descricaoTramitacao}.
        </strong>{" "}
        <br />{" "}
        <strong style={{ fontSize: "14px", color: "#81D4FA" }}>
          Sua ementa diz:
        </strong>{" "}
        {this.ementa} <br />O projeto foi{" "}
        <strong style={{ fontSize: "14px", color: "#81D4FA" }}>
          idealizado por
        </strong>: {this.autores.join(", ")}
        <br/>
        <strong style={{ fontSize: "14px", color: "#81D4FA" }}>
          Duração: {this.tempoCorridoDias} dias
        </strong>
      </Typography>
    );
  }
}
