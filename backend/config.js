const dotenv = require('dotenv');
dotenv.config();

const env = process.env;


const config = {
  listPerPage: env.LIST_PER_PAGE || 10,
  cors: {
    origin: ['http://localhost:8080', 'http://localhost:8081']
  },
  database_config:{
    host: env.HOST || 'localhost',
    user: 'root',
    password: env.PASSWORD || 'h941i6tl',
    database: env.DATABASE || 'relation'
  }
}


module.exports = config