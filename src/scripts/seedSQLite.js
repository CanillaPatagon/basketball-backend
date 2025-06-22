const { createConnection, query } = require('../config/sqlite');
const bcrypt = require('bcrypt');

const seedData = async () => {
    console.log('🌱 Sembrando datos de prueba...');
    const tablesToClean = ['asistencia', 'partidos', 'jugadores', 'usuarios', 'equipos'];
    for(const table of tablesToClean) {
        await query(`DELETE FROM ${table};`);
    }
    console.log('🧹 Base de datos limpiada.');

    const passwordHash = await bcrypt.hash('basketball123', 10);
    await query(`INSERT INTO equipos (id, nombre, descripcion) VALUES (1, 'Pre-mini', 'Equipo de 7-9 años'), (2, 'Mini', 'Equipo de 10-12 años'), (3, 'Infantil', 'Equipo de 13-15 años');`);
    await query(`INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES ('Admin Entrenador', 'entrenador@basketball.com', ?, 'entrenador'), ('Padre Ejemplo', 'padre@ejemplo.com', ?, 'padre');`, [passwordHash, passwordHash]);
    await query(`INSERT INTO jugadores (nombre, email_padre, equipo_id, numero_camiseta) VALUES ('Jugador Uno', 'padre@ejemplo.com', 1, 10), ('Jugador Dos', 'padre@ejemplo.com', 2, 20);`);
    console.log('✅ Datos de prueba insertados.');
};

if (require.main === module) {
    createConnection();
    seedData().catch(err => console.error(err));
}
