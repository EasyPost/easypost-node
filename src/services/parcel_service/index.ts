import EasyPost from "../..";
import baseService from "../base_service";
import { IParcel } from "./Parcel";
import { IParcelCreateParameters } from "./ParcelCreateParameters";

export * from "./Parcel";
export * from "./ParcelCreateParameters";

export default (easypostClient: EasyPost) =>
  /**
   * The ParcelService class provides methods for interacting with EasyPost {@link Parcel} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class ParcelService extends baseService(easypostClient) {
    /**
     * Create a {@link Parcel parcel}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-parcel EasyPost API Documentation} for more information.
     * @param params - The parameters to create a parcel with.
     * @returns - The created parcel.
     */
    static async create(params: IParcelCreateParameters) {
      const url = "parcels";

      const wrappedParams = {
        parcel: params,
      };

      return this._create<IParcel>(url, wrappedParams);
    }

    /**
     * Retrieve a {@link Parcel parcel} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-parcel EasyPost API Documentation} for more information.
     * @param id - The ID of the parcel to retrieve.
     * @returns - The retrieved parcel.
     */
    static async retrieve(id: string) {
      const url = `parcels/${id}`;

      return this._retrieve<IParcel>(url);
    }
  };
