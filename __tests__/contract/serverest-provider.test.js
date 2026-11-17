/**
 * @jest-environment node
 */
// Ambiente node: no jsdom o axios usa XHR com CORS, e cada chamada com Authorization geraria um
// preflight que o mock não conhece. O preflight tem uma interação própria no fim do arquivo.
const axios = require('axios');
const { Matchers, Pact } = require('@pact-foundation/pact');

const { like, eachLike, term } = Matchers;

const port = 3001;
const baseUrl = `http://localhost:${port}`;
const mockProvider = new Pact({
  port,
  consumer: 'Front',
  provider: 'ServeRest - API Rest',
});

const HTTP = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};

// Os nomes dos estados são o acordo com a verificação do lado da API (stateHandlers).
const ESTADO = {
  ADMIN_DA_SEMENTE: 'existe o usuário administrador da semente',
  SEM_USUARIO_NOVO: 'não existe usuário com o e-mail beltrano@qa.com.br',
  USUARIO_PARA_EXCLUIR: 'existe um usuário não administrador com o id usuarioPactFront',
  PRODUTO_EXISTENTE: 'existe um produto chamado Produto do Front com o id produtoPactFront',
  SEM_PRODUTOS_NOVOS: 'não existem os produtos Mouse do Front e Teclado do Front',
};

const admin = { email: 'fulano@qa.com', password: 'teste' };
const idDoUsuarioParaExcluir = 'usuarioPactFront';
const produtoExistente = { id: 'produtoPactFront', nome: 'Produto do Front' };

// O front guarda o authorization do login e o devolve como veio. A API só aceita "Bearer <jwt>",
// e na verificação o requestFilter troca o token por um válido.
const authorization = term({
  generate: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20ifQ.c2ln',
  matcher: '^Bearer [A-Za-z0-9._-]+$',
});
const tokenDoExemplo = authorization.data.generate;

// O axios 0.20 manda o JSON com este Content-Type; é o que o navegador repassa à API.
const jsonDoAxios = 'application/json;charset=utf-8';

// O front roda em outro domínio: sem este header na resposta o navegador descarta a resposta.
const headersDaResposta = {
  'Content-Type': term({ generate: 'application/json; charset=utf-8', matcher: '^application/json.*' }),
  'Access-Control-Allow-Origin': '*',
};

// eachLike compara só o tipo de cada campo, então os valores abaixo são apenas exemplos.
const usuarioDaLista = {
  nome: 'Fulano da Silva',
  email: 'fulano@qa.com',
  password: 'teste',
  // validateLogin compara com a string 'true' para decidir se vai para a área do admin.
  administrador: 'true',
  _id: '0uxuPY0cbmQhpEz1',
};

const produtoDaLista = {
  nome: 'Logitech MX Vertical',
  // A lista de compras multiplica preco pela quantidade escolhida: precisa ser número.
  preco: 470,
  descricao: 'Mouse',
  quantidade: 382,
  _id: 'BeeJh5lz3k6kSIzA',
};

describe('Pact entre o Front e a ServeRest - API Rest: as chamadas que o front faz', () => {
  beforeAll(() => mockProvider.setup());
  afterEach(() => mockProvider.verify());
  afterAll(() => mockProvider.finalize());

  describe('POST /login (services/login.js e services/validateUser.js)', () => {
    it('devolve o authorization que o front guarda e reenvia', async () => {
      await mockProvider.addInteraction({
        state: ESTADO.ADMIN_DA_SEMENTE,
        uponReceiving: 'um login com e-mail e senha válidos',
        withRequest: {
          method: 'POST',
          path: '/login',
          headers: { 'Content-Type': jsonDoAxios },
          body: admin,
        },
        willRespondWith: {
          status: HTTP.OK,
          headers: headersDaResposta,
          body: { authorization },
        },
      });

      const response = await axios.post(`${baseUrl}/login`, admin);
      expect(response.data.authorization).toBe(tokenDoExemplo);
    });

    it('devolve a mensagem que o front mostra quando a senha está errada', async () => {
      const credenciaisErradas = { email: admin.email, password: 'senha errada' };
      await mockProvider.addInteraction({
        state: ESTADO.ADMIN_DA_SEMENTE,
        uponReceiving: 'um login com a senha errada',
        withRequest: {
          method: 'POST',
          path: '/login',
          headers: { 'Content-Type': jsonDoAxios },
          body: credenciaisErradas,
        },
        willRespondWith: {
          status: HTTP.UNAUTHORIZED,
          headers: headersDaResposta,
          body: { message: like('Email e/ou senha inválidos') },
        },
      });

      const error = await axios.post(`${baseUrl}/login`, credenciaisErradas).catch((e) => e);
      expect(error.response.status).toBe(HTTP.UNAUTHORIZED);
      expect(typeof error.response.data.message).toBe('string');
    });
  });

  describe('GET /usuarios (services/users.js getAllUsers e services/validateUser.js validateLogin)', () => {
    it('lista os usuários com os campos que o login e a tabela do admin leem', async () => {
      await mockProvider.addInteraction({
        state: ESTADO.ADMIN_DA_SEMENTE,
        uponReceiving: 'um pedido da lista de usuários',
        withRequest: {
          method: 'GET',
          path: '/usuarios',
        },
        willRespondWith: {
          status: HTTP.OK,
          headers: headersDaResposta,
          body: { usuarios: eachLike(usuarioDaLista) },
        },
      });

      const response = await axios.get(`${baseUrl}/usuarios`, {
        headers: { 'Access-Control-Allow-Origin': '*', Accept: 'application/json' },
      });
      expect(response.data.usuarios[0].administrador).toBe('true');
    });
  });

  describe('POST /usuarios (services/users.js registerUser)', () => {
    const novoUsuario = {
      nome: 'Beltrano da Silva',
      email: 'beltrano@qa.com.br',
      password: 'teste',
      administrador: 'false',
    };

    it('cadastra o usuário e devolve a mensagem de sucesso que a tela mostra', async () => {
      await mockProvider.addInteraction({
        state: ESTADO.SEM_USUARIO_NOVO,
        uponReceiving: 'um cadastro de usuário com todos os campos',
        withRequest: {
          method: 'POST',
          path: '/usuarios',
          headers: { 'Content-Type': jsonDoAxios },
          body: novoUsuario,
        },
        willRespondWith: {
          status: HTTP.CREATED,
          headers: headersDaResposta,
          body: { message: like('Cadastro realizado com sucesso') },
        },
      });

      const response = await axios.post(`${baseUrl}/usuarios`, novoUsuario);
      expect(response.status).toBe(HTTP.CREATED);
    });

    it('recusa e-mail repetido com a mensagem que a tela mostra', async () => {
      const emailRepetido = { ...novoUsuario, email: admin.email };
      await mockProvider.addInteraction({
        state: ESTADO.ADMIN_DA_SEMENTE,
        uponReceiving: 'um cadastro de usuário com e-mail já usado',
        withRequest: {
          method: 'POST',
          path: '/usuarios',
          headers: { 'Content-Type': jsonDoAxios },
          body: emailRepetido,
        },
        willRespondWith: {
          status: HTTP.BAD_REQUEST,
          headers: headersDaResposta,
          body: { message: like('Este email já está sendo usado') },
        },
      });

      const error = await axios.post(`${baseUrl}/usuarios`, emailRepetido).catch((e) => e);
      expect(error.response.status).toBe(HTTP.BAD_REQUEST);
    });

    it('aponta cada campo vazio pelo nome, que é como a tela monta os alertas', async () => {
      // Campo não preenchido fica undefined no formulário e o JSON do axios o omite.
      const soAdministrador = { administrador: 'false' };
      await mockProvider.addInteraction({
        uponReceiving: 'um cadastro de usuário sem nome, e-mail e senha',
        withRequest: {
          method: 'POST',
          path: '/usuarios',
          headers: { 'Content-Type': jsonDoAxios },
          body: soAdministrador,
        },
        willRespondWith: {
          status: HTTP.BAD_REQUEST,
          headers: headersDaResposta,
          body: {
            nome: like('nome é obrigatório'),
            email: like('email é obrigatório'),
            password: like('password é obrigatório'),
          },
        },
      });

      const error = await axios.post(`${baseUrl}/usuarios`, soAdministrador).catch((e) => e);
      expect(error.response.status).toBe(HTTP.BAD_REQUEST);
    });
  });

  describe('DELETE /usuarios/{id} (services/users.js deleteUser)', () => {
    it('exclui o usuário escolhido na tabela do admin', async () => {
      await mockProvider.addInteraction({
        state: ESTADO.USUARIO_PARA_EXCLUIR,
        uponReceiving: 'uma exclusão de usuário pelo id',
        withRequest: {
          method: 'DELETE',
          path: `/usuarios/${idDoUsuarioParaExcluir}`,
        },
        willRespondWith: {
          status: HTTP.OK,
          headers: headersDaResposta,
        },
      });

      const response = await axios.delete(`${baseUrl}/usuarios/${idDoUsuarioParaExcluir}`);
      expect(response.status).toBe(HTTP.OK);
    });
  });

  describe('GET /produtos (services/products.js getAllProducts)', () => {
    it('lista os produtos com os campos que a loja e a tabela do admin leem', async () => {
      await mockProvider.addInteraction({
        state: ESTADO.PRODUTO_EXISTENTE,
        uponReceiving: 'um pedido da lista de produtos com o token do login',
        withRequest: {
          method: 'GET',
          path: '/produtos',
          headers: { Authorization: authorization },
        },
        willRespondWith: {
          status: HTTP.OK,
          headers: headersDaResposta,
          body: { produtos: eachLike(produtoDaLista) },
        },
      });

      const response = await axios.get(`${baseUrl}/produtos`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          Authorization: tokenDoExemplo,
        },
      });
      expect(typeof response.data.produtos[0].preco).toBe('number');
    });
  });

  describe('GET /produtos?nome= (services/products.js getProductsFromCategoryAndQuery)', () => {
    it('devolve os produtos que batem com a busca da loja', async () => {
      await mockProvider.addInteraction({
        state: ESTADO.PRODUTO_EXISTENTE,
        uponReceiving: 'uma busca de produtos pelo nome, sem token',
        withRequest: {
          method: 'GET',
          path: '/produtos',
          query: { nome: 'Front' },
        },
        willRespondWith: {
          status: HTTP.OK,
          headers: headersDaResposta,
          body: { produtos: eachLike(produtoDaLista) },
        },
      });

      // O front usa fetch sem headers aqui; o axios sem config manda a mesma requisição.
      const response = await axios.get(`${baseUrl}/produtos?nome=Front`);
      expect(Array.isArray(response.data.produtos)).toBe(true);
    });
  });

  describe('POST /produtos (services/products.js registerProductWithImage, depois do PR #42)', () => {
    // A tela sempre chama registerProductWithImage: a condição olha this.state.imagem, que nunca
    // é preenchido. Sem arquivo escolhido, imagem fica undefined e sai do JSON; com arquivo, vai o
    // texto do input. preco e quantidade vão como número desde o PR #42.
    const headersDoCadastro = {
      'Content-Type': jsonDoAxios,
      Authorization: authorization,
    };
    const configDoCadastro = {
      headers: { Accept: 'application/json', Authorization: tokenDoExemplo },
    };
    const produtoSemImagem = {
      nome: 'Mouse do Front',
      preco: 100,
      descricao: 'Mouse',
      quantidade: 5,
    };
    const produtoComImagem = {
      nome: 'Teclado do Front',
      preco: 250,
      descricao: 'Teclado',
      quantidade: 10,
      imagem: 'C:\\fakepath\\teclado.png',
    };

    it('cadastra o produto sem imagem, com preco e quantidade numéricos', async () => {
      await mockProvider.addInteraction({
        state: ESTADO.SEM_PRODUTOS_NOVOS,
        uponReceiving: 'um cadastro de produto sem imagem com o token do admin',
        withRequest: {
          method: 'POST',
          path: '/produtos',
          headers: headersDoCadastro,
          body: produtoSemImagem,
        },
        willRespondWith: {
          status: HTTP.CREATED,
          headers: headersDaResposta,
        },
      });

      const response = await axios.post(`${baseUrl}/produtos`, produtoSemImagem, configDoCadastro);
      expect(response.status).toBe(HTTP.CREATED);
    });

    it('cadastra o produto com o texto do campo de imagem', async () => {
      await mockProvider.addInteraction({
        state: ESTADO.SEM_PRODUTOS_NOVOS,
        uponReceiving: 'um cadastro de produto com imagem com o token do admin',
        withRequest: {
          method: 'POST',
          path: '/produtos',
          headers: headersDoCadastro,
          body: produtoComImagem,
        },
        willRespondWith: {
          status: HTTP.CREATED,
          headers: headersDaResposta,
        },
      });

      const response = await axios.post(`${baseUrl}/produtos`, produtoComImagem, configDoCadastro);
      expect(response.status).toBe(HTTP.CREATED);
    });

    it('recusa nome repetido com a mensagem que a tela mostra', async () => {
      const nomeRepetido = { ...produtoSemImagem, nome: produtoExistente.nome };
      await mockProvider.addInteraction({
        state: ESTADO.PRODUTO_EXISTENTE,
        uponReceiving: 'um cadastro de produto com nome já usado',
        withRequest: {
          method: 'POST',
          path: '/produtos',
          headers: headersDoCadastro,
          body: nomeRepetido,
        },
        willRespondWith: {
          status: HTTP.BAD_REQUEST,
          headers: headersDaResposta,
          body: { message: like('Já existe produto com esse nome') },
        },
      });

      const error = await axios
        .post(`${baseUrl}/produtos`, nomeRepetido, configDoCadastro)
        .catch((e) => e);
      expect(error.response.status).toBe(HTTP.BAD_REQUEST);
    });
  });

  describe('DELETE /produtos/{id} (services/products.js deleteProductById)', () => {
    it('exclui o produto escolhido na tabela do admin', async () => {
      await mockProvider.addInteraction({
        state: ESTADO.PRODUTO_EXISTENTE,
        uponReceiving: 'uma exclusão de produto pelo id com o token do admin',
        withRequest: {
          method: 'DELETE',
          path: `/produtos/${produtoExistente.id}`,
          headers: { Authorization: authorization },
        },
        willRespondWith: {
          status: HTTP.OK,
          headers: headersDaResposta,
        },
      });

      const response = await axios.delete(`${baseUrl}/produtos/${produtoExistente.id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          Authorization: tokenDoExemplo,
        },
      });
      expect(response.status).toBe(HTTP.OK);
    });
  });

  describe('Preflight de CORS que o navegador faz antes das chamadas com token', () => {
    it('libera o front a mandar Authorization e JSON de outro domínio', async () => {
      const headersDoPreflight = {
        Origin: 'https://front.serverest.dev',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'authorization,content-type',
      };
      await mockProvider.addInteraction({
        uponReceiving: 'um preflight de CORS para cadastrar produto',
        withRequest: {
          method: 'OPTIONS',
          path: '/produtos',
          headers: headersDoPreflight,
        },
        willRespondWith: {
          status: HTTP.NO_CONTENT,
          headers: {
            'Access-Control-Allow-Origin': '*',
            // O verificador compara item a item da lista separada por vírgula, então vão os valores
            // exatos: o padrão do pacote cors e os headers do pedido, que ele devolve como vieram.
            'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
            'Access-Control-Allow-Headers': 'authorization,content-type',
          },
        },
      });

      const response = await axios({
        method: 'OPTIONS',
        url: `${baseUrl}/produtos`,
        headers: headersDoPreflight,
      });
      expect(response.status).toBe(HTTP.NO_CONTENT);
    });
  });
});
