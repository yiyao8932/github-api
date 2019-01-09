'use strict';
import 'babel-polyfill';
import Koa from 'koa';
import attIssuesRoutes from './routes/att-issues.routes';

const app = new Koa();
const PORT = process.env.PORT || 8888;

// att issues router config
app.use(attIssuesRoutes.routes());

const server = app.listen(PORT).on("error", err => {
  console.error(err);
});

console.log('att-issues github api server launched!');

export default server;