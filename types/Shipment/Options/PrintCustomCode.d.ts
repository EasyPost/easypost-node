/**
 *  - FedEx
 *    - (null) - If print_custom_1_code is not provided it defaults to Customer Reference
 *    - PO - Purchase Order Number
 *    - DP - Department Number
 *    - RMA - Return Merchandise Authorization
 *  - UPS
 *    - AJ - Accounts Receivable Customer Account
 *    - AT - Appropriation Number
 *    - BM - Bill of Lading Number
 *    - 9V - Collect on Delivery (COD) Number
 *    - ON - Dealer Order Number
 *    - DP - Department Number
 *    - 3Q - Food and Drug Administration (FDA) Product Code
 *    - IK - Invoice Number
 *    - MK - Manifest Key Number
 *    - MJ - Model Number
 *    - PM - Part Number
 *    - PC - Production Code
 *    - PO - Purchase Order Number
 *    - RQ - Purchase Request Number
 *    - RZ - Return Authorization Number
 *    - SA - Salesperson Number
 *    - SE - Serial Number
 *    - ST - Store Number
 *    - TN - Transaction Reference Number
 *    - EI - Employer's ID Number
 *    - TJ - Federal Taxpayer ID No.
 */
export declare type TPrintCustomCode =
  | 'PO'
  | 'DP'
  | 'RMA'
  | 'AJ'
  | 'AT'
  | 'BM'
  | '9V'
  | 'ON'
  | '3Q'
  | 'IK'
  | 'MK'
  | 'MJ'
  | 'PM'
  | 'PC'
  | 'RQ'
  | 'RZ'
  | 'SA'
  | 'SE'
  | 'ST'
  | 'TN'
  | 'EI'
  | 'TJ';
