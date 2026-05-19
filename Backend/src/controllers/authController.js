const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtSecret, jwtExpiresIn } = require('../config/env');
const { registerSchema, loginSchema } = require('../validators/authValidator');

// Simulação de banco de dados em memória.
// Depois trocamos isso por banco real.
const users = [];

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    jwtSecret,
    {
      expiresIn: jwtExpiresIn
    }
  );
}

async function register(req, res, next) {
  try {
    const data = registerSchema.parse(req.body);

    const userExists = users.find(user => user.email === data.email);

    if (userExists) {
      return res.status(409).json({
        message: 'E-mail já cadastrado.'
      });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const newUser = {
      id: users.length + 1,
      name: data.name,
      email: data.email,
      passwordHash,
      role: 'admin'
    };

    users.push(newUser);

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const data = loginSchema.parse(req.body);

    const user = users.find(user => user.email === data.email);

    if (!user) {
      return res.status(401).json({
        message: 'Credenciais inválidas.'
      });
    }

    const passwordValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!passwordValid) {
      return res.status(401).json({
        message: 'Credenciais inválidas.'
      });
    }

    const token = generateToken(user);

    return res.json({
      message: 'Login realizado com sucesso.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}

function profile(req, res) {
  return res.json({
    message: 'Rota protegida acessada com sucesso.',
    user: req.user
  });
}

module.exports = {
  register,
  login,
  profile
};