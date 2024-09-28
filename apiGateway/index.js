const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());
app.use(helmet()); // Add security headers
app.use(morgan("combined"));

const paths = {
    auth: "http://localhost:7070",
    product: "http://localhost:4040",
    order: "http://localhost:5050",
    
};

// Proxy middleware for different services
app.use("/auth", createProxyMiddleware({ target: paths.auth, changeOrigin: true }));
app.use("/product", createProxyMiddleware({ target: paths.product, changeOrigin: true }));
app.use("/order", createProxyMiddleware({ target: paths.order, changeOrigin: true }));


const port = process.env.PORT || 3030;

app.listen(port, () => {
    console.log(`API Gateway is running on port ${port}`);
});
