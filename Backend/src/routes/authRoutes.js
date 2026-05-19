const express = require('express');

const { loginLimiter } = require('../middlewares/securityMiddleware');

const {
  register,
  login,
  profile
} = require('../controllers/authController');

const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', loginLimiter, login);
router.get('/profile', authMiddleware, profile);

module.exports = router;