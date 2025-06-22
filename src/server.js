require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const equipoRoutes = require('./routes/equipoRoutes');
const jugadorRoutes = require('./routes/jugadorRoutes');
const partidoRoutes = require('./routes/partidoRoutes');
const asistenciaRoutes = require('./routes/asistenciaRoutes');

const app = express();

app.use(helmet());
app.use(cors({ origin: config.server.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.server.env === 'development') {
  app.use(morgan('dev'));
}

app.get('/api', (req, res) => res.json({ message: 'API del Backend de Basketball Asistencia', version: '1.0.0' }));
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

app.use('/api/auth', authRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/api/jugadores', jugadorRoutes);
app.use('/api/partidos', partidoRoutes);
app.use('/api/asistencia', asistenciaRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en modo ${config.server.env} en el puerto ${PORT}`);
});
