import { Sequelize, DataTypes } from 'sequelize';
import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import process from 'process';
import { Dialect } from 'sequelize';
import config from '../config';

const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

interface DB {
  [key: string]: any;
  sequelize: Sequelize;  // Altere para ser obrigatória
  Sequelize: typeof Sequelize;
}

const db: DB = {} as DB;

let sequelize: Sequelize;

// Crie uma instância do Sequelize
sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  dialect: dbConfig.dialect as Dialect,
});

// Lê todos os arquivos de modelos na pasta atual
readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts'
    );
  })
  .forEach((file) => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Configura associações entre os modelos, se houver
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;  // Aqui sequelize nunca deve ser undefined
db.Sequelize = Sequelize;

export default db;
