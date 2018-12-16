require('dotenv').config();

let client = process.env.DB_CLIENT;

if (client == 'mysql') {
  client = 'mysql2';
}
export default {
  client,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
};
