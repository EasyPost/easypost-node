import Utils from './utils/util';
type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
type RequestHeaders = Record<string, string>;
type ClientOptions = {
    apiKey?: string;
    useProxy?: boolean;
    timeout?: number;
    baseUrl?: string;
    httpMiddleware?: any;
    requestMiddleware?: any;
    httpClient?: any;
};
type HookValue = {
    method: string;
    path: string;
    requestBody: unknown;
    headers: RequestHeaders;
    requestTimestamp: number;
    requestUUID: string;
    httpStatus?: number;
    responseBody?: unknown;
    responseTimestamp?: number;
};
type HookHandler = any;
/**
 * The client used to access services of the EasyPost API.
 * This client is configured to use the latest production version of the EasyPost API.
 * @param {string} key The API key to use for API requests made by this client.
 * @param {Object} [options] Additional options to use for the underlying HTTP client (e.g. middleware, proxy configuration).
 */
export default class EasyPostClient {
    static MS_SECOND: number;
    static DEFAULT_TIMEOUT: number;
    static DEFAULT_BASE_URL: string;
    static DEFAULT_HEADERS: RequestHeaders;
    static METHODS: Record<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', HttpMethod>;
    static SERVICES: Record<string, any>;
    [key: string]: any;
    key?: string;
    useProxy?: boolean;
    timeout: number;
    baseUrl: string;
    httpClient: any;
    requestMiddleware?: any;
    requestHooks: HookHandler[];
    responseHooks: HookHandler[];
    Utils: Utils;
    constructor(key?: string, options?: ClientOptions);
    /**
     * Add a request hook function.
     * @param {(config: object) => void} hook
     */
    addRequestHook(hook: HookHandler): void;
    /**
     * Remove a request hook function.
     * @param {(config: object) => void} hook
     */
    removeRequestHook(hook: HookHandler): void;
    /**
     * Clear all request hooks.
     */
    clearRequestHooks(): void;
    /**
     * Add a response hook function.
     * @param {(config: object) => void} hook
     */
    addResponseHook(hook: HookHandler): void;
    /**
     * Remove a response hook function.
     * @param {(config: object) => void} hook
     */
    removeResponseHook(hook: HookHandler): void;
    /**
     * Clear all response hooks.
     */
    clearResponseHooks(): void;
    /**
     * Make an API call to the EasyPost API.
     *
     * This public, generic interface is useful for making arbitrary API calls to the EasyPost API that
     * are not yet supported by the client library's services. When possible, the service for your use case
     * should be used instead as it provides a more convenient and higher-level interface depending on the endpoint.
     * @param {string} method - The HTTP method to use (e.g. 'get', 'post', 'put', 'patch', 'delete').
     * @param {string} endpoint - The API endpoint to call (e.g. '/addresses').
     * @param {Object} [params] - The parameters to send with the request.
     * @returns {Promise<Object>} The response from the API call.
     */
    makeApiCall(method: string, endpoint: string, params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Create a copy of an {@link EasyPostClient} with overridden options.
     * @param {EasyPostClient} client The `EasyPostClient` instance to clone.
     * @param {Object} [options] The options to override.
     * @returns {EasyPostClient} A new `EasyPostClient` instance.
     */
    static copyClient(client: EasyPostClient, options?: ClientOptions): EasyPostClient;
    /**
     * Normalize HTTP methods from public API input into fetch-compatible values.
     * @param {string} method - The method passed in by callers.
     * @returns {string} lowercase method suitable for fetch.
     */
    static _normalizeMethod(method?: string): string;
    /**
     * Executes a fetch request with timeout support.
     * @private
     */
    _fetchWithTimeout(url: string, init: RequestInit): Promise<any>;
    /**
     * Parse an HTTP response body.
     * @private
     */
    _parseResponseBody(response: Response): Promise<unknown>;
    /**
     * Encodes a string to base64 in both Node and edge runtimes.
     * @private
     */
    static _toBase64(value: string): string;
    /**
     * Build request headers to be sent with each EasyPost API request, combined (or overridden) by any additional headers
     * @param {Object} [additionalHeaders] Additional headers to combine or override with the default headers.
     * @returns {Object} The headers to use for the request.
     */
    static _buildHeaders(additionalHeaders?: RequestHeaders): RequestHeaders;
    /**
     * Build the default User-Agent string while remaining safe in runtimes that
     * do not expose Node globals/modules.
     * @returns {string} The default User-Agent header value.
     */
    static _buildUserAgent(): string;
    /**
     * Attach services to an {@link EasyPostClient} instance.
     * @param {Map} services - A map of {@link BaseService}-based service classes to construct and attach to the client.
     */
    _attachServices(services: Record<string, any>): void;
    /**
     * If the path passed in is a full URI, use it; otherwise, prepend the base url from the api.
     * @param {string} path - The path to build.
     * @returns {string} The full path to use for the HTTP request.
     */
    _buildPath(path?: string): string;
    /**
     * Create a value to be passed to the responseHooks, based on the requestHooks
     * value and the response.
     * @param {Object} baseHooksValue - the value being passed the requestHooks
     * @param {Object} response - the response from the HTTP request
     * @returns {Object} - the value to be passed to the responseHooks
     */
    _createResponseHooksValue(baseHooksValue: HookValue, response: any): HookValue;
    /**
     * Make an HTTP request.
     * @param {string} [path] - The partial path to append to the base url for the request.
     * @param {string} [method] - The HTTP method to use for the request, defaults to GET.
     * @param {Object} [params] - The parameters to send with the request.
     * @param {Object} [headers] - Additional headers to send with the request.
     * @returns {*} The response from the HTTP request.
     * @throws {ApiError} If the request fails.
     */
    _request(path?: string, method?: string, params?: Record<string, unknown>, headers?: RequestHeaders): Promise<any>;
    /**
     * Make a GET HTTP request.
     * @param {string} path - The partial path to append to the base url for the request.
     * @param {Object} [params] - The parameters to send with the request.
     * @param {Object} [headers] - Additional headers to send with the request.
     * @returns {*} The response from the HTTP request.
     */
    _get(path: string, params?: Record<string, unknown>, headers?: RequestHeaders): Promise<any>;
    /**
     * Make a POST HTTP request.
     * @param {string} path - The partial path to append to the base url for the request.
     * @param {Object} [params] - The parameters to send with the request.
     * @param {Object} [headers] - Additional headers to send with the request.
     * @returns {*} The response from the HTTP request.
     */
    _post(path: string, params?: Record<string, unknown>, headers?: RequestHeaders): Promise<any>;
    /**
     * Make a PUT HTTP request.
     * @param {string} path - The partial path to append to the base url for the request.
     * @param {Object} [params] - The parameters to send with the request.
     * @param {Object} [headers] - Additional headers to send with the request.
     * @returns {*} The response from the HTTP request.
     */
    _put(path: string, params?: Record<string, unknown>, headers?: RequestHeaders): Promise<any>;
    /**
     * Make a PATCH HTTP request.
     * @param {string} path - The partial path to append to the base url for the request.
     * @param {Object} [params] - The parameters to send with the request.
     * @param {Object} [headers] - Additional headers to send with the request.
     * @returns {*} The response from the HTTP request.
     */
    _patch(path: string, params?: Record<string, unknown>, headers?: RequestHeaders): Promise<any>;
    /**
     * Make a DELETE HTTP request.
     * @param {string} path - The partial path to append to the base url for the request.
     * @param {Object} [params] - The parameters to send with the request.
     * @param {Object} [headers] - Additional headers to send with the request.
     * @returns {*} The response from the HTTP request.
     */
    _delete(path: string, params?: Record<string, unknown>, headers?: RequestHeaders): Promise<any>;
}
export {};
