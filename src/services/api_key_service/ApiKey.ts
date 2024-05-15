import { IObjectWithId } from "../../utils/types";

export type IApiKey = IObjectWithId<"ApiKey"> & {
  /**
   * The actual key value to use for authentication
   */
  key: string;

  /**
   * When the API key was created
   */
  created_at: string;

  /**
   * Whether the API key is active or not
   */
  active: boolean;
};

export type UserAPIKeys = {
  id: string;
  keys: IApiKey[];
  children: UserAPIKeys[];
};
