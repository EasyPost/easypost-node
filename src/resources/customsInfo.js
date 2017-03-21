import T from 'proptypes';
import base from './base';
import customsItem from './customsItem';

export default (api) => {
  const CustomsItem = customsItem(api);

  return class CustomsInfo extends base(api) {
    static _name = 'CustomsInfo';
    static _url = 'customs_infos';
    static key = 'customs_info';

    static propTypes = {
      id: T.string,
      object: T.string,
      mode: T.string,
      created_at: T.oneOfType([T.object, T.string]),
      updated_at: T.oneOfType([T.object, T.string]),
      customs_certify: T.bool,
      customs_signer: T.string,
      contents_type: T.string,
      contents_explanation: T.string,
      restriction_type: T.string,
      eel_pfc: T.string,
      customs_items: T.arrayOf(T.shape(CustomsItem.propTypes)),
    }

    static all() {
      return super.notImplemented('all');
    }

    static delete() {
      return this.notImplemented('delete');
    }
  };
};
