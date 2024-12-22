import { resolve } from 'path';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
// import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';

import { decodeCassetteResponseBodies, encodeCassetteResponseBodies } from './cassette_encoding';

Polly.register(FSPersister);
Polly.register(NodeHttpAdapter);

const headerScrubbers = ['authorization', 'user-agent'];

const redactedString = '<REDACTED>';
const redactedObject = {};
const redactedArray = [];
const scrubbers = {
  client_ip: redactedString,
  credentials: redactedObject,
  email: redactedString,
  fields: redactedArray,
  key: redactedString,
  phone_number: redactedString,
  phone: redactedString,
  test_credentials: redactedObject,
};

function scrubHeaders(recording) {
  recording.request.headers = recording.request.headers.filter(
    ({ name }) => !headerScrubbers.includes(name),
  );
}

/**
 * Scrub individual element data of a cassette.
 * @param {*} data
 * @param {*} scrubberEntry
 */
function scrubData(data, scrubberEntry) {
  const [key, replacement] = scrubberEntry;

  // Root-level list scrubbing
  if (Array.isArray(data)) {
    data.map((item, index) => {
      if (item[key]) {
        data[index][key] = replacement;
      }
    });
  } else if (typeof data === 'object' && data !== null) {
    // Root-level key scrubbing
    if (data[key]) {
      data[key] = replacement;
    } else {
      // Nested scrubbing
      Object.keys(data).forEach((item) => {
        const element = data[item];
        if (Array.isArray(element)) {
          element.map((nestedItem, nestedIndex) => {
            data[item][nestedIndex] = scrubData(nestedItem, scrubberEntry);
          });
        } else if (typeof element === 'object' && element !== null) {
          data[item] = scrubData(element, scrubberEntry);
        }
      });
    }
  }

  return data;
}

// Scrub sensitive data from response bodies prior to recording the cassette.
function scrubResponseBodies(recording) {
  let response = recording.response.content.text;

  if (response) {
    const responseBody = JSON.parse(response);

    Object.entries(scrubbers).forEach((scrubberEntry) => {
      response = scrubData(responseBody, scrubberEntry);
    });
  }

  recording.response.content.text = JSON.stringify(response);
}

function setupCassette(server) {
  server.any().on('beforePersist', (_, recording) => {
    try {
      decodeCassetteResponseBodies(recording.response);
    } catch (err) {
      throw new Error(`Error decoding cassette: ${err.message}`);
    }

    // TODO: Add support to scrub CC details from the request URL and `queryParams`

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

// New setup function for Vitest
function setupPollyTests() {
  /** @type {Polly} */
  let polly;
  let suiteName;

  beforeAll(async ({ name }) => {
    suiteName = name;
  });

  beforeEach((context) => {
    polly = new Polly(`${suiteName}/${context.task.name}`, {
      adapters: ['node-http'],
      persister: 'fs',
      recordFailedRequests: true,
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
      expiresIn: '180d',
      expiryStrategy: 'warn',
    });
  });

  afterEach(async () => {
    await polly.stop();
  });

  return () => polly;
}

export { setupPollyTests, setupCassette };
