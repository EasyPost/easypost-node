module.exports = class Util {
  /**
   * Get the lowest rate of an EasyPost object such as a Shipment, Order, or Pickup.
   * @param {Object} easypostObject
   * @param {Array} carriers
   * @param {Array} services
   * @returns {Object}
   */
  static getLowestObjectRate(easypostObject, carriers, services, ratesKey = 'rates') {
    let rates = easypostObject[ratesKey] || [];

    if (carriers) {
      const carriersLower = carriers.map((carrier) => carrier.toLowerCase());
      rates = rates.filter((rate) => carriersLower.includes(rate.carrier.toLowerCase()));
    }

    if (services) {
      const servicesLower = services.map((service) => service.toLowerCase());
      rates = rates.filter((rate) => servicesLower.includes(rate.service.toLowerCase()));
    }

    if (rates.length === 0) {
      throw new Error('No rates found.');
    }

    return rates.reduce((lowest, rate) => {
      if (parseFloat(rate.rate) < parseFloat(lowest.rate)) {
        return rate;
      }

      return lowest;
    }, rates[0]);
  }
};
