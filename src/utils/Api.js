import Proposition from '../models/Proposition'

const camaraURL = 'https://dadosabertos.camara.leg.br/api/v2/proposicoes?formato=json&siglaTipo=PL';
const senadoURL = 'http://legis.senado.leg.br/dadosabertos/materia/pls/.json';

function getDataFromPL(plDados, autores, orgaoTramitacao, tempoCorridoDias, tramitacoes, casaIniciadora) {
    plDados = plDados['dados']

    let prefixocasaIniciadora = casaIniciadora.pre
    let numeroCasaIniciadora = casaIniciadora.numero
    let anoCasaIniciadora = casaIniciadora.ano

    let numeroCasaRevisadora = undefined
    let anoCasaRevisadora = undefined
    let prefixoCasaRevisora = undefined
    if (plDados.uriPropPosterior) {
      let urlCasaRevisadora = plDados.uriPropPosterior
      urlCasaRevisadora = urlCasaRevisadora.split('/')
      const numero = urlCasaRevisadora[urlCasaRevisadora.length - 2]
      const ano = urlCasaRevisadora[urlCasaRevisadora.length - 1]

      numeroCasaRevisadora = numero
      anoCasaRevisadora = ano
      prefixoCasaRevisora = 'PLS'
    } else if (prefixocasaIniciadora === 'PLS') {
      numeroCasaRevisadora = String(plDados.numero)
      anoCasaRevisadora = String(plDados.ano)
      prefixoCasaRevisora = 'PLC'
    }

    let ementa = plDados.ementa
    let explicacaoEmenta = undefined
    if (plDados.ementaDetalhada) {
      explicacaoEmenta = plDados.ementaDetalhada
    }
    let formaTramitacao = undefined
    /*
    * TODO: tramitação conclusiva (não vai a Plenário). Não sei identificar esse dado
    */
    let regimeTramitacao = plDados.statusProposicao.regime
    let dataHoraTramitacao = plDados.statusProposicao.dataHora
    let acaoTramitacao = undefined
    /*
    * TODO: NÃO ENTENDI O QUE É
    */
    let situacaoAtual = plDados.statusProposicao.descricaoSituacao
    return new Proposition(prefixocasaIniciadora, numeroCasaIniciadora, anoCasaIniciadora, prefixoCasaRevisora, numeroCasaRevisadora, anoCasaRevisadora, autores,
      ementa, explicacaoEmenta, formaTramitacao, regimeTramitacao, dataHoraTramitacao, orgaoTramitacao,
      acaoTramitacao, situacaoAtual, tempoCorridoDias, tramitacoes);
}

function getAuthorsFromPL(autoresAPI) {
  let autores = []
  autoresAPI = autoresAPI['dados']
  for (let i = 0; i < autoresAPI.length; i++) {
    autores.push(`${autoresAPI[i].tipo}(a) ${autoresAPI[i].nome}`)
  }
  return autores
}

function getTimeSinceBegin(tramitacoes) {
  let first = new Date(tramitacoes.dados[0].dataHora)
  let last = new Date(tramitacoes.dados[tramitacoes.dados.length - 1].dataHora)
  let difference = undefined
  first > last ? difference = first - last: difference = last - first;

  // milliseconds to days rounded down
  return Math.floor(difference/86400000)
}

function getProcessingFromPL(orgaoTramitacao) {
  orgaoTramitacao = orgaoTramitacao['dados']
  return orgaoTramitacao.nome
}

function getCasaIniciadora(tramitacoes, numeroCamara, anoCamara) {
  let tramitacaoData = {}
  console.log(tramitacoes.dados[0].idTipoTramitacao)
  if (tramitacoes.dados[0].idTipoTramitacao === "500") {
    tramitacaoData['pre'] = 'PLS'
    let despachoTexto = tramitacoes.dados[0].despacho
    despachoTexto = despachoTexto.replace(/\s+/g,' ').split('Projeto de Lei do Senado nº ')[1].split(',')
    tramitacaoData['numero'] = despachoTexto[0]
    let despachoAno = despachoTexto[1].split(' ')
    tramitacaoData['ano'] = despachoAno[despachoAno.length - 1]
  } else {
    tramitacaoData['pre'] = 'PLC'
    tramitacaoData['numero'] = String(numeroCamara)
    tramitacaoData['ano'] = String(anoCamara)

  }

  return tramitacaoData
}

export default {
    searchCamara: (query) => {
        return fetch(`${camaraURL}&keywords=${query}`).then(res => res.json());
    },

    getPropositionCamara: (num, ano) => {
        console.log(num, ano);
        let law = [num, ano]

        let autoresAPI = undefined
        let plDados = undefined
        let orgaoTramitacao = undefined
        let tramitacoes = undefined
        return fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?formato=json&numero=${law[0]}&ano=${law[1]}`)
        .then(res => res.json())
        .then(json => fetch(`${json.dados[0].uri}?formato=json`))
        .then(res => res.json())
        .then(json => plDados = json)
        .then(json => fetch(`${json['dados'].uriAutores}?formato=json`))
        .then(res => res.json())
        .then(json => autoresAPI = json)
        .then(() => fetch(`${plDados['dados'].statusProposicao.uriOrgao}?formato=json`))
        .then(res => res.json())
        .then(json => orgaoTramitacao = json)
        .then(() => fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes/${plDados['dados'].id}/tramitacoes?formato=json`))
        .then(res => res.json())
        .then(json => tramitacoes = json)
        .then(() => {
            let autores = getAuthorsFromPL(autoresAPI)
            let orgao = getProcessingFromPL(orgaoTramitacao)
            let tempoCorridoDias = getTimeSinceBegin(tramitacoes)
            let numeroCamara = plDados.dados.numero
            let anoCamara = plDados.dados.ano
            let casaIniciadora = getCasaIniciadora(tramitacoes, numeroCamara, anoCamara)
            let proposition = getDataFromPL(plDados, autores, orgao, tempoCorridoDias, tramitacoes.dados, casaIniciadora)
            return proposition;
        })
    }
}

