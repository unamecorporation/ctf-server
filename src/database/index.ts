import Credentials from '../config/Database';
import Knex from 'knex';
const { client, ...connection } = Credentials;
const knex: Knex = require('knex')({ client, connection });

export default knex;
