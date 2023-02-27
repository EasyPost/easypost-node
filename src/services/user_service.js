import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The UserService class provides methods for interacting with EasyPost User objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class UserService extends baseService(easypostClient) {
    static #name = 'User';

    static #url = 'users';

    static #key = 'user';

    /**
     * Create a user.
     * @param {Object} params
     * @returns {User}
     */
    static async create(params) {
      const url = this.#url;

      const wrappedParams = {};
      wrappedParams[this.#key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Update a user.
     * @param {string} id
     * @param {Object} params
     * @returns {User}
     */
    static async update(id, params) {
      const url = `${this.#url}/${id}`;
      const wrappedParams = {
        user: params,
      };

      try {
        const response = await easypostClient._patch(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a child user.
     * @param {string} id
     * @param {string} urlPrefix
     * @returns {User}
     */
    static async retrieve(id, urlPrefix) {
      let url = urlPrefix || this.#url; // retrieve self
      if (id) {
        // retrieve child users
        url = urlPrefix ? `${urlPrefix}/${id}` : `${this.#url}/${id}`;
      }

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve the authenticated user.
     * @returns {User}
     */
    static async retrieveMe() {
      const url = this.#url;

      try {
        const response = await easypostClient._get(url);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Delete a CarrierAccount.
     * @param {string} id
     * @returns {Promise|Promise<never>}
     */
    static async delete(id) {
      const url = `${this.#url}/${id}`;

      try {
        await easypostClient._delete(url);

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Update the brand of a user.
     * @param {number} id
     * @param {Object} params
     * @returns {Brand}
     */
    static async updateBrand(id, params) {
      const url = `${this.#url}/${id}/brand`;
      const wrappedParams = { brand: params };

      try {
        const response = await easypostClient._patch(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };