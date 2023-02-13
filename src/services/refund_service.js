import baseService from './base_service';

export default (easypostClient) =>
  class RefundService extends baseService(easypostClient) {
    static _name = 'Refund';

    static _url = 'refunds';

    static key = 'refund';
  };
