# Upgrade Guide

Use the following guide to assist in the upgrade process of the `easypost-node` library between major versions.

- [Upgrading from 4.x to 5.0](#upgrading-from-4x-to-50)
- [Upgrading from 3.x to 4.0](#upgrading-from-3x-to-40)

## Upgrading from 4.x to 5.0

### 5.0 High Impact Changes

- [Updating Dependencies](#50-updating-dependencies)
- [Wrapped Responses for `/all` Endpoints](#50-wrapped-responses-for-all-endpoints)

### 5.0 Medium Impact Changes

- [Default Timeouts for HTTP Requests](#50-default-timeouts-for-http-requests)
- [Removal of `retrieveRates` Shipment Method](#50-removal-of-retrieverates-shipment-method)
- [Removal of `add_shipment` and `remove_shipment` Batch Methods](#50-removal-of-addshipment-and-removeshipment-batch-methods)
- [`customs_item.value` Corrected to a Number](#50-customsitemvalue-corrected-to-a-number)

### 5.0 Low Impact Changes

- [Removal of `options.useCookie`](#50-removal-of-optionsusecookie)
- [Removal of `enable` and `disable` API Key Methods](#50-removal-of-enable-and-disable-api-key-methods)

## 5.0 Updating Dependencies

Likelihood of Impact: High

**Node 10 Required**

easypost-node now requires Node 10 or greater. As such, we no longer build version targets for Node `0.10`, `6`, and `8` of this library. Moving forward there will only be a single `easypost` bundled package that you can reference.

**Dependencies**

All dependencies had major and minor version bumps.

## 5.0 Wrapped Responses for `/all` Endpoints

Likelihood of Impact: High

Responses from the `/all` endpoints are no longer unwrapped and now properly follow the documentation where records are wrapped with their respective object key. This may look like the following:

```json
{
  "shipments": [
    {
      "id": "123"
    },
    {
      "id": "456"
    }
  ],
  "has_more": true
}
```

This is a large breaking change (where before all records were unwrapped from their parent object key and the `has_more` key was placed among the list results). With this change, you can now properly retrieve paginated records by checking for the `has_more` key and making another query for the next "page".

## 5.0 Default Timeouts for HTTP Requests

Likelihood of Impact: Medium

Default timeouts for all HTTP requests are now set to 60 seconds from requests. If you require longer timeouts, you can set them by overriding the default:

```javascript
// Timeouts are in milliseconds
const api = new Api('API_KEY', {
  timeout: 60000,
});
```

## 5.0 Removal of `retrieveRates` Shipment Method

Likelihood of Impact: Medium

Shipment objects already contain associated rates, retrieving rates standalone doesn't provide any benefit and was thus removed. If instead you would like to regenerate rates for a shipment, you can use the new `regenerateRates()` method on the Shipment object.

## 5.0 Removal of `add_shipment` and `remove_shipment` Batch Methods

Likelihood of Impact: Medium

We removed the `add_shipment` and `remove_shipment` methods from the Batch object which could lead to confusion as the API documentation only describes adding/removing as an array. If you need to add or remove a single shipment from a batch, use the already existing `add_shipments` and `remove_shipments` methods (plural versions of the now removed methods) and pass your single shipment into that array.

## 5.0 `customs_item.value` Corrected to a Number

Likelihood of Impact: Medium

We've corrected the type of the `customs_item.value` field from a string to a number to better match the documentation. Requests that pass a `value` as a string moving forward will fail due to a type mismatch.

## 5.0 Removal of `options.useCookie`

Likelihood of Impact: Medium

The deprecated `options.useCookie` option has been removed. Please use its replacement `options.useProxy`

## 5.0 Removal of `enable` and `disable` API Key Methods

Likelihood of Impact: Medium

The `enable` and `disable` methods for API keys have been removed as they did not work properly and this functionality is better supported directly via our website.

## Upgrading from 3.x to 4.0

### 4.0 High Impact Changes

- [JSON Encoded Bodies](#40-json-encoded-bodies)

### 4.0 Medium Impact Changes

- [HTTP Method Changed for retrieveRates()](#40-http-method-changed-for-retrieverates)

### 4.0 Low Impact Changes

- [Updating Dependencies](#40-updating-dependencies)

## 4.0 JSON Encoded Bodies

Likelihood of Impact: High

All `POST` and `PUT` request bodies are now JSON encoded instead of form-encoded. You may see subtle inconsistencies to how certain data types were previously sent to the API. We have taken steps to mitigate and test against these edge cases.

## 4.0 HTTP Method Changed for retrieveRates()

Likelihood of Impact: Medium

The HTTP method used for the `retrieveRates` function at the API level has changed from `POST` to `GET` and will only retrieve rates for a shipment instead of regenerating them. The `regenerateRates` function now makes a POST request to retrieve updated rates.

## 4.0 Updating Dependencies

Likelihood of Impact: Low

**Dependencies**

All dependencies had their patch versions bumped.
