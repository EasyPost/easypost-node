import T from 'proptypes';

export const propTypes = {
  id: T.string,
  object: T.string,
  created_at: T.oneOfType([T.object, T.string]),
  updated_at: T.oneOfType([T.object, T.string]),
  request_url: T.string,
  request_headers: T.object,
  request_body: T.object,
  response_headers: T.object,
  response_body: T.string,
  response_code: T.number,
  total_time: T.number,
};

export class Payload {
  static propTypes = propTypes;

  constructor(data = {}) {
    Object.keys(data).forEach((key) => {
      this[key] = data[key];
    });
  }
}
