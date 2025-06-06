const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://api.energy-charts.info/price',
            changeOrigin: true,
            followRedirects: true
        })
    );
};