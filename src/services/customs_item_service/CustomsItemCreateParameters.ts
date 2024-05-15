import { ParametersToOmitOnCreate } from "../../utils/types";
import { ICustomsItem } from "./CustomsItem";

export type ICustomsItemCreateParameters = Omit<
  ICustomsItem,
  ParametersToOmitOnCreate
>;
