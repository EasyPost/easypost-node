import { ParametersToOmitOnCreate } from "../../utils/types";
import { IEndshipper } from "./EndShipper";

export type IEndShipperCreateParameters = Omit<
  IEndshipper,
  ParametersToOmitOnCreate
>;
