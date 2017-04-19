import * as Router from "koa-router";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";
// updating import from user.routes
import {UPDATE_LIST, GET_LIST} from "./user/user.routes";
let jwks = require('jwks-rsa');
let request = require('request');


const client = jwks({
    jwksUri: 'https://bkrebs.auth0.com/.well-known/jwks.json'
});

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

const VERIFY_JWT = function(ctx, kid, token) {
    return new Promise(function (resolve) {
        client.getSigningKey(kid, (err, key) => {
            let signingKey = key.publicKey || key.rsaPublicKey;
            let accessKey = jwt.verify(token, signingKey);
            ctx.state.user = {
                sub: accessKey.sub
            };
            resolve();
        });
    });
};

ROUTER.all(/^\/api\/(.*)(?:\/|$)/, async (ctx, next) => {
    if (! ctx.request.headers.authorization) {
        ctx.status = 401;
        return ctx.body = {
           message: 'Unauthorized'
        };
    }
    let token = ctx.request.headers.authorization.replace('Bearer ', '');
    let kid = jwt.decode(token, {complete: true}).header.kid;

    await VERIFY_JWT(ctx, kid, token);
    return next();
});

ROUTER.post(UPDATE_LIST.path, UPDATE_LIST.middleware);
// adding the new '/api/list' endpoint
ROUTER.get(GET_LIST.path, GET_LIST.middleware);

export default ROUTER;