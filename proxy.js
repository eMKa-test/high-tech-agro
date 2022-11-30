/* global __dirname */
var path = require("path");
var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

var createProxyMiddleware = proxy.createProxyMiddleware;

const proxyMiddleware = createProxyMiddleware('https://agro.paragraph.red', {
  changeOrigin: true,
});

// noinspection JSCheckFunctionSignatures
app.use("/api", proxyMiddleware);
// noinspection JSCheckFunctionSignatures
app.get("/logout", proxyMiddleware);
// noinspection JSCheckFunctionSignatures
app.post("/login", proxyMiddleware);

app.get("/login", function (req, res) {
  res.sendFile(path.resolve(__dirname, "public_html", "dist", "login.html"));
});

app.use('/', express.static(path.resolve(__dirname, 'public_html')));

app.use('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, "public_html", "dist", "home.html"));
});

app.listen(3000);
