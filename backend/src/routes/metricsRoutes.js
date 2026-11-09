
const express = require('express');
const metricsController = require('../controllers/metricsController');
const auth = require('../middlewares/auth');

const router = express.Router();

// Exige autenticação para consultar as métricas
router.use(auth);

// Consultar métricas do usuário autenticado
router.get('/', metricsController.index);

module.exports = router;
