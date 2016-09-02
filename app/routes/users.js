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
}];
