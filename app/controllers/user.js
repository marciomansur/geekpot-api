import db from '../models';
import Boom from 'boom';
// import Promise from 'bluebird';

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
  };

  authenticate(request, reply) {
    let p = request.payload;

    return User.findOne({ email: p.email })
      .then(user => user ? user : Promise.reject('user_not_found'))
      .then(user => !User.verifyPassword(p.password, user.password) ?
        reply(Boom.badRequest('password_not_match')) : user
      )
      .then(user => {
        reply({
          data: user,
          token: User.genToken(user.id)
        });
      })
      .catch(err => err.isBoom ? reply(err) : reply(Boom.badImplementation(err)));
  }
}
