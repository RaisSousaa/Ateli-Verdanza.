const { productSchema } = require('../validators/productValidator');

let products = [
  {
    id: 1,
    name: 'Pacova',
    description: 'Planta ornamental de folhagem verde, ideal para ambientes internos.',
    category: 'Plantas',
    price: 99.99,
    status: 'em_estoque',
    img: 'resources/images/8754e248f99b5927f030bced0a93fb36.jpg'
  },
  {
    id: 2,
    name: 'Filodendro coração',
    description: 'Planta pendente com folhas em formato de coração, ideal para decoração.',
    category: 'Plantas',
    price: 85,
    status: 'em_estoque',
    img: 'resources/images/d4354dd73462954ef4c1cdf9c8e30fc1.jpg'
  },
  {
    id: 3,
    name: 'Begônia maculata',
    description: 'Planta ornamental com folhas marcantes e aparência sofisticada.',
    category: 'Plantas',
    price: 150,
    status: 'em_estoque',
    img: 'resources/images/f0d31b0b3237e0a5a88f2f86ca38bd6e.jpg'
  },
  {
    id: 4,
    name: 'Suculenta',
    description: 'Planta compacta, resistente e fácil de cuidar.',
    category: 'Plantas',
    price: 319.90,
    status: 'em_estoque',
    img: 'resources/images/90b89e249c82e6dc5cbd5a1f773eaf8c.jpg'
  },
  {
    id: 5,
    name: 'Arranjo floral',
    description: 'Arranjo floral artesanal para decoração e presentes especiais.',
    category: 'Flores',
    price: 150,
    status: 'em_estoque',
    img: 'resources/images/arranjo1.jpg'
  }
];

let nextProductId = 6;

function listProducts(req, res) {
  return res.json({
    message: 'Produtos listados com sucesso.',
    products
  });
}

function getProductById(req, res) {
  const id = Number(req.params.id);

  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      message: 'Produto não encontrado.'
    });
  }

  return res.json({
    message: 'Produto encontrado com sucesso.',
    product
  });
}

function createProduct(req, res, next) {
  try {
    const data = productSchema.parse(req.body);

    const newProduct = {
      id: nextProductId++,
      ...data
    };

    products.push(newProduct);

    return res.status(201).json({
      message: 'Produto cadastrado com sucesso.',
      product: newProduct
    });
  } catch (error) {
    next(error);
  }
}

function updateProduct(req, res, next) {
  try {
    const id = Number(req.params.id);

    const productIndex = products.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      return res.status(404).json({
        message: 'Produto não encontrado.'
      });
    }

    const data = productSchema.parse(req.body);

    products[productIndex] = {
      id,
      ...data
    };

    return res.json({
      message: 'Produto atualizado com sucesso.',
      product: products[productIndex]
    });
  } catch (error) {
    next(error);
  }
}

function deleteProduct(req, res) {
  const id = Number(req.params.id);

  const productExists = products.some((item) => item.id === id);

  if (!productExists) {
    return res.status(404).json({
      message: 'Produto não encontrado.'
    });
  }

  products = products.filter((item) => item.id !== id);

  return res.json({
    message: 'Produto removido com sucesso.'
  });
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

