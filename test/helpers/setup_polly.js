/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import FSPersister from '@pollyjs/persister-fs';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly, setupMocha as setupPolly } from '@pollyjs/core';
import { encodeContent, decodeContent } from './cassette_encoding';

Polly.register(FSPersister);
Polly.register(NodeHttpAdapter);

function startPolly() {
  setupPolly({
    adapters: ['node-http'],
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir: resolve(__dirname, '../cassettes'),
      },
    },
    flushRequestsOnStop: true,
  });
}

function setupCassette(server) {
  server.any().on('beforePersist', (_, recording) => {
    const headerScrubbers = [
      'authorization',
      'user-agent',
      'x-client-user-agent',
      'x-easypost-client-user-agent', // deprecated
    ];

    // eslint-disable-next-line no-param-reassign
    recording.request.headers = recording.request.headers.filter(
      ({ name }) => !headerScrubbers.includes(name),
    );

    try {
      decodeContent(recording.response);
    } catch (err) {
      throw new Error(`Error decoding cassette: ${err.message}`);
    }
  });

  server.any().on('beforeReplay', (_, recording) => {
    try {
      encodeContent(recording.response);
    } catch (err) {
      throw new Error(`Error encoding cassette: ${err.message}`);
    }
  });
}

export { startPolly, setupCassette };
