import baseService from './base_service';

export default (easypostClient) =>
    class ReportService extends baseService(easypostClient) {
        /**
         * The EasyPost API endpoint associated with this service.
         * @override
         * @type {string}
         */
        static #url = 'reports';

        /**
         * Create a report.
         * @param {Object} params
         * @returns {Report}
         */
        static async create(params) {
            const url = `${this.#url}/${params.type}`;
            return this._create(url, params);
        }

        /**
         * Retrieve a list of all reports associated with the API key.
         * @param {Object} [params]
         * @returns {Report[]}
         */
        static async all(params = {}) {
            const url = `${this.#url}/${params.type}`;

            // delete "type" from params, so it doesn't get sent to the API
            // eslint-disable-next-line no-param-reassign
            delete params.type;

            try {
                const response = await easypostClient._get(url, params);

                return this._convertToEasyPostObject(response.body);
            } catch (e) {
                return Promise.reject(e);
            }
        }

        /**
         * Retrieve a report from the API.
         * @param {string} id
         * @returns {Rate}
         */
        static async retrieve(id) {
            const url = `${this.#url}/${id}`;

            return this._retrieve(url);
        }
    };
