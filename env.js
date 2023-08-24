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
  // database: 'bb-mart-n1',
  // username: 'bb-mart',
  // password: 'Bbgal@17',
  // host: 'us-east-1.8d7563b5-2bc4-4ca7-998e-10c9f7cc5bb4.aws.ybdb.io',
  // dialect: 'postgres',
  // port : 5433,
  // ServerPort:3000,
  // pool: { 
  //   max: 10,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 3000
  // }
}
module.exports = env;