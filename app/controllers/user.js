import db from '../models';
import Boom from 'boom';
import * as mailer from '../plugins/mailer';
// import Promise from 'bluebird';

const User = db.models.User;

export default class UserController {

  _verifyAdmin(request, reply) {
    if (request.auth.credentials.scope === 'client') {
      return reply(Boom.forbidden('access_forbidden'));
    }
  }

  _verifyActive(request, reply) {
    if (request.auth.credentials.scope === false) {
      return reply(Boom.badRequest('account_not_activated'));
    }
  }

  create(request, reply) {
    let p = request.payload;
    p.password = User.hashPassword(p.password);

    return User.create(p)
      .then(user =>
        mailer.signIn(user.email, user.id)
          .then(b => user)
      )
      .then(reply)
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
          token: User.genToken(
            user.id, user.admin ? 'admin' : 'client',
            user.active
          )
        });
      })
      .catch(err => err.isBoom ? reply(err) : reply(Boom.badImplementation(err)));
  };

  active(request, reply) {
    return User.findById(request.params.id)
      .then(u => u ? u : Promise.reject(Boom.notFound('user_not_found')))
      .then(u =>
        u.update({ active: true })
          .then(up => u)
      )
      .then(u => reply(`The account for ${u.name} was activated!`))
      .catch(err => err.isBoom ? reply(err) : reply(Boom.badImplementation(err)));
  };

  listUsers(request, reply) {
    return User.all()
      .then(reply)
      .catch(err => reply(Boom.badImplementation(err)));
  };

  update(request, reply) {
    let p = request.payload;

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
    return User.findById(request.params.id)
      .then(u => u ? u : Promise.reject(Boom.notFound('user_not_found')))
      .then(u => u.destroy())
      .then(() => reply().code(204))
      .catch(err => err.isBoom ? reply(err) : reply(Boom.badImplementation(err)));
  }

  listDestroyed(request, reply) {
    return User.all({
      where: { deleted_at: { $ne: null }}
    })
    .then(reply)
    .catch(err => reply(Boom.badImplementation(err)));
  }

}
