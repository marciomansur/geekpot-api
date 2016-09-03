import Joi from 'joi';
import UserController from '../controllers/user';

const userController = new UserController();

module.exports = [{
  method: 'POST',
  path: '/api/users',
  handler: userController.create,
  config: {
    validate: {
      payload: {
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    }
  }
}, {
  method: 'POST',
  path: '/api/users/auth',
  handler: userController.authenticate,
  config: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    }
  }
}, {
  method: 'GET',
  path: '/api/users',
  handler: userController.listUsers,
  config: {
    auth: 'jwt'
  }
}, {
  method: 'PUT',
  path: '/api/users/{id}',
  handler: userController.update,
  config: {
    auth: 'jwt',
    validate: {
      params: { id: Joi.number().integer().required() }
    }
  }
}, {
  method: 'DELETE',
  path: '/api/users/{id}',
  handler: userController.destroy,
  config: {
    auth: 'jwt',
    validate: {
      params: { id: Joi.number().integer().required() }
    }
  }
}];
