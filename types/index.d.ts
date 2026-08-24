export * from './Address';
export * from './Batch';
export * from './Billing';
export * from './Brand';
export * from './Carrier';
export * from './Claim';
export * from './CustomerPortal';
export * from './Customs';
export { IEasyPostOptions } from './EasyPost';
export * from './Embeddable';
export * from './EndShipper';
export * from './errors';
export * from './Event';
export * from './Fee';
export * from './Insurance';
export * from './Luma';
export * from './Order';
export * from './Parcel';
export * from './PaymentMethod';
export * from './Pickup';
export * from './Referral';
export * from './Refund';
export * from './Report';
export * from './ScanForm';
export * from './Shipment';
export * from './SmartRate';
export * from './Tracker';
export * from './User';
export * from './Utility';
export * from './utils';
export * from './Webhook';

declare const EasyPostClient: typeof import('./EasyPost').default;
export default EasyPostClient;
export as namespace MainClient;

declare module 'easypost' {
  export default EasyPostClient;
}
