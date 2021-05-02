const path = require('path');
const { Pact } = require('@pact-foundation/pact');

global.port = 3001;
global.provider = new Pact({
  port: global.port,
  log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
  dir: path.resolve(process.cwd(), '__tests__', 'contract', 'pacts'),
  logLevel: 'INFO',
  pactfileWriteMode: 'overwrite',
  consumer: 'Front',
  provider: 'ServeRest - API Rest',
});
