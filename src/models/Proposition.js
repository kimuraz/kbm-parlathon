export default class Proposition {
  /*
  * Colocar aqui as principais informações que precisarmos da proposição.
  * O intuito dessa class é mostrar, de forma padronizada,
  * as proposições vindas das duas diferentes APIs.
  */
  constructor(prefixoCasaIniciadora, numeroCasaIniciadora, anoCasaIniciadora, prefixoCasaRevisora, numeroCasaRevisadora, anoCasaRevisadora, autores,
              ementa, explicacaoEmenta, formaTramitacao, regimeTramitacao, dataHoraTramitacao, orgaoTramitacao,
              acaoTramitacao, situacaoAtual, tempoCorridoDias, tramitacoes) {
    this.prefixoCasaIniciadora = prefixoCasaIniciadora
    this.numeroCasaIniciadora = numeroCasaIniciadora
    this.anoCasaIniciadora = anoCasaIniciadora
    this.prefixoCasaRevisora = prefixoCasaRevisora
    this.numeroCasaRevisadora = numeroCasaRevisadora
    this.anoCasaRevisadora = anoCasaRevisadora
    this.autores = autores
    this.ementa = ementa
    this.explicacaoEmenta = explicacaoEmenta
    this.formaTramitacao = formaTramitacao
    this.regimeTramitacao = regimeTramitacao
    this.dataHoraTramitacao = dataHoraTramitacao
    this.orgaoTramitacao = orgaoTramitacao
    this.acaoTramitacao = acaoTramitacao
    /*
     * TODO: Verificar se existem mais dados de tramitação
     */
    this.situacaoAtual = situacaoAtual
    this.tempoCorridoDias = tempoCorridoDias
    this.tramitacoes = tramitacoes
  }
}