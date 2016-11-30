import reportBase from './report_base';

export default (api) => {
  const Base = reportBase(api);

  return class ShipmentReport extends Base {
    static _name = 'ShipmentReport';
    static url = `${Base.url}shipment`;
  };
};
