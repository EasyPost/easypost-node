import type AddressServiceFactory from '../../src/services/address_service';
import type ParcelServiceFactory from '../../src/services/parcel_service';
import type CustomsInfoServiceFactory from '../../src/services/customs_info_service';
import type CustomsItemServiceFactory from '../../src/services/customs_item_service';
import type ShipmentServiceFactory from '../../src/services/shipment_service';

type AddressCreateInput = Parameters<ReturnType<typeof AddressServiceFactory>['create']>[0];
type ParcelCreateInput = Parameters<ReturnType<typeof ParcelServiceFactory>['create']>[0];
type CustomsInfoCreateInput = Parameters<ReturnType<typeof CustomsInfoServiceFactory>['create']>[0];
type CustomsItemCreateInput = Parameters<ReturnType<typeof CustomsItemServiceFactory>['create']>[0];
type ShipmentCreateInput = Parameters<ReturnType<typeof ShipmentServiceFactory>['create']>[0];

declare class Fixture {
  static readFixtureData(): Record<string, unknown>;
  static pageSize(): number;

  static uspsCarrierAccountId(): string;
  static usps(): string;
  static uspsService(): string;
  static pickupService(): string;
  static reportType(): string;
  static reportDate(): string;

  static caAddress1(): AddressCreateInput;
  static caAddress2(): AddressCreateInput;
  static incorrectAddress(): AddressCreateInput;

  static basicParcel(): ParcelCreateInput;
  static basicCustomsItem(): CustomsItemCreateInput;
  static basicCustomsInfo(): CustomsInfoCreateInput;
  static taxIdentifier(): Record<string, unknown>;

  static basicShipment(): ShipmentCreateInput;
  static fullShipment(): ShipmentCreateInput;
  static oneCallBuyShipment(): ShipmentCreateInput & Record<string, unknown>;

  static basicPickup(): Record<string, unknown>;
  static basicCarrierAccount(): Record<string, unknown>;
  static basicInsurance(): Record<string, unknown>;
  static basicClaim(): Record<string, unknown>;
  static basicOrder(): Record<string, unknown>;

  static creditCardDetails(): Record<string, unknown>;
  static rmaFormOptions(): Record<string, unknown>;

  static eventBody(): Buffer;
  static webhookHmacSignature(): string;
  static webhookSecret(): string;
  static webhookUrl(): string;
  static webhookCustomHeaders(): Record<string, unknown>;

  static plannedShipDate(): string;
  static plannedDeliveryDate(): string;
  static billing(): Record<string, unknown>;

  static lumaRulesetName(): string;
  static lumaPlannedShipDate(): string;

  static referralUser(): Record<string, unknown>;
}

export default Fixture;
