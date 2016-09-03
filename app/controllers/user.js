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
      .then(user => user ? user : Promise.reject(Boom.notFound('user_not_found')))
      .then(user => !User.verifyPassword(p.password, user.password) ?
        Promise.reject(Boom.badRequest('password_not_match')) : user
      )
      .then(user => {
        reply({
          data: user,
          token: User.genToken(user.id, user.admin ? 'admin' : 'client')
        });
      })
      .catch(err => err.isBoom ? reply(err) : reply(Boom.badImplementation(err)));
  };

  listUsers(request, reply) {

    if (request.auth.credentials.scope === 'client') {
      return reply(Boom.forbidden('only_admin_can_access'));
    }

    return User.all()
      .then(reply)
      .catch(err => reply(Boom.badImplementation(err)));
  }

  update(request, reply) {
    let p = request.payload;

    if (request.auth.credentials.scope === 'client') {
      return reply(Boom.forbidden('only_admin_can_access'));
    }

    return User.findById(request.params.id)
      .then(u => u ? u : Promise.reject(Boom.notFound('user_not_found')))
      .then(u =>
        u.update(p)
          .then(u => p)
      )
      .then(reply)
      .catch(err => err.isBoom ? reply(err) : reply(Boom.badImplementation(err)));
  };

  destroy(request, reply) {
    if (request.auth.credentials.scope === 'client') {
      return reply(Boom.forbidden('only_admin_can_access'));
    }

    return User.findById(request.params.id)
      .then(u => u ? u : Promise.reject(Boom.notFound('user_not_found')))
      .then(u => u.destroy())
      .then(() => reply().code(204))
      .catch(err => err.isBoom ? reply(err) : reply(Boom.badImplementation(err)));
  }

}
