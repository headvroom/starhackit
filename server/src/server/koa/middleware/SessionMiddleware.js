const session = require("koa-generic-session");
const redisStore = require("koa-redis");

export default function(app, koaApp, config) {
  let log = require("logfilename")(__filename);

  //TODO use secret from config
  koaApp.keys = ["your-super-session-secret"];
  const redisConfig = config.redis;
  if (app.store.client()) {
    log.debug("middlewareInit use redis ", redisConfig);
    koaApp.use(
      session({
        store: redisStore(app.store.client())
      })
    );
  } else {
    log.debug("middlewareInit memory session ");
    koaApp.use(session());
  }
}
