import { ParametersToOmitOnCreate } from "../../utils/types";
import { ICustomsInfo } from "./CustomsInfo";

export type ICustomsInfoCreateParameters = Omit<
  ICustomsInfo,
  ParametersToOmitOnCreate
>;
