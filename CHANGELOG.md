# CHANGELOG

## v6.8.2 (2023-10-20)

- Bump all dependencies to address security vulnerabilities in Babel

## v6.8.1 (2023-10-13)

- Fixes a bug causing `ScanForm` creation to fail

## v6.8.0 (2023-10-11)

- Adds `apiKeys` method to `User` service allowing you to retrieve parent or child API keys by user ID
- Adds all possible `ITrackerStatusDetail` values to the Typescript definitions

## v6.7.3 (2023-09-05)

- Fix endpoint for creating a FedEx Smartpost carrier account

## v6.7.2 (2023-08-09)

- Corrects the Typescript definition for `lowestRate` of Shipment, Order, and Pickup objects

## v6.7.1 (2023-08-07)

- Checks for `X-Hmac-Signature` header during webhook validation regardless of casing (closes #399)

## v6.7.0 (2023-07-28)

- Adds methods to the easypost client for subscribing and unsubscribing from requests and responses being sent to the API
  - `addRequestHook`: Adds a request hook to the EasyPost client. Useful for logging or debugging.
  - `removeRequestHook`: Removes a request hook from the EasyPost client.
  - `clearRequestHooks`: Clears all request hooks from the EasyPost client.
  - `addResponseHook`: Adds a response hook to the EasyPost client. Useful for logging or debugging.
  - `removeResponseHook`: Removes a response hook from the EasyPost client.
  - `clearResponseHooks`: Clears all response hooks from the EasyPost client.
- Maps 400 status codes to new `BadRequestError` class

## v6.6.1 (2023-06-20)

- Fixes the `pickup_rates` Typescript property of a Pickup

## v6.6.0 (2023-06-06)

- Retrieving carrier metadata is now generally available via `client.carrierMetadata.retrieve`
- Bumps and modernizes all dependencies which no longer requires a force install/update
- Adds support for Typescript 5
- Typescript definitions graduated from beta to GA

## v6.5.0 (2023-05-09)

- Adds missing typescript definitions for `Utility` class
- Fixes incorrect typescript definitions for `Address`, `EndShipper` and `Webhook` class methods
- Moves `Utils` to EasyPostClient class

## v6.4.0 (2023-05-02)

- Adds `retrieveEstimatedDeliveryDate` in Shipment service

## v6.3.0 (2023-04-24)

- Fixes the Beta client, previously the beta functions were not accessible due to how they were exported. This has now changed so each service is prepended with `Beta` (eg: `BetaCarrierMetadata`)
- Adds `CarrierMetadata` typescript definitions

## v6.2.0 (2023-04-18)

- Adds beta `retrieveCarrierMetadata` function
- Adds missing `api_keys` property to `User`
- Improves Error Deserialization to dynamically handle edge cases that have a bad format
- Adds a helper function to retrieve carrier metadata

## v6.1.0 (2023-04-04)

- Add `getNextPage` function that retrieves the next page of results for a paginated collection

## v6.0.0 (2023-03-22)

Includes all of the changes made in v6.0.0-rc1 below plus the following:

- Adds class properties to each model for autocomplete and explicit deserialization
- Adds missing `status_detail` to trackers

## v6.0.0-rc1 (2023-03-01)

### Breaking Changes

- Bumps minimum Node from 10 to 12
- Renamed default export `API` to `EasyPostClient`
- Overhauled the data flow of the library
  - Instead of creating a local object and then calling `.save()` on it to create/update it at the API level, you will pass in the same data as before but to one of either `create()` or `update()` functions on the service in question
  - The base service no longer implements all functions and instead each individual service implements its own functions. This means the library namespace won't be cluttered with various `notImplemented` functions
  - All instance functions (excluding `lowestRate`) previously called on an object are instead called on a service. (eg: `shipment.buy(shipment.lowest_rate())` is now `client.Shipment.buy(shipment.id, shipment.lowest_rate())`))
    - All functions attached to a service are now async and must be awaited
- Moved library structure around
  - Introduced `/models` that contain the EasyPost objects
  - Renamed `/resources` to `/services` to better reflect that a service called against an EasyPostClient differs from an API resource, now known as the `models`
  - Each service file now has `_service` appended
  - Added `/utils` which contains both `internal_util.js` which is not intended for user consumption and `util.js` which contains public utilities
  - Moved `getLowestSmartRate` and `validateWebook` function to `util.js` as neither of them require the client object to function
- References of `Referral` were changed to `ReferralCustomer` to match the API
- Bumps major versions of all dependencies
- Changes the `primaryOrSecondary` parameter name to `priority` in billing functions to match the API
- Empty response functions now return nothing (deleting records, funding a wallet, etc)
- Explicit `type` parameter for retrieving all reports removed, include `type` in generic `params` dictionary instead.
- Improves error handling
  - Specific error types for each category of error
  - API error message may be an array rather than a string. Arrays will be concatenated (by comma) and returned as a string.
- Corrects references of `smartrate` to `SmartRate` and `smartRate` to match the API

### New Features

- Add `retrieveStatelessRates` and `getLowestStatelessRate` functions

### Bug Fixes

- Completely overhauled deserialization process, nested objects (eg: rates of shipments, etc) now properly convert to their appropriate EasyPostObject
- Fixes the `verifyAddress` function to actually verify an address
- Fixes a bug that could double wrap or unintentionally wrap the results of an `/all` API call with the name of the object in question

## v5.10.0 (2023-01-18)

- Adds `all` function to `Pickup` class to retrieve all pickups
- Adds `retrievePayload` and `retrieveAllPayloads` functions to retrieve payloads for an Event
  - These are static functions on the Event class, so you can call them like `easypost.Event.retrieveAllPayloads(eventId)`
- Adds missing Typescript implementations for `CustomsInfo`, `CustomsItem`, `ScanForm`, `User`, `Referral`, `Rate`, `CarbonOffset`, and `Brand` (closes #328)

## v5.9.0 (2023-01-11)

- Adds new beta billing functionality for ReferralCustomer users
  - `addPaymentMethod` can add a pre-existing Stripe bank account or credit card to your EasyPost account
  - `refundByAmount` refunds your wallet by a dollar amount
  - `refundByPaymentLog` refunds you wallet by a PaymentLog ID

## v5.8.0 (2022-12-07)

- Routes requests for creating a carrier account with a custom workflow (eg: FedEx, UPS) to the correct endpoint when using the `save` function

## v5.7.1 (2022-10-24)

- Fixes multiple bugs that made the `addCreditCard` function unusable, adds tests
- The response of the `updateBrand` function now properly becomes a `Brand` object
- Insuring a shipment via `Shipment.insure` no longer improperly wraps the `amount` key in `id`. There may be other edge cases among other object/function calls that get corrected due to this change
- Validating webhook signatures of differing byte sizes now throws a more meaningful error message
- Removed the browser check when building request headers. Impact should be minimal since out of the box this library cannot be used in the browser

## v5.7.0 (2022-09-21)

- Adds support to pass an `EndShipper` ID to the shipment buy call
- Migrates the Partner White Label (Referral) functions from beta to the general library namespace and deprecates the beta functions

## v5.6.1 (2022-09-08)

- Fixes a regression introduced in v5.1.0 that included the entire response instead of the response body when errors are returned from the API
- Corrects the error type when Stripe cannot be reached when adding a credit card for referral users

## v5.6.0 (2022-08-25)

- Moves EndShipper out of beta to the general library namespace

## v5.5.0 (2022-08-02)

- Adds Carbon Offset support
  - Adds the ability to create a shipment with carbon_offset
  - Adds the ability to buy a shipment with carbon_offset
  - Adds the ability to one-call-buy a shipment with carbon_offset
  - Adds the ability to regenerate a shipment with carbon_offset
- Adds `validateWebhook` function that returns your webhook or raises an error if there is a `webhookSecret` mismatch
- Allows for looser values to the `verify` and `verify_strict` params when creating an address (can accept strings or bools outside of an array)

## v5.4.0 (2022-07-18)

- Adds the ability to generate shipment forms via `Shipment.generateForm()` function
- Adds missing Typescript definitions for Billing and PaymentMethod

## v5.3.0 (2022-07-11)

- Adds bundled Typescript definitions in beta (closes #119, #122, #184, and #243 - big thank you to our awesome community!)
- Adds `Billing.retrievePaymentMethods()`, `Billing.deletePaymentMethod()`, and `Billing.fundWallet()` functions
- Adds support for webhook secrets
- Adds OS-specific details to the user-agent header
- Swaps update functions from `put` to `patch` to better match API expectation and documentation. Behavior of these functions should remain the same

## v5.2.0 (2022-05-19)

- Adds the `EndShipper` Beta class with `save()`, `retrieve()`, and `all()` functions
- Bumps patch versions of dependencies

## v5.1.0 (2022-05-09)

- Adds a `lowestRate()` function to Orders and Pickups
- Adds a `Shipment.getLowestSmartrate()` and `shipment.lowest_smartrate()` functions
- Adds an error message to `lowestRate()` functions when no lowest rate can be found
- Adds beta Referral class for the new Partner White Label API with these new functions: `create()`, `update_email()`, `all()`, and `add_credit_card()`
- Fixes API error parsing by first trying to additional error message fields before falling back to the current configured fields

## v5.0.0 (2022-04-13)

### Breaking Changes

- Bumps the minimum version of Node to `v10`
- Removes build targets of `0.10`, `6`, and `8`, the library is now only published under a single bundled `easypost` package instead of separate bundled assets per version
- Bumps all dependencies to the most recent compatible versions that still support Node 10, the library is now buildable on Node 16+
- Removed `retrieveRates()` method because the shipment object already has rates. If you need to get new rates for a shipment, please use regenerateRates() method instead
- Removed `enable()` and `disable()` methods in the apiKey class. Please use this functionality through EasyPost website
- Removed the deprecated `options.useCookie` param. Please use `options.useProxy` instead
- Removed `add_shipment` and `remove_shipment` from the Batch object which could lead to confusion as the API documentation only describes adding/removing as an array. If you need to add or remove a single shipment from a batch, use the already existing `add_shipments` and `remove_shipments` and pass your single shipment into an array.
- The responses from the `/all` endpoints are no longer unwrapped and now properly follow the documentation where records will be wrapped in their respective object key
  - This now corrects the location of the `has_more` key which allows for pagination

### Features

- Adds support to one-call buy an order
- Adds the Nodejs version in use to the User-Agent header on requests
- Adds support to update the brand for a user
- Adds `retrieveMe()` convenience function that retrieves the authenticated user without the need to specify an ID
- Adds `address.verifyAddress()` and `Address.createAndVerify()` functions
- Adds `Batch.createAndBuy()` function
- Adds `Refund` class which has `Refund.save()`, `Refund.all()`, and `Refund.retrieve()` functions

### Bug Fixes

- Fixes `delivery_date` property typo on Rate object
- Fixes `customs_item.value` to be a `number` instead of a `string`
- Lowered the default timeout of requests from 120 seconds to 60 seconds

### Chores

- Removes `@easypost/build` and instead uses Webpack directly to build the project
  - The project is now only built for `node` and may not provide browser compatible code. If you require browser compatible Javascript, we suggest you build from source
- Adds `prettier` and formats the entire project
- Adds comprehensive test suite with Pollyjs covering every interface of the client library
- Adds jsdoc style info to each method

## v4.0.0 (2021-10-06)

- JSON encodes POST bodies instead of form encoding them by default
- Adds support for `tax_identifiers`
- The `regenerateRates` method now makes a post request to re-rate a shipment. The new `retrieveRates` will simply retrieve the rates of a shipment without re-rating
- Ran `npm audit fix` to bump patch versions of dependencies

## v3.11.2 (2021-06-11)

- Corrects the `usps_zone` propType from integer to number

### v3.11.1 (2021-06-11)

- Re-package to fix missing file
- add "prepublishOnly" script and ignore all build assets (#177)
- docs: adds info about built docs to README

### v3.11.0 (2021-06-10)

- Adds `SmartRate` functionality to the `Shipments` object (available by calling `getSmartrates()` on a shipment)
- Adds missing `declaration` and `restriction_comments` propTypes to the customsInfo object
- Changes the `usps_zone` propType from a string to an integer to match what is returned from the API
- Bumped dependencies

### v3.10.1 (2021-01-12)

- Re-package to fix missing file

### v3.10.0 (2021-01-12)

- Added events methods
- Added various code examples
- Added rate object
- Removed various old code
- Updated tests
- Restored support for Node 6.x
- Bumped many dependencies
- Swapped out Travis CI for GitHub Actions

### v3.9.1 (2020-06-09)

- Bump `websocket-extensions` to 0.1.4

### v3.9.0 (2020-05-15)

- Added the ability to retrieve individual user's API keys
- Added the ability to retrieve all address records
- Removed the unusable shipment return method
- Security updates to Node modules
- Swapped link for Travis CI from .org to .com
- Updated stale unit tests

### v2.1.1 (2016-07-29)

- Added Insurance object support

### v2.1.0 (2016-06-03)

- Added an optional timeout for requests. Defaults to 120000ms (thanks Shyp and misterMuyiwa!)

### v2.0.10 (2016-03-24)

- Added Orders
- Fixed some bad tests (Addresses, Shipments, Parcels)

### v2.0.9 (2016-02-03)

- Added "verify" and "verify_strict" options to Address create, and made tests for them.

### v2.0.8 (2015-11-05)

- Updated README and tests

### v2.0.7 (2015-07-14)

- Changed shipment rate request to use GET not POST
- Fixed some tests

### v2.0.6 (2015-02-13)

- Added ability to buy and cancel pickups

### v2.0.5 (2014-11-04)

- Added tracker to shipment buy response
- Added User-Agent fields to request header
- Updated tests

### v2.0.4 (2013-12-29)

- Moved vows module to a devDependancy.

### v2.0.3 (2013-12-29)

- Fixed some bugs and improved Shipment.lowestRate by allowing negative filters.
- Improved handling of the partial shipment response object that Shipment.buy returns.
- Minor syntax and documentation improvements.

### v2.0.2 (2013-10-13)

- Event resource added for webhook consumption.
- Tracker resource added.
- Batch.create_scan_form added to request a ScanForm containing all of a Batch's shipments.

### v2.0.1 (2013-07-05)

- Added label function to Shipment to request specific label file_formats (pdf, epl2, zpl).
- Added insure function to Shipment. Add insurance to any shipment in one call!
- Added create_and_verify function to Address.
