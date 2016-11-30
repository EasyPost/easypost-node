import T from 'proptypes';
import base from './base';
import customsItem from './customsItem';

export default (api) => {
  const CustomsItem = customsItem(api);

  return class CustomsInfo extends base(api) {
    static _name = 'CustomsInfo';
    static url = 'customs_infos';

    static all() {
      return super.notImplemented();
    }

    static propTypes = {
      id: T.string,
      object: T.string,
      mode: T.string,
      created_at: T.object,
      updated_at: T.object,
      customs_certify: T.bool,
      customs_signer: T.string,
      contents_type: T.string,
      restriction_type: T.string,
      eel_pfc: T.string,
      customs_items: T.arrayOf(T.shape(CustomsItem.propTypes)),
    }
  };
};
