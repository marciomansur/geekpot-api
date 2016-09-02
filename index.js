import Hapi from 'hapi';
import config from 'config';

const server = new Hapi.Server();
const routes = [];

server.connection(config.server);

server.register(routes, err => {
  server.start(() => {
    if (!config.isTest) {
      console.log('Geekpot Users API');
      console.log(`Server online: ${config.server.host}:${config.server.port}`);
    }
  });
});

export default server;
