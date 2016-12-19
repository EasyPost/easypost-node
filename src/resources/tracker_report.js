import reportBase from './report_base';

export default (api) => {
  const Base = reportBase(api);

  return class TrackerReport extends Base {
    static _name = 'TrackerReport';
    static url = `${Base.url}tracker`;
  };
};
