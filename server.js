const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('datab.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 2000;

server.use(middlewares);
server.use(router);

server.listen(port);