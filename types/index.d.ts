export * from './Address';
export * from './Batch';
export * from './Billing';
export * from './Brand';
export * from './Carrier';
export * from './Customs';
export * from './EndShipper';
export * from './errors';
export * from './Event';
export * from './Fee';
export * from './Insurance';
export * from './Order';
export * from './Parcel';
export * from './Parcel';
export * from './PaymentMethod';
export * from './Pickup';
export * from './Refund';
export * from './Report';
export * from './ScanForm';
export * from './Shipment';
export * from './Tracker';
export * from './User';
export * from './utils';
export * from './Utility';
export * from './Webhook';
export { IEasyPostOptions } from './EasyPost';

declare const EasyPostClient: typeof import('./EasyPost').default;
export = EasyPostClient;
export as namespace MainClient;

declare module 'easypost' {
  export = EasyPostClient;
}
