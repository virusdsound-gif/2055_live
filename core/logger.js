function log(type, payload = {}) {

  console.log('[2055_LOG]', {
    time: Date.now(),
    type,
    payload
  });

}

module.exports = log;
