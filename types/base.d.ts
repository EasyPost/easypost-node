export declare interface IDatedObject {
  /**
   * Date ISO String
   */
  created_at: string;

  /**
   * Date ISO String
   */
  updated_at: string;
}

export declare interface IBaseObject<ObjectName> {
  object: ObjectName;
}

export declare interface IObjectWithId<ObjectName> extends IBaseObject<ObjectName> {
  /**
   * Unique identifier, begins with "adr_" / "prcl_" / "ins_" / "trk_" / "batch_" / "cstinfo_" / etc
   */
  id: string;

  /**
   * Set based on which api-key you used, either "test" or "production"
   */
  mode: 'test' | 'production';

  /**
   * The object name, e.g. "Address", "Rate", "Shipment", etc
   */
  object: ObjectName;
}
