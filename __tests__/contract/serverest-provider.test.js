/* eslint-disable no-underscore-dangle */
const axios = require('axios');
const { Matchers, Pact } = require('@pact-foundation/pact');

const port = 3001;
const rotaLocalhost = `http://localhost:${port}`;
const mockProvider = new Pact({
  port,
  consumer: 'Front',
  provider: 'ServeRest - API Rest',
});

describe('API Pact test - Integration between \'Front\' and \'ServeRest - API Rest\'', () => {
  beforeAll(() => mockProvider.setup());
  afterEach(() => mockProvider.verify());
  afterAll(() => mockProvider.finalize());

  describe('GET user by ID', () => {
    it('Should return with sucess search with existing user', async () => {
      const expectedUsuario = {
        nome: 'Fulano da Silva',
        email: 'fulano@qa.com',
        password: 'teste',
        administrador: 'true',
        _id: '0uxuPY0cbmQhpEz1',
      };

      await mockProvider.addInteraction({
        state: 'i have a user',
        uponReceiving: 'a request for a specific user',
        withRequest: {
          method: 'GET',
          path: `/usuarios/${expectedUsuario._id}`,
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
          body: Matchers.like(expectedUsuario),
        },
      });

      const response = await axios.get(`${rotaLocalhost}/usuarios/${expectedUsuario._id}`);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(response.data).toEqual(expectedUsuario);
      // eslint-disable-next-line no-magic-numbers
      expect(response.status).toEqual(200);
    });
  });
});
