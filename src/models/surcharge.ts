/**
 * A Surcharge represents additional billing details attached to a {@link Rate}.
 * @public
 */
export default class Surcharge {
  declare object?: string | null;
  declare type?: string | null;
  declare category?: string | null;
  declare amount?: string | null;
  declare list_amount?: string | null;
  declare retail_amount?: string | null;
  declare currency?: string | null;
}