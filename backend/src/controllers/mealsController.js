
const prisma = require('../prisma');

async function create(req, res) {
  try {
    const { name, description, date, isOnDiet } = req.body;

    // Verifica se todos os campos obrigatórios foram informados
    if (
      !name ||
      !description ||
      !date ||
      typeof isOnDiet !== 'boolean'
    ) {
      return res.status(400).json({
        message: 'Nome, descrição, data e situação da dieta são obrigatórios.'
      });
    }

    // Verifica se a data é válida
    const mealDate = new Date(date);

    if (isNaN(mealDate.getTime())) {
      return res.status(400).json({
        message: 'Data inválida.'
      });
    }

    // Cria a refeição vinculada ao usuário autenticado
    const meal = await prisma.meal.create({
      data: {
        name,
        description,
        date: mealDate,
        isOnDiet,
        userId: req.userId
      }
    });

    return res.status(201).json(meal);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro interno ao cadastrar refeição.'
    });
  }
}

module.exports = { create, list, show, update, remove };

async function list(req, res) {
  try {
    const meals = await prisma.meal.findMany({
      where: {
        userId: req.userId
      },
      orderBy: {
        date: 'desc'
      }
    });

    return res.status(200).json(meals);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro interno ao listar refeições.'
    });
  }
}

async function show(req, res) {
  try {
    const { id } = req.params;

    const meal = await prisma.meal.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!meal) {
      return res.status(404).json({
        message: 'Refeição não encontrada.'
      });
    }

    return res.status(200).json(meal);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro interno ao buscar refeição.'
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { name, description, date, isOnDiet } = req.body;

    // Verifica se a refeição pertence ao usuário autenticado
    const existingMeal = await prisma.meal.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!existingMeal) {
      return res.status(404).json({
        message: 'Refeição não encontrada.'
      });
    }

    // Valida os campos enviados
    if (
      !name ||
      !description ||
      !date ||
      typeof isOnDiet !== 'boolean'
    ) {
      return res.status(400).json({
        message: 'Nome, descrição, data e situação da dieta são obrigatórios.'
      });
    }

    const mealDate = new Date(date);

    if (isNaN(mealDate.getTime())) {
      return res.status(400).json({
        message: 'Data inválida.'
      });
    }

    const updatedMeal = await prisma.meal.update({
      where: { id },
      data: {
        name,
        description,
        date: mealDate,
        isOnDiet
      }
    });

    return res.status(200).json(updatedMeal);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro interno ao atualizar refeição.'
    });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;

    // Verifica se a refeição pertence ao usuário autenticado
    const existingMeal = await prisma.meal.findFirst({
      where: {
        id,
        userId: req.userId
      }
    });

    if (!existingMeal) {
      return res.status(404).json({
        message: 'Refeição não encontrada.'
      });
    }

    await prisma.meal.delete({
      where: { id }
    });

    return res.status(200).json({
      message: 'Refeição excluída com sucesso.'
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro interno ao excluir refeição.'
    });
  }
}
