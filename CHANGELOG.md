## CHANGELOG

## 3.11.2 2021-06-11

* Corrects the `usps_zone` propType from integer to number

### 3.11.1 2021-06-11

* Re-package to fix missing file
* add "prepublishOnly" script and ignore all build assets (#177)
* docs: adds info about built docs to README

### 3.11.0 2021-06-10

* Adds `SmartRate` functionality to the `Shipments` object (available by calling `getSmartrates()` on a shipment)
* Adds missing `declaration` and `restriction_comments` propTypes to the customsInfo object
* Changes the `usps_zone` propType from a string to an integer to match what is returned from the API
* Bumped dependencies

### 3.10.1 2021-01-12

* Re-package to fix missing file

### 3.10.0 2021-01-12

* Added events methods
* Added various code examples
* Added rate object
* Removed various old code
* Updated tests
* Restored support for Node 6.x
* Bumped many dependencies
* Swapped out Travis CI for GitHub Actions


### 3.9.1 2020-06-09

* Bump `websocket-extensions` to 0.1.4


### 3.9.0 2020-05-15

* Added the ability to retrieve individual user's API keys
* Added the ability to retrieve all address records
* Removed the unusable shipment return method
* Security updates to Node modules
* Swapped link for Travis CI from .org to .com
* Updated stale unit tests


### 2.1.1 2016-07-29

* Added Insurance object support


### 2.1.0 2016-06-03

* Added an optional timeout for requests. Defaults to 120000ms (thanks Shyp and misterMuyiwa!)


### 2.0.10 2016-03-24

* Added Orders
* Fixed some bad tests (Addresses, Shipments, Parcels)


### 2.0.9 2016-02-03

* Added "verify" and "verify_strict" options to Address create, and made tests for them.


### 2.0.8 2015-11-05

* Updated README and tests


### 2.0.7 2015-07-14

* Changed shipment rate request to use GET not POST
* Fixed some tests


### 2.0.6 2015-02-13

* Added ability to buy and cancel pickups


### 2.0.5 2014-11-04

* Added tracker to shipment buy response
* Added User-Agent fields to request header
* Updated tests


### 2.0.4 2013-12-29

* Moved vows module to a devDependancy.


### 2.0.3 2013-12-29

* Fixed some bugs and improved Shipment.lowestRate by allowing negative filters.
* Improved handling of the partial shipment response object that Shipment.buy returns.
* Minor syntax and documentation improvements.


### 2.0.2 2013-10-13

* Event resource added for webhook consumption.
* Tracker resource added.
* Batch.create_scan_form added to request a ScanForm containing all of a Batch's shipments.


### 2.0.1 2013-07-05

* Added label function to Shipment to request specific label file_formats (pdf, epl2, zpl).
* Added insure function to Shipment. Add insurance to any shipment in one call!
* Added create_and_verify function to Address.
