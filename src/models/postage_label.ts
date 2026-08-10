import EasyPostObject from './easypost_object';

/**
 * A {@link PostageLabel} represents a physical label to affix to a {@link Parcel parcel} when shipping.
 * @public
 * @extends EasyPostObject
 */
export default class PostageLabel extends EasyPostObject {
  declare label_date: string;
  declare label_epl2_url: string;
  declare label_file_type: string;
  declare label_pdf_url: string;
  declare label_resolution: number;
  declare label_size: string;
  declare label_type: string;
  declare label_url: string;
  declare label_zpl_url: string;
}
