const express = require('express');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const { errorMiddleware } = require('./middlewares/errorMiddleware');
const {
  corsOptions,
  helmetOptions
} = require('./middlewares/securityMiddleware');

const app = express();

app.use(helmetOptions);
app.use(corsOptions);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API Ateliê Verdanza funcionando'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use(errorMiddleware);

module.exports = app;