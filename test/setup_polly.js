/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import FSPersister from '@pollyjs/persister-fs';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly, setupMocha as setupPolly } from '@pollyjs/core';
import { encodeContent, decodeContent } from './helpers/cassette_encoding';

Polly.register(FSPersister);
Polly.register(NodeHttpAdapter);

function startPolly() {
  setupPolly({
    adapters: ['node-http'],
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir: resolve(__dirname, './cassettes'),
      },
    },
  });
}

function stripCassettes(server) {
  server.any().on('beforePersist', (_, recording) => {
    const headerScrubbers = [
      'authorization',
      'user-agent',
      'x-client-user-agent',
      'x-easypost-client-user-agent',
    ];

    // eslint-disable-next-line no-param-reassign
    recording.request.headers = recording.request.headers.filter(
      ({ name }) => !headerScrubbers.includes(name),
    );

    // eslint-disable-next-line no-param-reassign
    // recording.response.url = recording.response.url.replace(
    //   /card[number]=[^&]+/,
    //   'card[number]=<redacted>',
    // );

    decodeContent(recording.response);
  });

  server.any().on('beforeReplay', (_, recording) => {
    encodeContent(recording.response);
  });
}

export { startPolly, stripCassettes };
