const { Client } = require('pg');

const kanban = new Client({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'admin',
});

kanban.connect()
    .then(() => console.log('Connect in Database'))
    .catch((err:Error) => console.log('DataBase Error', err));

export default kanban;
