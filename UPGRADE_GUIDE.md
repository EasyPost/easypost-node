# Upgrade Guide

Use the following guide to assist in the upgrade process of the `easypost-node` library between major versions.

- [Upgrading from 5.x to 6.0](#upgrading-from-5x-to-60)
- [Upgrading from 4.x to 5.0](#upgrading-from-4x-to-50)
- [Upgrading from 3.x to 4.0](#upgrading-from-3x-to-40)

## Upgrading from 5.x to 6.0

### 6.0 High Impact Changes

- [Updating Dependencies](#60-updating-dependencies)
- [New Create and Update Functions](#60-create-and-update-functions)
- [Removal of Instance Methods](#60-removal-of-instance-methods)
- [Overhauled Error Handling](#60-overhauled-error-handling)

### 6.0 Medium Impact Changes

- [Corrected Names & Namespaces](#60-corrected-names--namespaces)
- [Report Type Parameter Moved](#60-report-type-parameter-moved)
- [Empty Response Return Types](#60-empty-response-return-types)

## 6.0 Updating Dependencies

Likelihood of Impact: High

**Node 12 Required**

easypost-node now requires Node 12 or greater. With this change came a host of new language features that we now take advantage of throughout the library.

**Dependencies**

All dependencies had major and minor version bumps. All previous security vulnerabilities have been remedied.

## 6.0 Create and Update Functions

Likelihood of Impact: High

Previously, one could create a local object and then call `.save()` on it which would either create that object or update it via the API. This is no longer possible.

Instead of creating or updating local objects via a save function, there are new `create()` and `update()` functions. You will call these functions against a "service" like you can with `retrieve` or `all`.

```javascript
// Old approach (save called against a local object)
const api = new Easypost(process.env.EASYPOST_API_KEY);
const parcel = new api.Parcel({
  length: 20.2,
  width: 10.9,
  height: 5,
  weight: 65.9,
});
parcel.save().then(console.log);

// New approach (save called against the Parcel service of a client object)
const client = new Easypost(process.env.EASYPOST_API_KEY);
const parcel = await client.Parcel.create({
  length: 20.2,
  width: 10.9,
  height: 5,
  weight: 65.9,
});
console.log(parcel);
```

## 6.0 Removal of Instance Methods

All instance methods have been removed. This includes things like `.save()`, `.delete()`, `.buy()`, etc. You now call these methods against a service and pass in the ID of the object in question. This change was made to further support thread-safety efforts with differing API keys along with ensuring that data flows properly through the associated service and not through local objects.

The `.lowestRate()` method of a Shipment, Order, or Pickup is an error and is still valid.

```javascript
// Old approach (buy function called on a local shipment object)
const api = new Easypost(process.env.EASYPOST_API_KEY);
api.Shipment.retrieve('shp_123...').then((shipment) => {
  shipment.buy(shipment.lowestRate()).then(console.log);
});

// New approach (buy function called against the Shipment service, of a client object, with the shipment ID passed in)
const client = new Easypost(process.env.EASYPOST_API_KEY);
const shipment = await client.Shipment.retrieve('shp_123...');
const boughtShipment = client.Shipment.buy(shipment.id, shipment.lowestRate());
console.log(boughtShipment);
```

All functions attached to a service are now async and must be awaited.

Services now implement all their own functions instead of inheriting from the BaseService meaning the library's namespace will no longer be cluttered with various `notImplemented` functions

## 6.0 Overhauled Error Handling

Introduced ~2 dozen new error types that extend from either `ApiError` or `EasyPostError`.

New ApiError (extends EasyPostError):

- `errors/api/api_error`
- `errors/api/external_api_error`
- `errors/api/forbidden_error`
- `errors/api/gateway_timeout_error`
- `errors/api/http_error`
- `errors/api/internal_server_error`
- `errors/api/invalid_request_error`
- `errors/api/json_error`
- `errors/api/method_not_allowed_error`
- `errors/api/not_found_error`
- `errors/api/payment_error`
- `errors/api/rate_limit_error`
- `errors/api/redirect_error`
- `errors/api/service_unavailable_error`
- `errors/api/timeout_error`
- `errors/api/unauthorized_error`
- `errors/api/unknown_api_error`

New EasyPostError (extends the builtin Error):

- `errors/general/filtering_error`
- `errors/general/invalid_object_error`
- `errors/general/invalid_parameter_error`
- `errors/general/missing_parameter_error`
- `errors/general/signature_verification_error`

ApiErrors will behave like the previous Error class did. They will include a `message`, `errors`, `code`, and `statusCode`. This class extends EasyPostError which only contains a message, used for exceptions thrown directly from this library.

## 6.0 Corrected Names & Namespaces

The following occurances of names have been corrected to better match our API and documentation:

- `Referall` to `ReferralCustomer` class and variables
- `smartrate` to `smartRate` or `SmartRate` variables
- `primaryOrSecondary` to `priority` parameter of billing functions

## 6.0 Report Type Parameter Moved

Previously, the `type` parameter when creating a Report was a standalone parameter to the function. Now, it is nested inside of `params` object which matches the rest of the library's parameters and allows for greater flexibility of the Report interface.

```javascript
// Old approach
const report = api.Report('payment_log', { more_params: 'here' }).save();

// New approach
const report = await client.Report.create({ type: 'payment_log', more_params: 'here' });
```

## 6.0 Empty Response Return Types

Previously, functions that got an empty response from the API would return `true` indicating the function call was successful. These have been changed to return `void` now, as there is nothing to return. These include deleting records, funding a wallet, etc.

## Upgrading from 4.x to 5.0

**NOTICE:** v5 is deprecated.

[v5 Docs](https://github.com/EasyPost/examples/tree/master/official/docs/node/v5)

### 5.0 High Impact Changes

- [Updating Dependencies](#50-updating-dependencies)
- [Wrapped Responses for `/all` Endpoints](#50-wrapped-responses-for-all-endpoints)

### 5.0 Medium Impact Changes

- [Default Timeouts for HTTP Requests](#50-default-timeouts-for-http-requests)
- [Removal of `retrieveRates` Shipment Method](#50-removal-of-retrieverates-shipment-method)
- [Removal of `add_shipment` and `remove_shipment` Batch Methods](#50-removal-of-add_shipment-and-remove_shipment-batch-methods)
- [`customs_item.value` Corrected to a Number](#50-customs_itemvalue-corrected-to-a-number)

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

**NOTICE:** v4 is deprecated.

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
