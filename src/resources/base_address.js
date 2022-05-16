import T from 'proptypes';

export const baseAddress = {
  id: T.string,
  object: T.string,
  name: T.string,
  company: T.string,
  street1: T.string,
  street2: T.string,
  city: T.string,
  state: T.string,
  zip: T.string,
  country: T.string,
  phone: T.string,
  email: T.string,
};

export default baseAddress;
