import UserController from '../controllers/user';

const userController = new UserController();

module.exports = [{
  method: 'GET',
  path: '/api/users',
  handler: userController.search
}];
