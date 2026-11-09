
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const prisma = require('./prisma');

const usersRoutes = require('./routes/usersRoutes');
const sessionsRoutes = require('./routes/sessionsRoutes');
const mealsRoutes = require('./routes/mealsRoutes');
const metricsRoutes = require('./routes/metricsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/sessions', sessionsRoutes);
app.use('/meals', mealsRoutes);
app.use('/metrics', metricsRoutes);

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      status: 'ok',
      database: 'connected'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      database: 'disconnected'
    });
  }
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
