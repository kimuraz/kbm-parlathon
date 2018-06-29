const camaraURL = 'https://dadosabertos.camara.leg.br/api/v2/proposicoes?formato=json&siglaTipo=PL';
const senadoURL = '';

export default {
    searchCamara: (query) => {
        return fetch(`${camaraURL}&keywords=${query}`).then(res => res.json());
    },
}