type MockRequestLike = {
  method: string;
  url: string;
};

export class MockRequestMatchRule {
  method: string;
  urlRegexPattern: RegExp;

  constructor(method: string, urlRegexPattern: string | RegExp) {
    this.method = method;
    this.urlRegexPattern =
      urlRegexPattern instanceof RegExp ? urlRegexPattern : new RegExp(urlRegexPattern);
  }
}

export class MockRequestResponseInfo {
  statusCode: number;
  body: unknown;

  constructor(statusCode: number, responseData: unknown) {
    this.statusCode = statusCode;
    this.body = responseData;
  }
}

export class MockRequest {
  matchRule: MockRequestMatchRule;
  responseInfo: MockRequestResponseInfo;

  constructor(matchRule: MockRequestMatchRule, responseInfo: MockRequestResponseInfo) {
    this.matchRule = matchRule;
    this.responseInfo = responseInfo;
  }
}

export class MockMiddleware {
  request: MockRequestLike;
  mockRequests: MockRequest[];
  body: unknown;

  constructor(request: MockRequestLike, mockRequests: MockRequest[]) {
    this.request = request;
    this.mockRequests = mockRequests;
    this.body = {};
  }

  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  auth(_key: string) {
    // do nothing
  }

  // eslint-disable-next-line class-methods-use-this,no-unused-vars,consistent-return
  send(_body: unknown): any {
    // we don't need to do anything with the body
    const mockRequest = this._findMatchingMockRequest(this.request);
    if (mockRequest) {
      this.body = mockRequest.responseInfo.body;
      return mockRequest.responseInfo;
    }
    return {};
  }

  // eslint-disable-next-line no-unused-vars
  query(_params: unknown): any {
    // we don't need to do anything with the params
    const mockRequest = this._findMatchingMockRequest(this.request);
    if (mockRequest) {
      this.body = mockRequest.responseInfo.body;
      return mockRequest.responseInfo;
    }
    return {};
  }

  /**
   * @private
   */
  _findMatchingMockRequest(request: MockRequestLike): MockRequest | null {
    // For each mock request, check if the method and URL match.
    for (let i = 0; i < this.mockRequests.length; i += 1) {
      const mockRequest = this.mockRequests[i];
      if (
        mockRequest.matchRule.method === request.method &&
        request.url.match(mockRequest.matchRule.urlRegexPattern)
      ) {
        return mockRequest;
      }
    }
    return null;
  }
}
