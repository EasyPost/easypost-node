import EasyPostObject from './easypost_object';
/**
 * A {@link PostageLabel} represents a physical label to affix to a {@link Parcel parcel} when shipping.
 * @public
 * @extends EasyPostObject
 */
export default class PostageLabel extends EasyPostObject {
    label_date?: string | null;
    label_epl2_url?: string | null;
    label_file_type?: string | null;
    label_pdf_url?: string | null;
    label_resolution?: number | null;
    label_size?: string | null;
    label_type?: string | null;
    label_url?: string | null;
    label_zpl_url?: string | null;
}
