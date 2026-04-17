const gachaRoute = require('./components/gacha/gacha.route');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');

module.exports = (app) => {
  books(app);
  users(app);

  app.use('/api', gachaRoute);
};
