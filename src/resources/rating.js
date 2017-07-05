import T from 'proptypes';
import base from './base';
import address from './address';
import parcel from './parcel';
import carrierAccount from './carrierAccount';

export default (api) => {
  const Address = address(api);
  const Parcel = parcel(api);
  const CarrierAccount = carrierAccount(api);

  return class Rating extends base(api) {
	static _name = 'Rating';
	static _url = 'rating/v1/rates';
	static key = 'rating';

	static propTypes = {
		to_address: T.oneOfType([T.string, T.shape(Address.propTypes)]),
		from_address: T.oneOfType([T.string, T.shape(Address.propTypes)]),
		parcels: T.arrayOf(T.oneOfType([T.string, T.shape(Parcel.propTypes)])),
		carrier_accounts: T.array,
		//ratings: T.arrayOf(T.arrayOf(T.object)),
	  	//messages: T.array,
	}

	static all() {
	  return this.notImplemented('all');
	}

	static delete() {
	  return this.notImplemented('delete');
	}
  }
}