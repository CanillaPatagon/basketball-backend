const { createConnection, query } = require('../config/sqlite');

const createTables = async () => {
    const tables = [
        `CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, rol TEXT NOT NULL, activo INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now', 'localtime')))`,
        `CREATE TABLE IF NOT EXISTS equipos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL UNIQUE, descripcion TEXT)`,
        `CREATE TABLE IF NOT EXISTS jugadores (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, email_padre TEXT NOT NULL, equipo_id INTEGER NOT NULL, numero_camiseta INTEGER, activo INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now', 'localtime')), FOREIGN KEY (equipo_id) REFERENCES equipos(id), FOREIGN KEY (email_padre) REFERENCES usuarios(email))`,
        `CREATE TABLE IF NOT EXISTS partidos (id INTEGER PRIMARY KEY AUTOINCREMENT, equipo_id INTEGER NOT NULL, fecha_partido TEXT NOT NULL, contrincante TEXT NOT NULL, direccion TEXT NOT NULL, uniforme TEXT NOT NULL, comentarios TEXT, hora_citacion TEXT NOT NULL, lugar_citacion TEXT NOT NULL, activo INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now', 'localtime')), FOREIGN KEY (equipo_id) REFERENCES equipos(id))`,
        `CREATE TABLE IF NOT EXISTS asistencia (id INTEGER PRIMARY KEY AUTOINCREMENT, partido_id INTEGER NOT NULL, jugador_id INTEGER NOT NULL, confirmado INTEGER, confirmado_por INTEGER, fecha_confirmacion TEXT, comentario TEXT, created_at TEXT DEFAULT (datetime('now', 'localtime')), FOREIGN KEY (partido_id) REFERENCES partidos(id), FOREIGN KEY (jugador_id) REFERENCES jugadores(id), UNIQUE(partido_id, jugador_id))`
    ];
    for (const table of tables) {
        await query(table);
    }
    console.log('✅ Tablas creadas o verificadas.');
};

if (require.main === module) {
    createConnection();
    console.log('🚀 Configurando la base de datos...');
    createTables().then(() => console.log('🎉 Base de datos lista.')).catch(err => console.error(err));
}
