/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const isCi = require('is-ci');
const pact = require('@pact-foundation/pact-node');
const path = require('path');

if (!isCi) {
  console.error('Publicação pode ser feita apenas em CI.');
  process.exit(1);
}

const gitHash = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString()
  .trim();

const gitBranch = require('child_process')
  .execSync('git branch --show-current')
  .toString()
  .trim();

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), '__tests__', 'contract', 'pacts')],
  pactBroker: process.env.PACT_BROKER_BASE_URL,
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  consumerVersion: gitHash,
  tags: gitBranch,
};

pact
  .publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!');
  })
  .catch((error) => {
    console.error('Pact contract publishing failed: ', error);
  });
