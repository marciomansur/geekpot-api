import fs from 'fs';
import path from 'path';

const routes = [];

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
  .forEach(file => {
    let subRoutes = require(path.join(__dirname, file));
    subRoutes.forEach(route => routes.push(route));
  });

export default routes;
