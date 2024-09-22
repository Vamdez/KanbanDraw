const { Client } = require('pg');

interface Card {
    id: number;
    titulo: string;
    tipo: string;
}

const kanban = new Client({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'admin',
});

kanban.connect();

kanban.query('Select * from cards;', (err: Error | null, res: {rows: Card[] }) => {
    if(!err) {
        console.log(res.rows);
    } else{
        console.log(err.message);
    }
    kanban.end(); 
});