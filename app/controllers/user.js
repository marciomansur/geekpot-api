import db from '../models';
import Boom from 'boom';

const User = db.models.User;

export default class UserController {

  create(request, reply) {
    let p = request.payload;
    p.password = User.hashPassword(p.password);

    return User.create(p)
      .then(user => {
        return reply(user);
      })
      .catch(err => reply(Boom.badRequest(err)));
  }
}
