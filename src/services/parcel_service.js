import baseService from './base_service';

export default (easypostClient) =>
  class ParcelService extends baseService(easypostClient) {
    static _name = 'Parcel';

    static _url = 'parcels';

    static key = 'parcel';

    /**
     * all not implemented
     * @returns {Promise<never>}
     */
    static all() {
      return this.notImplemented('all');
    }
  };
