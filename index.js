import Hapi from 'hapi';
import config from 'config';
import routes from './app/routes';
import db from './app/models';

const plugins = [];
const server = new Hapi.Server({
  connections: {
    routes: { cors: true }
  }
});

server.connection(config.server);

server.register(require('hapi-auth-jwt2'), err => {
  server.auth.strategy('jwt', 'jwt', require('./app/plugins/auth'));
  //server.auth.default('jwt');
  server.route(routes);
});

server.register(plugins, err => {
  if (err) throw err;

  db.sequelize.sync()
    .then(() => {
      server.start(() => {
        if (!config.isTest) {
            console.log('Geekpot Users API');
            console.log(`Server online: ${config.server.host}:${config.server.port}`);
          }
      });
    })
    .error(err => {
      if (err) {
        console.log(`Database ${config.database.database} connection error:`);
        throw err;
      }
    });
});

export default server;
