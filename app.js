const express = require("express");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});
const app = express();

app.use((req, res, next) => {
  console.log("Request", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  console.log("Request", req.method, req.url);
  //Respond
  res.send("Hello World");
  proxy.web(req, res, { target: `${req.protocol}://${req.hostname}` });
});

app.listen(3000, () => console.log("Application started on port 3000"));
