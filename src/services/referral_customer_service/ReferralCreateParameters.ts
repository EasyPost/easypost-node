import { ParametersToOmitOnCreate } from "../../utils/types";
import { IReferral } from "./Referral";

export type IReferralCreateParameters = Omit<
  IReferral,
  ParametersToOmitOnCreate
>;
