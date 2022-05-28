
module.exports = class DB {
  constructor() {
    this.mysql = require('mysql2/promise');
    this.conn = await this.mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'bryant@0720',
      database: 'relation'
    });
  };

  async run(sql, variable) {
    const [rows, fields] = await this.conn.execute(sql, variable)
    return new Promise((resolve, reject) => resolve(rows));
  }
}
