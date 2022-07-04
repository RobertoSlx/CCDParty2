const { createProxyMiddleware } = require('http-proxy-middleware');

// Crear el middleware
module.exports = function(app) {
  app.use(createProxyMiddleware
    ('/api',{
      target: 'http://localhost:3006/',
      changeOrigin: true,
    })
  );
};