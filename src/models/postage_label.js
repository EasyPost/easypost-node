import EasyPostObject from './easypost_object';

/**
 * A {@link PostageLabel} represents a physical label to affix to a {@link Parcel parcel} when shipping.
 * @public
 * @extends EasyPostObject
 */
export default class PostageLabel extends EasyPostObject {
  static label_date;
  static label_epl2_url;
  static label_file_type;
  static label_pdf_url;
  static label_resolution;
  static label_size;
  static label_type;
  static label_url;
  static label_zpl_url;
}
