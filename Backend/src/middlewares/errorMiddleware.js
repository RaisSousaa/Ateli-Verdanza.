const { ZodError } = require('zod');

function errorMiddleware(error, req, res, next) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Erro de validação.',
      errors: error.errors.map(err => ({
        campo: err.path.join('.'),
        mensagem: err.message
      }))
    });
  }

  console.error('Erro interno:', error);

  return res.status(500).json({
    message: 'Erro interno do servidor.'
  });
}

module.exports = {
  errorMiddleware
};