const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { frontendUrl } = require('../config/env');

const corsOptions = cors({
  origin: frontendUrl,
  credentials: true
});

const helmetOptions = helmet();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: 'Muitas tentativas de login. Tente novamente em alguns minutos.'
  }
});

module.exports = {
  corsOptions,
  helmetOptions,
  loginLimiter
};