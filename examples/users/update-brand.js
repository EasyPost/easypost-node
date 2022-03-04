const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);
const params = {
  color: '#45c6ed',
};

api.User.retrieve().then((res) => {
  res.updateBrand(params).then(console.log).catch(console.log);
});
