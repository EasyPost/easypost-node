import fs from 'fs';

type FixtureData = Record<string, unknown>;

export default class Fixture {
  // Read fixture data from the fixtures JSON file.
  static readFixtureData(): FixtureData {
    const currentDir = process.cwd();
    const fixtures = JSON.parse(
      fs.readFileSync(
        `${currentDir}/examples/official/fixtures/client-library-fixtures.json`,
        'utf8',
      ),
    ) as FixtureData;

    return fixtures;
  }

  // We keep the page_size of retrieving `all` records small so cassettes stay small.
  static pageSize(): number {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.page_sizes.five_results as number;
  }

  // This is the USPS carrier account ID that comes with your EasyPost account by default and should be used for all tests.
  static uspsCarrierAccountId(): string {
    // Fallback to the EasyPost Node Client Library Test User USPS carrier account ID due to strict matching.
    return process.env.USPS_CARRIER_ACCOUNT_ID || 'ca_5ba7ca3632c54adeb17ad4bcac13c890';
  }

  static usps(): string {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.carrier_strings.usps as string;
  }

  static uspsService(): string {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.service_names.usps.first_service as string;
  }

  static pickupService(): string {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.service_names.usps.pickup_service as string;
  }

  static reportType(): string {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.report_types.shipment as string;
  }

  static reportDate(): string {
    return '2026-07-30';
  }

  static caAddress1(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.addresses.ca_address_1 as Record<string, unknown>;
  }

  static caAddress2(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.addresses.ca_address_2 as Record<string, unknown>;
  }

  static incorrectAddress(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.addresses.incorrect as Record<string, unknown>;
  }

  static basicParcel(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.parcels.basic as Record<string, unknown>;
  }

  static basicCustomsItem(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.customs_items.basic as Record<string, unknown>;
  }

  static basicCustomsInfo(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.customs_infos.basic as Record<string, unknown>;
  }

  static taxIdentifier(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.tax_identifiers.basic as Record<string, unknown>;
  }

  static basicShipment(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.shipments.basic_domestic as Record<string, unknown>;
  }

  static fullShipment(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.shipments.full as Record<string, unknown>;
  }

  static oneCallBuyShipment(): Record<string, unknown> {
    return {
      to_address: this.caAddress2(),
      from_address: this.caAddress1(),
      parcel: this.basicParcel(),
      service: this.uspsService(),
      carrier_accounts: [this.uspsCarrierAccountId()],
      carrier: this.usps(),
    };
  }

  // This fixture will require you to add a `shipment` key with a Shipment object from a test.
  // If you need to re-record cassettes, increment the date below and ensure it is one day in the future,
  // USPS only does "next-day" pickups including Saturday but not Sunday or Holidays.
  static basicPickup(): Record<string, unknown> {
    const pickupDate = '2026-08-01';

    const fixtureData = this.readFixtureData() as Record<string, any>;
    const pickupData = fixtureData.pickups.basic as Record<string, unknown>;
    pickupData.min_datetime = pickupDate;
    pickupData.max_datetime = pickupDate;

    return pickupData;
  }

  static basicCarrierAccount(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.carrier_accounts.basic as Record<string, unknown>;
  }

  // This fixture will require you to append a `tracking_code` key with the shipment's tracking code.
  static basicInsurance(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.insurances.basic as Record<string, unknown>;
  }

  static basicClaim(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.claims.basic as Record<string, unknown>;
  }

  static basicOrder(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.orders.basic as Record<string, unknown>;
  }

  // The credit card details below are for a valid proxy card usable
  // for tests only and cannot be used for real transactions.
  // DO NOT alter these details with real credit card information.
  static creditCardDetails(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.credit_cards.test as Record<string, unknown>;
  }

  static rmaFormOptions(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.form_options.rma as Record<string, unknown>;
  }

  static eventBody(): Buffer {
    const currentDir = process.cwd();
    const eventBody = JSON.parse(
      fs.readFileSync(`${currentDir}/examples/official/fixtures/event-body.json`, 'utf8'),
    );

    return Buffer.from(JSON.stringify(eventBody), 'utf8');
  }

  static webhookHmacSignature(): string {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.webhooks.hmac_signature as string;
  }

  static webhookSecret(): string {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.webhooks.secret as string;
  }

  static webhookUrl(): string {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.webhooks.url as string;
  }

  static webhookCustomHeaders(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.webhooks.custom_headers as Record<string, unknown>;
  }

  static plannedShipDate(): string {
    return '2026-08-01';
  }

  static plannedDeliveryDate(): string {
    return '2026-08-03';
  }

  static billing(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.billing as Record<string, unknown>;
  }

  static lumaRulesetName(): string {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.luma.ruleset_name as string;
  }

  static lumaPlannedShipDate(): string {
    return '2026-08-01';
  }

  static referralUser(): Record<string, unknown> {
    const fixtureData = this.readFixtureData() as Record<string, any>;
    return fixtureData.users.referral as Record<string, unknown>;
  }
}
