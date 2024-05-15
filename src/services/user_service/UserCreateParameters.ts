import { ParametersToOmitOnCreate } from "../../utils/types";
import { IUser } from "./User";

export type IUserCreateParameters = Omit<IUser, ParametersToOmitOnCreate>;
