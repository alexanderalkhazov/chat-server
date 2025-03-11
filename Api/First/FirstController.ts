import bodyParser = require('koa-bodyparser');
import { FirstService } from './FirstService';

export const FirstController = (router: any) => {
  router.post('/login/authenticate', bodyParser(), authenticate);
};

export const authenticate = async (ctx: any) => {
  const {email, password} = ctx.request.body;
  if (!email || !password) {
    ctx.body = JSON.stringify({ success: false, msg: 'missing mandatory parameters' } );
    ctx.status = 400;
  } else {
    try {
      const { success, msg, data } = await new FirstService().authenticate(email, password);
      if (success) {
        ctx.body = JSON.stringify({ success, msg, data });
        ctx.status = 200;
      } else {
        ctx.body = JSON.stringify({ success, msg });
        ctx.status = 500;
      }
    } catch (ex) {
      ctx.body = JSON.stringify({ success: false, msg: 'server error' } );
      ctx.status = 500;
    }
  }
};
