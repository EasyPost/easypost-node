import EasyPostObject from './easypost_object';

/**
 * A {@link PostageLabel} represents a physical label to affix to a {@link Parcel parcel} when shipping.
 * @public
 * @extends EasyPostObject
 */
export default class PostageLabel extends EasyPostObject {
  declare label_date: string | null;
  declare label_epl2_url: string | null;
  declare label_file_type: string | null;
  declare label_pdf_url: string | null;
  declare label_resolution: number | null;
  declare label_size: string | null;
  declare label_type: string | null;
  declare label_url: string | null;
  declare label_zpl_url: string | null;
}
