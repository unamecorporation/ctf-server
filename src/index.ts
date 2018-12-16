import APIs from './api';
import Routes from './utils/Routes';
import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import http from 'http';
import io from 'socket.io';
import graphqlServer from './graphql';
import WebSocket from './sockets/WebSocket';
import Http from './utils/Http';
import PlayerAPI from './api/PlayerAPI';
require('dotenv').config();

const port = parseInt(process.env.PORT);
const publicPath = `${__dirname}/public`;

const env = {
  port: port > 2048 ? port : 3000,
};

const app = express();

graphqlServer.applyMiddleware({ app });
/*
  Handlers headers for security
*/
app.use(
  cors(),
  express.json(),
  helmet.noCache(),
  helmet.noSniff(),
  helmet.xssFilter(),
  helmet.frameguard(),
  helmet.hidePoweredBy()
);

/*
  Disable some headers
*/
app.disable('etag');
app.disable('x-powered-by');

/*
  Define routes
*/

app.use('/player', PlayerAPI);
// app.use('/', Router().post('/player/register', (req, res) => res.send('ok')));

/*
  Static route and health check
*/
app.use(express.static(publicPath));
app.use('/health', (req, response) => {
  Http.ok(response, 'ok');
});

const server = new http.Server(app);
export const webSocket = io(server);

app.get('/', (req, res) => res.sendFile(`${publicPath}/index.html`));

server.listen(env.port, function() {
  console.log('listening on 0.0.0.0:3000');
  webSocket.on('connection', (socket) => {
    WebSocket.onEvents(socket);
  });
});
