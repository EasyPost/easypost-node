import EasyPost from "../..";
import baseService from "../base_service";
import { ICarrierMetadata } from "./CarrierMetadata";

export * from "./CarrierMetadata";

export default (easypostClient: EasyPost) =>
  class CarrierMetadataService extends baseService(easypostClient) {
    /**
     * Retrieve a list of carrier metadata based on the provided parameters.
     * @param carriers - List of carrier in string
     * @param type - List of types in string
     * @returns - List of carrier metadata
     */
    static async retrieve(
      carriers: string[] | null = null,
      types: string[] | null = null
    ) {
      const url = "metadata/carriers";
      const params = {
        ...(carriers &&
          carriers.length > 0 && { carriers: carriers.join(",") }),
        ...(types && types.length > 0 && { types: types.join(",") }),
      };

      try {
        const response = await easypostClient._get(url, params);
        return this._convertToEasyPostObject<ICarrierMetadata[]>(
          response.body.carriers || [],
          params
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
