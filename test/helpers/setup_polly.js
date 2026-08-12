import FetchAdapter from '@pollyjs/adapter-fetch';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import { existsSync } from 'fs';
import { resolve } from 'path';

Polly.register(FSPersister);
Polly.register(FetchAdapter);

const headerScrubbers = ['authorization', 'user-agent'];

const legacyIdentityHeaders = {
  'accept-encoding': 'gzip, deflate',
};

function normalizeNavigatorOnlineForNode() {
  const isNodeRuntime = typeof process !== 'undefined' && Boolean(process.versions?.node);
  const hasNavigator = typeof navigator !== 'undefined' && navigator !== null;

  // In newer Node runtimes, `navigator` exists but `navigator.onLine` may be undefined.
  // Polly treats falsy `onLine` as offline and emits a warning for every recorded request.
  if (!isNodeRuntime || !hasNavigator || typeof navigator.onLine !== 'undefined') {
    return;
  }

  try {
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      configurable: true,
    });
  } catch {
    // If navigator is non-configurable in a specific runtime, continue without mutation.
  }
}

normalizeNavigatorOnlineForNode();

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

function isJsonString(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const trimmed = value.trim();
  if (!(trimmed.startsWith('{') || trimmed.startsWith('['))) {
    return false;
  }

  try {
    JSON.parse(trimmed);
    return true;
  } catch {
    return false;
  }
}

function normalizeLegacyReplayEncoding(recording) {
  const content = recording?.response?.content;

  // Some legacy cassettes store plain JSON text but still mark `encoding: base64`.
  // The fetch adapter decodes base64 when this flag exists, which corrupts replay bodies.
  if (content?.encoding === 'base64' && isJsonString(content.text)) {
    delete content.encoding;
  }
}

function setupCassette(server) {
  server.any().on('beforePersist', (_, recording) => {
    // TODO: Add support to scrub CC details from the request URL and `queryParams`

    scrubHeaders(recording);
    try {
      scrubResponseBodies(recording);
    } catch (err) {
      throw new Error(`Error scrubbing cassette: ${err.message}`);
    }
  });

  server.any().on('beforeReplay', (_, recording) => {
    normalizeLegacyReplayEncoding(recording);
  });
}

function setupLegacyRequestIdentityCompatibility(server) {
  server.any().on('request', (req) => {
    // Keep request identifiers compatible with pre-fetch cassettes.
    if (!req.hasHeader('accept-encoding')) {
      req.setHeader('accept-encoding', legacyIdentityHeaders['accept-encoding']);
    }

    if (!req.hasHeader('host') && req.hostname) {
      req.setHeader('host', req.hostname);
    }

    if (!req.hasHeader('content-length') && typeof req.body === 'string') {
      req.setHeader('content-length', Buffer.byteLength(req.body));
    }
  });
}

function getPollyMode(recordingsDir, recordingName) {
  const cassettePath = resolve(recordingsDir, recordingName, 'recording.har');

  // Source-of-truth behavior: replay when cassette exists, record only when missing.
  return existsSync(cassettePath) ? 'replay' : 'record';
}

// New setup function for Vitest
function setupPollyTests() {
  /** @type {Polly} */
  let polly;
  const recordingsDir = resolve(__dirname, '../cassettes');

  beforeEach((context) => {
    const suiteName = context.task?.suite?.name || 'unknown-suite';
    const recordingName = `${suiteName}/${context.task.name}`;
    const mode = getPollyMode(recordingsDir, recordingName);

    polly = new Polly(recordingName, {
      adapters: ['fetch'],
      persister: 'fs',
      mode,
      recordIfMissing: false,
      recordFailedRequests: true,
      persisterOptions: {
        fs: {
          recordingsDir,
        },
      },
      matchRequestsBy: {
        headers: {
          exclude: headerScrubbers,
        },
      },
      expiresIn: '365d',
      expiryStrategy: 'warn',
    });

    setupLegacyRequestIdentityCompatibility(polly.server);
  });

  afterEach(async () => {
    await polly.stop();
  });

  return () => polly;
}

export { setupCassette, setupPollyTests };
