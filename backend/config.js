const env = process.env;

const config = {
  listPerPage: env.LIST_PER_PAGE || 10,
  cors: {
    origin: ['http://localhost:8080', 'http://localhost:8081']
  }
}


module.exports = config