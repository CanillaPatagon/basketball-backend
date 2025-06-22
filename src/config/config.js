require('dotenv').config();

module.exports = {
  server: {
    port: process.env.PORT || 3001,
    env: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'basketball_super_secret_key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  database: {
    name: process.env.DB_NAME || 'basketball_app.db'
  }
};
