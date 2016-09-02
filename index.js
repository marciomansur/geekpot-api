import Hapi from 'hapi';
import config from 'config';
import routes from './app/routes';

const plugins = [];
const server = new Hapi.Server({
  connections: {
    routes: { cors: true }
  }
});

server.connection(config.server);
server.route(routes);

server.register(plugins, err => {
  if (err) throw err;

  server.start(() => {
    if (!config.isTest) {
      console.log('Geekpot Users API');
      console.log(`Server online: ${config.server.host}:${config.server.port}`);
    }
  });
});

export default server;
