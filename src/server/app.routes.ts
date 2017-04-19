import * as Router from "koa-router";
import * as fs from "fs";
import UPDATE_LIST_ROUTE from "./user/user.routes";
import { SIGN_IN, SIGN_UP, SECURED_ROUTES } from "./authentication.routes";

const ROUTER = new Router();

const LOAD_HTML = function() {
    return new Promise(function (resolve, reject) {
        fs.readFile('./dev/client/index.html', {'encoding': 'utf8'}, function (err, data) {
            if(err) return reject(err);
            resolve(data);
        });
    });
};

ROUTER.get(/^\/(.*)(?:\/|$)/, async (ctx, next) => {
    if (ctx.request.url.startsWith("/api")) {
        return next();
    } else {
        ctx.body = await LOAD_HTML();
    }
});

ROUTER.post(SIGN_IN.path, SIGN_IN.middleware);
ROUTER.post(SIGN_UP.path, SIGN_UP.middleware);
ROUTER.post(SECURED_ROUTES.path, SECURED_ROUTES.middleware);

ROUTER.post(UPDATE_LIST_ROUTE.path, UPDATE_LIST_ROUTE.middleware);

export default ROUTER;