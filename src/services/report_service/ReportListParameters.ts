import { IAllMethodParameters } from "../../utils/types";
import { TReportType } from "./ReportObjectType";

/**
 * @see https://www.easypost.com/docs/api/node#retrieve-a-list-of-refunds
 */
export type IReportListParameters = IAllMethodParameters & {
  type: TReportType;
};
