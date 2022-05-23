import { gunzipSync, gzipSync } from 'zlib';

const defaultEncoding = 'utf-8';

const hasHeader =
  (headers) =>
  ([key, value]) =>
    headers.some((header) =>
      header.name === key && typeof value === 'function'
        ? value(header.value)
        : header.value === value,
    );

const headerValueDelimiter = /,\s*/;
const headerValueContains = (valueToFind) => (headerValue) =>
  headerValue.split(headerValueDelimiter).includes(valueToFind);

const isContentChunked = (headers) =>
  hasHeader(headers)(['transfer-encoding', headerValueContains('chunked')]);

const isContentGzipped = (headers) =>
  hasHeader(headers)(['content-encoding', headerValueContains('gzip')]);

const decodeContent = async (response) => {
  const { content, headers } = response;
  if (!isContentGzipped(headers) || content.size === 0) {
    return;
  }

  const parsedBody = JSON.parse(content.text);

  const wholeBody = isContentChunked(headers) ? parsedBody.join('') : parsedBody;

  const zipped = Buffer.from(wholeBody, 'base64');
  const unzipped = await gunzipSync(zipped);

  content.text = unzipped.toString(defaultEncoding);
};

const encodeContent = (response) => {
  const { content, headers } = response;
  if (!isContentGzipped(headers)) {
    return;
  }

  const unzipped = Buffer.from(content.text, defaultEncoding);
  const zipped = gzipSync(unzipped);
  const base64String = zipped.toString('base64');
  const body = isContentChunked(headers)
    ? // re-chunk the content
      [base64String] // making the first chunk 20 chars, as it seems to match polly's typical result
    : base64String;
  const text = JSON.stringify(body);
  content.text = text;

  // recalculating the content size in case manual editing of data changes the size
  content.size = text.length;
  response.bodySize = text.length;
};

export { decodeContent, encodeContent };
