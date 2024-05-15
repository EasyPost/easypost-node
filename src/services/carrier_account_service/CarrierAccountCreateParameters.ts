import { ParametersToOmitOnCreate } from "../../utils/types";
import { ICarrierAccount } from "./CarrierAccount";

export type ICarrierAccountCreateParameters = Omit<
  ICarrierAccount,
  ParametersToOmitOnCreate
>;
