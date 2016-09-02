import fs from 'fs';
import config from 'config';
import path from 'path';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  config.database.params
);

const db = {
  sequelize,
  models: {}
};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname, file));
    db.models[model.name] = model;
  });

Object.keys(db.models).forEach(key => {
  if ("associate" in db.models[key]) {
    db.models[key].associate(db);
  }
});

export default db;
