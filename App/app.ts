// custom env variables setup
const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, 'env');
const i18n = require('i18n');
i18n.configure({
  locales: ['en', 'es'],
  directory: `${__dirname}/locales`,
});

// logging middleware
const blackList = ['/health'];
const logCtx = async (ctx: any, next: any) => {
  if (blackList.includes(ctx.request.url)) {return await next(); }
  console.log('logCtx method & URL: ', ctx.request.method, ctx.request.url, '\nlogCtx query: ', ctx.request.query, '\nlogCtx reqBody: ', ctx.request.body);
  await next();
};

const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const responseTime = require('koa-response-time');
const helmet = require('koa-helmet');
const session = require('koa-session');
import { sessionConfig } from './sessionConfig';
import { publicRoutes, routes, adminRoutes } from './routes';

import { firstMW } from '../Middleware/firstMW';
import * as Koa from 'koa';


// server setup
const app = new Koa();
app.use(cors());
app.use(bodyParser({jsonLimit: '50mb'}));
app.use(logCtx);
app.use(responseTime({ hrtime: true }));
app.keys = ["topsecret"];
app.use(session(sessionConfig, app));
app.use(firstMW);
app.use(publicRoutes.routes());
app.use(routes.routes());
app.use(adminRoutes.routes());
app.use(helmet());
app.use(i18n.init);

app.listen(process.env.PORT || 8081);
console.log(`Server running on port ${process.env.PORT || 8081}`);