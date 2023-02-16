import baseService from './base_service';

export default (easypostClient) =>
  class UserService extends baseService(easypostClient) {
    static _name = 'User';

    static _url = 'users';

    static key = 'user';

    /**
     * Create a user.
     * @param {object} params
     * @returns {User}
     */
    static async create(params) {
      const url = this._url;

      const wrappedParams = {};
      wrappedParams[this.key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Update a user.
     * @param {string} id
     * @param {object} params
     * @returns {User}
     */
    static async update(id, params) {
      const url = `${this._url}/${id}`;
      const wrappedParams = {
        user: params,
      };

      try {
        const response = await easypostClient.patch(url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
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
      let url = urlPrefix || this._url; // retrieve self
      if (id) {
        // retrieve child users
        url = urlPrefix ? `${urlPrefix}/${id}` : `${this._url}/${id}`;
      }

      try {
        const response = await easypostClient.get(url);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve the authenticated user.
     * @returns {User}
     */
    static async retrieveMe() {
      const url = this._url;

      try {
        const response = await easypostClient.get(url);

        return this.convertToEasyPostObject(response.body);
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
      const url = `${this._url}/${id}`;

      try {
        await easypostClient.del(url);

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Update the brand of a user.
     * @param {number} id
     * @param {object} params
     * @returns {Brand}
     */
    static async updateBrand(id, params) {
      const url = `${this._url}/${id}/brand`;
      const wrappedParams = { brand: params };

      try {
        const response = await easypostClient.patch(url, wrappedParams);

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
