import baseService from './base_service';

export default (easypostClient) =>
  class InsuranceService extends baseService(easypostClient) {
    static _name = 'Insurance';

    static _url = 'insurances';

    static key = 'insurance';
  };
