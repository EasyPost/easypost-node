export class MockRequestMatchRule {
    constructor(method, urlRegexPattern) {
        this.method = method;
        this.urlRegexPattern = urlRegexPattern;
    }
}

export class MockRequestResponseInfo {
    constructor(statusCode, responseData) {
        this.statusCode = statusCode;
        this.body = responseData;
    }
}

export class MockRequest {
    constructor(matchRule, responseInfo) {
        this.matchRule = matchRule;
        this.responseInfo = responseInfo;
    }

}

export class MockMiddleware {
    constructor(request, mockRequests) {
        this.request = request;
        this.mockRequests = mockRequests;
        this.body = {};
    }

    // eslint-disable-next-line class-methods-use-this,no-unused-vars
    auth(key) {
        // do nothing
    }

    // eslint-disable-next-line class-methods-use-this,no-unused-vars,consistent-return
    send(body) {
        // we don't need to do anything with the body
        const mockRequest = this._findMatchingMockRequest(this.request);
        if (mockRequest) {
            this.body = mockRequest.responseInfo.body;
            return mockRequest.responseInfo;
        }
        return {};
    }

    // eslint-disable-next-line no-unused-vars
    query(params) {
        // we don't need to do anything with the params
        const mockRequest = this._findMatchingMockRequest(this.request);
        if (mockRequest) {
            this.body = mockRequest.responseInfo.body;
            return mockRequest.responseInfo;
        }
        return {};
    }

    _findMatchingMockRequest(request) {
        // for each mock request, check if the method and url match
        for (let i = 0; i < this.mockRequests.length; i += 1) {
            const mockRequest = this.mockRequests[i];
            if (mockRequest.matchRule.method === request.method
                && request.url.match(mockRequest.matchRule.urlRegexPattern)) {
                return mockRequest;
            }
        }
        return null;
    }
}