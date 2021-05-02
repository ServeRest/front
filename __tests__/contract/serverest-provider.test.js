/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const axios = require('axios');

describe('Contrato da rota de usuários', () => {
  const usuario = {
    nome: 'Fulano da Silva',
    email: 'fulano@qa.com',
    password: 'teste',
    administrador: 'true',
    _id: '0uxuPY0cbmQhpEz1',
  };

  const rotaLocalhost = `http://localhost:${port}`;

  afterEach(() => provider.verify());

  describe('GET Usuarios por ID', () => {
    beforeEach(async () => {
      const interaction = {
        uponReceiving: 'a request for a specific user',
        state: 'i have a user',
        withRequest: {
          method: 'GET',
          path: `/usuarios/${usuario._id}`,
          headers: {
            Accept: 'application/json, text/plain, */*',
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
          },
          body: {
            nome: usuario.nome,
            email: usuario.email,
            password: usuario.password,
            administrador: usuario.administrador,
            _id: usuario._id,
          },
        },
      };
      return provider.addInteraction(interaction);
    });

    it('When response finished, expect to return correct body, header and status', async () => {
      const response = await axios.get(`${rotaLocalhost}/usuarios/${usuario._id}`);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(response.data).toEqual(usuario);
      // eslint-disable-next-line no-magic-numbers
      expect(response.status).toEqual(200);
    });
  });
});
