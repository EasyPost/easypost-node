/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import FSPersister from '@pollyjs/persister-fs';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly, setupMocha as setupPolly } from '@pollyjs/core';
import { encodeCassetteResponseBodies, decodeCassetteResponseBodies } from './cassette_encoding';

Polly.register(FSPersister);
Polly.register(NodeHttpAdapter);

const headerScrubbers = ['authorization', 'user-agent'];

function startPolly() {
  setupPolly({
    adapters: ['node-http'],
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir: resolve(__dirname, '../cassettes'),
      },
    },
    matchRequestsBy: {
      headers: {
        exclude: headerScrubbers,
      },
    },
  });
}

function scrubHeaders(recording) {
  // eslint-disable-next-line no-param-reassign
  recording.request.headers = recording.request.headers.filter(
    ({ name }) => !headerScrubbers.includes(name),
  );
}

// Scrub sensitive data from response bodies (at the root level or in a root list)
// prior to recording the cassette.
// This function DOES NOT scrub data in nested objects or lists.
function scrubResponseBodies(recording) {
  const redactedString = '<REDACTED>';
  const redactedObject = {};
  const redactedArray = [];
  const scrubbers = {
    api_keys: redactedArray,
    children: redactedArray,
    client_ip: redactedString,
    credentials: redactedObject,
    email: redactedString,
    key: redactedArray,
    keys: redactedArray,
    phone_number: redactedString,
    phone: redactedString,
    test_credentials: redactedObject,
  };
  let response = recording.response.content.text;

  if (response) {
    response = JSON.parse(response);

    Object.entries(scrubbers).forEach((scrubberEntry) => {
      const [scrubber, scrubberValue] = scrubberEntry;
      if (Array.isArray(response)) {
        response = response.map((item) => {
          if (item[scrubber]) {
            // eslint-disable-next-line no-param-reassign
            item[scrubber] = scrubberValue;
          }
          return item;
        });
      } else if (response[scrubber]) {
        response[scrubber] = scrubberValue;
      }
    });
  }

  // eslint-disable-next-line no-param-reassign
  recording.response.content.text = JSON.stringify(response);
}

function setupCassette(server) {
  server.any().on('beforePersist', (_, recording) => {
    try {
      decodeCassetteResponseBodies(recording.response);
    } catch (err) {
      throw new Error(`Error decoding cassette: ${err.message}`);
    }

    // TODO: Add support to scrub CC details from the request URL

    scrubHeaders(recording);
    try {
      scrubResponseBodies(recording);
    } catch (err) {
      throw new Error(`Error scrubbing cassette: ${err.message}`);
    }
  });

  server.any().on('beforeReplay', (_, recording) => {
    try {
      encodeCassetteResponseBodies(recording.response);
    } catch (err) {
      throw new Error(`Error encoding cassette: ${err.message}`);
    }
  });
}

export { startPolly, setupCassette };
