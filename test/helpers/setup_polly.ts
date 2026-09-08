import FetchAdapter from '@pollyjs/adapter-fetch';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import { resolve } from 'path';
import { afterEach, beforeEach } from 'vitest';

type PollyRequest = {
  hasHeader(name: string): boolean;
  setHeader(name: string, value: string | number): void;
  hostname?: string;
  body?: unknown;
};

type PollyHeader = { name: string };

type PollyRecording = {
  request: {
    headers: PollyHeader[];
  };
  response: {
    content: {
      text?: string;
      encoding?: string;
    };
  };
};

type PollyServer = {
  any(): {
    on(event: string, handler: (...args: unknown[]) => void): void;
  };
};

type VitestTaskContext = {
  task?: {
    suite?: {
      name?: string;
    };
    name: string;
  };
};

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
const redactedArray: unknown[] = [];
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

function scrubHeaders(recording: PollyRecording) {
  recording.request.headers = recording.request.headers.filter(
    ({ name }) => !headerScrubbers.includes(name),
  );
}

/**
 * Scrub individual element data of a cassette.
 */
function scrubData(data: unknown, scrubberEntry: [string, unknown]): unknown {
  const [key, replacement] = scrubberEntry;

  if (Array.isArray(data)) {
    return data.map((item) => scrubData(item, scrubberEntry));
  }

  if (typeof data === 'object' && data !== null) {
    const input = data as Record<string, unknown>;
    const output: Record<string, unknown> = { ...input };

    if (Object.prototype.hasOwnProperty.call(output, key)) {
      output[key] = replacement;
    }

    for (const item of Object.keys(output)) {
      const element = output[item];
      if (Array.isArray(element)) {
        output[item] = element.map((nestedItem) => scrubData(nestedItem, scrubberEntry));
      } else if (typeof element === 'object' && element !== null) {
        output[item] = scrubData(element, scrubberEntry);
      }
    }

    return output;
  }

  return data;
}

// Scrub sensitive data from response bodies prior to recording the cassette.
function scrubResponseBodies(recording: PollyRecording) {
  const response = recording.response.content.text;

  if (!response) {
    return;
  }

  let responseBody = JSON.parse(response) as unknown;

  for (const scrubberEntry of Object.entries(scrubbers)) {
    responseBody = scrubData(responseBody, scrubberEntry);
  }

  recording.response.content.text = JSON.stringify(responseBody);
}

function isJsonString(value: unknown) {
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

function normalizeLegacyReplayEncoding(recording: PollyRecording) {
  const content = recording?.response?.content;

  // Some legacy cassettes store plain JSON text but still mark `encoding: base64`.
  // The fetch adapter decodes base64 when this flag exists, which corrupts replay bodies.
  if (content?.encoding === 'base64' && isJsonString(content.text)) {
    delete content.encoding;
  }
}

function setupCassette(server: PollyServer) {
  server.any().on('beforePersist', (_, rec) => {
    // TODO: Add support to scrub CC details from the request URL and `queryParams`
    const recording = rec as PollyRecording;

    scrubHeaders(recording);
    try {
      scrubResponseBodies(recording);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`Error scrubbing cassette: ${message}`);
    }
  });

  server.any().on('beforeReplay', (_, rec) => {
    normalizeLegacyReplayEncoding(rec as PollyRecording);
  });
}

function setupLegacyRequestIdentityCompatibility(server: PollyServer) {
  server.any().on('request', (reqArg) => {
    const req = reqArg as PollyRequest;

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

// New setup function for Vitest.
function setupPollyTests() {
  let polly: Polly;
  const recordingsDir = resolve(__dirname, '../cassettes');

  beforeEach((context: VitestTaskContext) => {
    const suiteName = context.task?.suite?.name || 'unknown-suite';
    const taskName = context.task?.name || 'unknown-task';
    const recordingName = `${suiteName}/${taskName}`;

    polly = new Polly(recordingName, {
      adapters: ['fetch'],
      persister: 'fs',
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

    setupLegacyRequestIdentityCompatibility(polly.server as unknown as PollyServer);
  });

  afterEach(async () => {
    await polly.stop();
  });

  return () => polly;
}

export { setupCassette, setupPollyTests };
