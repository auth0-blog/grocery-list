import * as Koa from "koa";
import * as StaticFiles from "koa-static";
import * as BodyParser from "koa-bodyparser";
import ROUTER from "./app.routes";
import exceptionHandler from "./exception-handler.middleware";
// import LokiJS and UserDAO
import * as Lokijs from "lokijs";
import {SINGLETON as UserDAO} from "./user/user.dao";

const DB = new Lokijs('klan-database.json', {
    autosave: true
});

UserDAO.configure(DB);

const CLIENT_FILES = './dev/client/';

const SERVER = new Koa();

// middlewares
SERVER.use(BodyParser());
SERVER.use(StaticFiles(CLIENT_FILES));
// make Koa server use the middleware
SERVER.use(exceptionHandler);
SERVER.use(ROUTER.routes());

SERVER.listen(3000);
