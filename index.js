const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3999;
const HOST = "localhost";
const NODE_1 = "http://btc-mocknet.dlc.link";
const NODE_2 = "http://34.239.248.83";

// Logging
app.use(morgan('dev'));

// Proxy endpoints
app.use('/', createProxyMiddleware({
    target: NODE_1,
    changeOrigin: true,
    router: {
      'localhost:3999' : NODE_1 + ':3999',
      'localhost:8000' : NODE_1 + ':8000',
      'localhost:3004' : NODE_2 + ':3004',
    }
}));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

app.listen(3004, HOST, () => {

});

app.listen(8000, HOST, () => {

});