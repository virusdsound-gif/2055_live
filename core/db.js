const fs = require('fs');

const DB_PATH = '/data/data/com.termux/files/home/2055_live/state/db.json';

let data = {
  live: null,
  wallets: {}
};

if (fs.existsSync(DB_PATH)) {
  data = JSON.parse(fs.readFileSync(DB_PATH));
}

function save() {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = {
  data,
  save
};
