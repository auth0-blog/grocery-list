import * as Koa from "koa";
import * as StaticFiles from "koa-static";
import * as BodyParser from "koa-bodyparser";
import ROUTER from "./app.routes";

const CLIENT_FILES = './dev/client/';

const SERVER = new Koa();

// middlewares
SERVER.use(BodyParser());
SERVER.use(StaticFiles(CLIENT_FILES));
SERVER.use(ROUTER.routes());

SERVER.listen(3000);