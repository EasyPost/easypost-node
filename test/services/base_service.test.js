/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../out/easypost';
import EndOfPaginationError from '../../out/errors/general/end_of_pagination_error';
import * as setupPolly from '../helpers/setup_polly';
import {
  MockMiddleware,
  MockRequest,
  MockRequestMatchRule,
  MockRequestResponseInfo,
} from '../helpers/mocking';

describe('Base Service', function () {
  setupPolly.startPolly();

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('getNextPage collects all pages', async function () {
    const pageSize = 1; // Doesn't matter what this is, we're mocking the response

    let allResults = [];
    let previousPage = null;

    // Using scanforms as an example, but this should work for any service since it's a base class method
    // Mock the initial "get all scanforms" call
    let firstPageResponse = {
      scan_forms: [
        {
          id: 'sf_123',
        },
      ],
      has_more: true,
    };
    let middleware = (request) => {
      return new MockMiddleware(request, [
        new MockRequest(
          new MockRequestMatchRule('GET', 'v2\\/scan_forms'),
          new MockRequestResponseInfo(200, firstPageResponse),
        ),
      ]);
    };
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY, {
      requestMiddleware: middleware,
    });

    let firstPage = await this.client.ScanForm.all({ page_size: pageSize });
    allResults = allResults.concat(firstPage.scan_forms);
    previousPage = firstPage;

    // Mock the first "get next page" call with more to collect after
    // (current page "has_more" = True, next page "has_more" = True)
    let secondPageResponse = {
      scan_forms: [
        {
          id: 'sf_456',
        },
      ],
      has_more: true,
    };
    middleware = (request) => {
      return new MockMiddleware(request, [
        new MockRequest(
          new MockRequestMatchRule('GET', 'v2\\/scan_forms'),
          new MockRequestResponseInfo(200, secondPageResponse),
        ),
      ]);
    };
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY, {
      requestMiddleware: middleware,
    });

    let secondPage = await this.client.ScanForm.getNextPage(previousPage, pageSize);
    allResults = allResults.concat(secondPage.scan_forms);
    previousPage = secondPage;

    // Mock the second "get next page" call with no more to collect after
    // (current page "has_more" = True, next page "has_more" = False)
    let thirdPageResponse = {
      scan_forms: [
        {
          id: 'sf_789',
        },
      ],
      has_more: false,
    };
    middleware = (request) => {
      return new MockMiddleware(request, [
        new MockRequest(
          new MockRequestMatchRule('GET', 'v2\\/scan_forms'),
          new MockRequestResponseInfo(200, thirdPageResponse),
        ),
      ]);
    };
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY, {
      requestMiddleware: middleware,
    });

    let thirdPage = await this.client.ScanForm.getNextPage(previousPage, pageSize);
    allResults = allResults.concat(thirdPage.scan_forms);
    previousPage = thirdPage;

    // Verify we have all scanforms (from the initial "get all scanforms" and two subsequent "get next page" calls)
    // Ensures no guard clauses inside the "get next page" method are preventing us from collecting all scanforms
    expect(allResults.length).to.equal(3);

    // Now that the previous page has "has_more" = False, it should throw an error before even making the API call
    try {
      await this.client.ScanForm.getNextPage(previousPage, pageSize);
      // if the above line doesn't throw an error, the test should fail
      expect.fail();
    } catch (error) {
      expect(error).instanceOf(EndOfPaginationError);
    }
  });

  it('getNextPage reuses params passed into all', async function () {
    const pageSize = 1; // Doesn't matter what this is, we're mocking the response

    let previousPage = null;

    // Using scanforms as an example, but this should work for any service since it's a base class method
    // Mock the initial "get all scanforms" call
    const firstPageResponse = {
      scan_forms: [
        {
          id: 'sf_123',
        },
      ],
      has_more: true,
    };
    let middleware = (request) => {
      return new MockMiddleware(request, [
        new MockRequest(
          new MockRequestMatchRule('GET', 'v2\\/scan_forms'),
          new MockRequestResponseInfo(200, firstPageResponse),
        ),
      ]);
    };
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY, {
      requestMiddleware: middleware,
    });

    const firstPage = await this.client.ScanForm.all({ page_size: pageSize, foo: 'foo' });
    previousPage = firstPage;

    // Mock the first "get next page" call with more to collect after
    // (current page "has_more" = True, next page "has_more" = True)
    const secondPageResponse = {
      scan_forms: [
        {
          id: 'sf_456',
        },
      ],
      has_more: true,
    };
    middleware = (request) => {
      return new MockMiddleware(request, [
        new MockRequest(
          new MockRequestMatchRule('GET', 'v2\\/scan_forms'),
          new MockRequestResponseInfo(200, secondPageResponse),
        ),
      ]);
    };
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY, {
      requestMiddleware: middleware,
    });

    const secondPage = await this.client.ScanForm.getNextPage(previousPage);

    expect(secondPage._params.foo).to.equal('foo');
    expect(secondPage.scan_forms[0]._params.foo).to.equal('foo');
    expect(secondPage._params.page_size).to.equal(pageSize);
    expect(secondPage.scan_forms[0]._params.page_size).to.equal(pageSize);
  });
});
