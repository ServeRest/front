# CLAUDE.md

Orientação para sessões do Claude neste repositório. Salvo indicação, os fatos foram lidos em 2026-11-16.
**[I]** marca o que foi inferido da leitura do código, sem medição.

## O que é e em que estado está

- Front React (Create React App) publicado em `front.serverest.dev` pela Netlify. Consome a API em
  `https://serverest.dev`, base fixa em `src/services/utils.js`.
- **Congelado** (decisão de 2026-11-16): um front novo sai em outro endereço. Este fica no ar, ganha
  só uma faixa no login apontando para o novo e é desligado no máximo 12 meses depois do lançamento
  do novo, antes se o uso medido todo mês cair.
- Por que mudar o mínimo: suítes Cypress e Playwright públicas (119 repositórios achados no GitHub),
  cursos e enunciados de processos seletivos usam este front como alvo de E2E com os seletores de
  hoje. Mudar markup pode quebrar o teste de alguém no meio de um processo seletivo.
- Mudança aceita sem discussão: fazer um fluxo existente voltar a funcionar sem mexer em seletor
  (ex.: PR #42). A faixa de migração, ajustes de build e de contrato vêm com plano aprovado pelo
  mantenedor. Fora disso, perguntar antes.
- Git: PR contra `main`, histórico linear, merge por rebase, conventional commits. Sem branch protection.

## Regras duras

1. Não mudar, remover nem renomear o que as suítes públicas usam (contagem de repositórios numa
   amostra de 45):
   - `data-testid` (43 renderizados; `grep -rnE 'data-testid|dataTestId' src` acha todos, inclusive
     os passados por prop a `LinkButton` e `ButtonLink`). Os mais usados: `email` 37,
     `entrar` 36, `nome` 34, `password` 34, `cadastrar` 32, `senha` 31, `checkbox` 28, `preco`,
     `descricao` e `quantity` 21, `cadastarProdutos` 18 (grafia errada, manter), `logout` 17,
     `adicionarNaLista` 12, `cadastrarProdutos` 11, `pesquisar` e `botaoPesquisar` 10.
   - Rotas: `/`, `/login`, `/cadastrarusuarios`, `/home`, `/detalhesProduto/:id`,
     `/minhaListaDeProdutos`, `/carrinho`, `/admin/home`, `/admin/cadastrarusuarios`,
     `/admin/cadastrarprodutos`, `/admin/listarusuarios`, `/admin/listarprodutos`, `/admin/relatorios`.
   - Textos: "Bem Vindo", "Excluir", "Serverest Store", "Logout", "Pesquisar", "Lista dos Produtos",
     "Editar", "Total: ", "Seu carrinho está vazio", "Lista dos usuários", "Nenhum produto foi
     encontrado". Mensagens da API aparecem como vieram (o front só capitaliza a primeira letra).
   - Ids e campos de formulário: `#email`, `#password`, `#nome`, `#price`, `#description`,
     `#quantity`, `#imagem`, `#administrador`. Chaves do `localStorage`, sobretudo
     `serverest/userToken` (usada para login por atalho).
   - Estrutura: `.alert`, `.alert-link`, `.card`, `.btn-danger`, `.imagem`, `.form`, `.login-page`,
     `table tbody tr`, a ordem dos filhos de `.form` (há seletor `.form > :nth-child(3)`).
2. Elemento novo (ex.: a faixa): sem classe `alert` nem `role="alert"`; sem `h1`, `img.imagem`,
   `.card` ou tabela; sem repetir "Entrar", "Cadastrar", "Login", "Cadastro", "Excluir", "Pesquisar",
   "Logout"; fora do `<form class="form">` e do `.login-page`; sem `position: fixed` sobre o
   conteúdo (o Cypress recusa clicar em elemento coberto).
3. Sem upgrade de dependência que mude o build (`react-scripts` 3.4.3, React 16, axios 0.20). Os PRs
   #38 e #39 (upgrades de 2023) ficam parados.
4. O build da Netlify roda em Node 12.18.0: nada que exija Node mais novo no build.
5. Mudou método, path, corpo ou header de chamada à API: atualizar o contrato Pact no mesmo PR.

## Rodar e testar localmente

| Tarefa | Comando e observação |
|---|---|
| Instalar | `npm ci` |
| Rodar | `npm start`, abre em `http://localhost:3000` |
| Build | `npm run build`. No Node 17 ou mais novo falha com `ERR_OSSL_EVP_UNSUPPORTED` (webpack 4): usar `NODE_OPTIONS=--openssl-legacy-provider npm run build`, ou `nvm use 12.18.0` para reproduzir a Netlify |
| Contrato | `npm run test:contract` (jest e Pact, escreve em `pacts/`, que o git ignora) |
| Lint | `npm run lint` já está vermelho no `main` (277 problemas, um erro de parse em `src`, lido antes do PR #42). Lintar só os arquivos alterados |

Não há `.nvmrc`, `.node-version` nem `netlify.toml`: a versão do Node existe só no painel da Netlify.
Não há testes unitários nem E2E próprios.

## Deploy (Netlify)

| Item | Valor |
|---|---|
| Site | `serverest`; `front.serverest.dev` é CNAME para `serverest.netlify.app` |
| Publicação | Integração Git da Netlify. Branch de produção `main`, publicação automática ligada. O job `deploy` do workflow só faz `echo` |
| Branches e PRs | Branch deploy em todos os branches; Deploy Preview em todo PR contra `main` |
| PR de fork | O build só roda depois de "Accept" no painel da Netlify (mantenedor) |
| Build | Base `/`, comando `npm run build`, publish `build/` |
| Node | 12.18.0, fixado em Dependency management no painel; imagem Ubuntu Noble 24.04 |
| Prova | Build do PR #42 em 2026-11-17: "Now using node v12.18.0", "Compiled with warnings", 51 s |
| Variáveis | Só `CI` e `NETLIFY_RESERVED__URL`. Com `CI=true` o CRA trata warning como erro **[I]**: não mexer sem testar num preview |
| SPA | `public/_redirects` (`/* /index.html 200`): sem ele, abrir uma rota direto dá 404 |
| Certificado | Let's Encrypt, renovado pela Netlify |

Conferir um deploy: o hash do bundle muda quando o código muda.

```sh
curl -s https://front.serverest.dev/ | grep -o 'static/js/main[^"]*'
curl -s https://front.serverest.dev/static/js/<arquivo> | grep -c '<trecho da mudança>'
```

Em 2026-11-16 o bundle era `main.de3222c7.chunk.js` e já trazia a conversão de `preco` do PR #42.
O HTML sai com `cache-control: max-age=0, must-revalidate`, então não há cache para limpar.

## Contrato com a API

| Chamada | Onde | Observação |
|---|---|---|
| `POST /login` | `services/login.js`, `services/validateUser.js` | Guarda o token em `serverest/userToken` |
| `GET /usuarios` | `validateUser.js`, `users.js` | No login baixa a lista inteira e procura o e-mail para saber se é admin; compara `administrador === 'true'` (texto) |
| `POST /usuarios` | `users.js` | `administrador` vai como texto |
| `DELETE /usuarios/{id}` | `users.js` | Sem token |
| `GET /produtos` | `products.js` | Com `Authorization` |
| `GET /produtos?nome=` | `products.js` | `fetch` sem token (busca da loja) |
| `POST /produtos` | `products.js` | `preco` e `quantidade` como número desde o PR #42; a imagem vai como o texto do input |
| `DELETE /produtos/{id}` | `products.js` | Com `Authorization` |

O front nunca chama `/carrinhos` (o carrinho fica no `localStorage`, chave `products`) nem `GET /usuarios/{id}`.

Pact (consumidor `Front`, provedor `ServeRest - API Rest`, workflow `Continuous Delivery` em todo push):

- No `main` há uma interação só, `GET /usuarios/{id}`, que o front não usa. Por isso a API 3.4.0
  quebrou o cadastro de produto sem o contrato acusar.
- O branch `test-contrato-chamadas-reais` (não mergeado) tem 14 interações: as 8 chamadas acima, os
  formatos de erro que as telas mostram e o preflight CORS. Passa 14 de 14.
- O secret `PACT_BROKER_TOKEN` do repositório é inválido: o passo de publicação falha com 401, todo
  push fica vermelho e nada chega ao broker. Resolve rotacionando o secret (mantenedor).
- `can-i-deploy --to production` não tem versão da API marcada `production` no broker, então o
  resultado é vazio ou nunca verde. Não bloqueia o deploy real, que é da Netlify.

## Defeitos conhecidos

Ficam como estão: o front está congelado e suítes podem depender do comportamento atual. A issue
#35 pergunta desde 2022 se alguns são de propósito, sem resposta. Corrigir só com aprovação.

- Lista de usuários mostra a coluna de senha; "Editar" de usuário e de produto não faz nada;
  "Excluir" recarrega sem confirmar **[I]**.
- Imagem marcada com `*` mas opcional (#35); a coluna "Imagem" mostra o texto cru **[I]**.
- `/detalhesProduto/:id` depende de `location.state`: aberto direto pela URL, quebra **[I]**.
- Lista de compras: "-" com quantidade 1 não remove o item (`deleteItem` filtra por `id`, não
  `_id`) **[I]**.
- Menu móvel não abre: o toggler usa `data-toggle` do Bootstrap 4 e nenhum JS do Bootstrap é
  carregado **[I]**.
- Depois de um erro no login, reenviar manda campos vazios **[I]**.
- Sem tratamento de erro de rede, 429 ou 5xx: `error.response` indefinido gera exceção **[I]**.
- `/carrinho` e `/admin/relatorios` mostram "Em construção aguarde".
- Acessibilidade: campos sem `<label>`, `lang="en"`, links sem `href` (Lighthouse 80).
- Pendente e opcional: o login baixa `GET /usuarios` inteiro (29 KB); trocar por
  `GET /usuarios?email=` reduz o tráfego da API sem mexer em seletor.

Corrigido: cadastro de produto quebrado pela API 3.4.0, PR #42 (mergeado em 2026-11-17).

Pendências do congelamento: rotacionar o token do Pact e mergear o branch do contrato; a faixa no
login quando o front novo for lançado; decidir os PRs abertos #38, #39 e #41.

## Manter este arquivo atualizado

Atualizar este arquivo **no mesmo PR** da mudança quando ela tocar em:

- build: `package.json` (scripts, dependências), `public/_redirects`, criação de `netlify.toml`,
  `.nvmrc` ou `.node-version`;
- versão do Node ou qualquer item do painel da Netlify (build, variáveis, domínio, branch, previews);
- `data-testid`, rota, texto, id, classe ou chave de `localStorage` das listas acima;
- chamada à API nova ou alterada (junto com o contrato);
- estado do Pact: merge do branch, rotação do token, número de interações, `can-i-deploy`;
- marcos da migração: endereço e data de lançamento do front novo, faixa no ar, data final
  anunciada, desligamento;
- defeito corrigido ou defeito novo encontrado.

Regras:

- Mudança feita fora do repositório (painel da Netlify, secret, broker) não gera PR sozinha: abrir
  um PR só com este arquivo.
- Todo fato novo leva a data em que foi lido ("lido em AAAA-MM-DD") e **[I]** se foi inferido.
  Fato com mais de 6 meses: conferir antes de confiar.
- A configuração da Netlify também está registrada no `ServeRest/infra-docs` (privado), `docs/01`,
  seção "Front na Netlify": atualizar os dois.
