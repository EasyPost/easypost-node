export default class Fixture {
  // We keep the page_size of retrieving `all` records small so cassettes stay small
  static pageSize() {
    return 5;
  }

  // This is the USPS carrier account ID that comes with your EasyPost account by default and should be used for all tests
  static uspsCarrierAccountId() {
    // Fallback to the EasyPost Node Client Library Test User USPS carrier account ID
    return process.env.USPS_CARRIER_ACCOUNT_ID || 'ca_5ba7ca3632c54adeb17ad4bcac13c890';
  }

  static usps() {
    return 'USPS';
  }

  static uspsService() {
    return 'First';
  }

  static pickupService() {
    return 'NextDay';
  }

  static reportType() {
    return 'shipment';
  }

  // If you need to re-record cassettes, increment this date by 1
  static reportDate() {
    return '2022-04-11';
  }

  static webhookUrl() {
    return 'http://example.com';
  }

  static basicAddress() {
    return {
      name: 'Jack Sparrow',
      company: 'EasyPost',
      street1: '388 Townsend St',
      street2: 'Apt 20',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      phone: '5555555555',
    };
  }

  static incorrectAddressToVerify() {
    return {
      verify: [true],
      street1: '417 montgomery street',
      street2: 'FL 5',
      city: 'San Francisco',
      state: 'CA',
      zip: '94104',
      country: 'US',
      company: 'EasyPost',
      phone: '415-123-4567',
    };
  }

  static pickupAddress() {
    return {
      name: 'Dr. Steve Brule',
      street1: '179 N Harbor Dr',
      city: 'Redondo Beach',
      state: 'CA',
      zip: '90277',
      country: 'US',
      phone: '3331114444',
    };
  }

  static basicParcel() {
    return {
      length: 10,
      width: 8,
      height: 4,
      weight: 15.4,
    };
  }

  static basicCustomsItem() {
    return {
      description: 'Sweet shirts',
      quantity: 2,
      weight: 11,
      value: 23.25,
      hs_tariff_number: '654321',
      origin_country: 'US',
    };
  }

  static basicCustomsInfo() {
    return {
      eel_pfc: 'NOEEI 30.37(a)',
      customs_certify: true,
      customs_signer: 'Steve Brule',
      contents_type: 'merchandise',
      contents_explanation: '',
      restriction_type: 'none',
      non_delivery_option: 'return',
      customs_items: [this.basicCustomsItem()],
    };
  }

  static taxIdentifier() {
    return {
      entity: 'SENDER',
      tax_id_type: 'IOSS',
      tax_id: '12345',
      issuing_country: 'GB',
    };
  }

  static basicShipment() {
    return {
      to_address: this.basicAddress(),
      from_address: this.basicAddress(),
      parcel: this.basicParcel(),
    };
  }

  static fullShipment() {
    return {
      to_address: this.basicAddress(),
      from_address: this.basicAddress(),
      parcel: this.basicParcel(),
      customs_info: this.basicCustomsInfo(),
      options: {
        label_format: 'PNG', // Must be PNG so we can convert to ZPL later
        invoice_number: '123',
      },
      reference: '123',
    };
  }

  static oneCallBuyShipment() {
    return {
      to_address: this.basicAddress(),
      from_address: this.basicAddress(),
      parcel: this.basicParcel(),
      service: this.uspsService(),
      carrier_accounts: [this.uspsCarrierAccountId()],
      carrier: this.usps(),
    };
  }

  // This fixture will require you to add a `shipment` key with a Shipment object from a test.
  // If you need to re-record cassettes, increment the date below and ensure it is one day in the future,
  // USPS only does "next-day" pickups including Saturday but not Sunday or Holidays.
  static basicPickup() {
    const pickupDate = '2022-06-03';

    return {
      address: this.basicAddress(),
      min_datetime: pickupDate,
      max_datetime: pickupDate,
      instructions: 'Pickup at front door',
    };
  }

  static basicCarrierAccount() {
    return {
      type: 'UpsAccount',
      credentials: {
        account_number: 'A1A1A1',
        user_id: 'USERID',
        password: 'PASSWORD',
        access_license_number: 'ALN',
      },
    };
  }

  // This fixture will require you to append a `tracking_code` key with the shipment's tracking code
  static basicInsurance() {
    return {
      from_address: this.basicAddress(),
      to_address: this.basicAddress(),
      carrier: this.usps(),
      amount: '100',
    };
  }

  static basicOrder() {
    return {
      from_address: this.basicAddress(),
      to_address: this.basicAddress(),
      shipments: [this.basicShipment()],
    };
  }

  static endShipperAddress() {
    return {
      name: 'Jack Sparrow',
      company: 'EasyPost',
      street1: '388 Townsend St',
      street2: 'Apt 20',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
      email: 'test@example.com',
      zip: '94107',
      phone: '5555555555',
    };
  }

  // The credit card details below are for a valid proxy card usable
  // for tests only and cannot be used for real transactions.
  // DO NOT alter these details with real credit card information.
  static creditCardDetails() {
    return {
      number: '4536410136126170',
      expirationMonth: '05',
      expirationYear: '2028',
      cvc: '778',
    };
  }
}
