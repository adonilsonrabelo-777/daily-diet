
const prisma = require('../prisma');

async function index(req, res) {
  try {
    // Busca todas as refeições do usuário autenticado
    const meals = await prisma.meal.findMany({
      where: {
        userId: req.userId
      },
      orderBy: {
        date: 'asc'
      },
      select: {
        isOnDiet: true
      }
    });

    // Calcula as quantidades
    const total = meals.length;

    const mealsOnDiet = meals.filter(
      meal => meal.isOnDiet
    ).length;

    const mealsOffDiet = total - mealsOnDiet;

    // Calcula a melhor sequência consecutiva dentro da dieta
    let currentSequence = 0;
    let bestSequence = 0;

    for (const meal of meals) {
      if (meal.isOnDiet) {
        currentSequence++;

        if (currentSequence > bestSequence) {
          bestSequence = currentSequence;
        }
      } else {
        currentSequence = 0;
      }
    }

    return res.status(200).json({
      total,
      mealsOnDiet,
      mealsOffDiet,
      bestSequence
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro interno ao calcular métricas.'
    });
  }
}

module.exports = { index };
