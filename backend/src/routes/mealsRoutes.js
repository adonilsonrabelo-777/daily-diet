
const express = require('express');
const mealsController = require('../controllers/mealsController');
const auth = require('../middlewares/auth');

const router = express.Router();

// Todas as rotas deste arquivo exigirão autenticação
router.use(auth);

// Cadastrar uma refeição
router.post('/', mealsController.create);
router.get('/', mealsController.list);
router.get('/:id', mealsController.show);
router.put('/:id', mealsController.update);
router.delete('/:id', mealsController.remove);

module.exports = router;
