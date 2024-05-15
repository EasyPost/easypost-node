import { IDatedObject, IObjectWithId } from "../../utils/types";

/**
 * PostageLabel Object
 */
export type IPostageLabel = IObjectWithId<"PostageLabel"> &
  IDatedObject & {
    date_advance: number;
    integrated_form: string;
    label_date: string;
    label_resolution: number;
    label_size: string;
    label_type: string;
    label_url: string;
    label_file_type: string;
    label_pdf_url: string;
    label_epl2_url: string;
    label_zpl_url: string;
  };
