
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

async function create(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Nome, e-mail e senha são obrigatórios.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'A senha deve possuir pelo menos 6 caracteres.'
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'Este e-mail já está cadastrado.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    return res.status(201).json(user);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro interno ao cadastrar usuário.'
    });
  }
}

module.exports = { create };
