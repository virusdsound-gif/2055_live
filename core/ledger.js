const db = require('./db');

function bal(user) {

  if (!db.data.wallets[user]) {
    db.data.wallets[user] = 10;
  }

  return db.data.wallets[user];
}

function burn(user, amount) {

  if (bal(user) < amount) {
    throw new Error('Insufficient ESS');
  }

  db.data.wallets[user] -= amount;

  db.save();
}

function pay(from, to, amount) {

  if (bal(from) < amount) {
    throw new Error('Insufficient ESS');
  }

  if (!db.data.wallets[to]) {
    db.data.wallets[to] = 0;
  }

  db.data.wallets[from] -= amount;
  db.data.wallets[to] += amount;

  db.save();
}

module.exports = {
  bal,
  burn,
  pay
};
