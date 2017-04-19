import * as Router from "koa-router";
import * as fs from "fs";

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
        this.body = await LOAD_HTML();
    }
});

export default ROUTER;