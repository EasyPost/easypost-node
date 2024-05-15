export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type ParametersToOmitOnCreate =
  | "id"
  | "object"
  | "mode"
  | "created_at"
  | "updated_at";

export type IAllMethodParameters = {
  /**
   * Optional pagination parameter.
   * Only records created before the given ID will be included.
   * May not be used with after_id
   */
  before_id?: string;

  /**
   * Optional pagination parameter.
   * Only records created after the given ID will be included.
   * May not be used with before_id
   */
  after_id?: string;

  /**
   * Only return records created after this timestamp.
   * Defaults to 1 month ago, or 1 month before a passed end_datetime
   */
  start_datetime?: string;

  /**
   * Only return records created before this timestamp.
   * Defaults to end of the current day, or 1 month after a passed start_datetime
   */
  end_datetime?: string;

  /**
   * The number of records to return on each page.
   * The maximum value is 100
   */
  page_size?: number;
};

export type IDatedObject = {
  /**
   * Date ISO String
   */
  created_at: string;

  /**
   * Date ISO String
   */
  updated_at: string;
};

export type IBaseObject<ObjectName> = {
  object: ObjectName;
};

export type IObjectWithId<ObjectName> = IBaseObject<ObjectName> & {
  /**
   * Unique identifier, begins with "adr_" / "prcl_" / "ins_" / "trk_" / "batch_" / "cstinfo_" / etc
   */
  id: string;

  /**
   * Set based on which api-key you used, either "test" or "production"
   */
  mode: "test" | "production";

  /**
   * The object name, e.g. "Address", "Rate", "Shipment", etc
   */
  object: ObjectName;
};

export default {};
