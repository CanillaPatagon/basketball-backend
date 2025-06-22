const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../../', process.env.DB_NAME || 'basketball_app.db');
let db;

const createConnection = () => {
  if (db) return db;
  try {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('❌ Error conectando a SQLite:', err.message);
        throw err;
      }
    });
    db.run('PRAGMA foreign_keys = ON');
    return db;
  } catch (error) {
    console.error('❌ Error creando la conexión a SQLite:', error);
    throw error;
  }
};

const query = (sql, params = []) => {
  if (!db) createConnection();
  return new Promise((resolve, reject) => {
    if (sql.trim().toLowerCase().startsWith('select')) {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    } else {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    }
  });
};

module.exports = { createConnection, query };
