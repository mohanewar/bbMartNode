 const env = {
  database: 'bbData',
  username: 'postgres',
  password: '1234',
  host: 'localhost',
  dialect: 'postgres',
  port : 5432,
  ServerPort:3000,
  pool: { 
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 3000
  }
}
module.exports = env;