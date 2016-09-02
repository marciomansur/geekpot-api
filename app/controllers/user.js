import db from '../models';

const User = db.models.User;

export default class UserController {

  search(request, reply) {
    reply({
      ping: "pong"
    });
  }
}
