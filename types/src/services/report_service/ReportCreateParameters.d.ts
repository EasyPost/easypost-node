import { TReportType } from './ReportObjectType';
export type IReportCreateParameters = {
  type: TReportType;
  start_date: string | null;
  end_date?: string | null;
  include_children?: boolean | null;
  send_email?: boolean | null;
  columns?: string[] | null;
  additional_columns?: string[] | null;
};
