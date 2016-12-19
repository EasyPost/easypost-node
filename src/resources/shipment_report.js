import reportBase from './report_base';

export default api => (
  class ShipmentReport extends reportBase(api) {
    static _name = 'ShipmentReport';
    static url = 'reports/shipment';
  }
);
