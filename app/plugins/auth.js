import config from 'config';
import db from '../models';

const User = db.models.User;

module.exports = {
  key: config.key.privateKey,
  validateFunc: (decoded, request, callback) => {
    User.findById(decoded.id)
      .then(u => u ? callback(null, true) : callback(null, false));
  },
  verifyOptions: { algorithms: [ 'HS256' ] }
}
