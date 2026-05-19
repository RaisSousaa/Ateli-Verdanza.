const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');

const {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

/*
  Rotas públicas:
  Usadas por index.html, catalogo.html e produto.html.
  Não exigem login.
*/
router.get('/', listProducts);
router.get('/:id', getProductById);

/*
  Rotas protegidas:
  Usadas pelo painel administrativo.
  Exigem JWT.
*/
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;