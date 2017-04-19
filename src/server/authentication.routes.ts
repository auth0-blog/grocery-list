// routes
import {SINGLETON as UserDAO} from "./user/user.dao";
import {Exception} from '../common/exception';
import { sign, verify } from "jsonwebtoken";
import {Serialize} from "cerialize";

const SUPER_SECRET = 'change-this';

export const SIGN_UP = {
    path: '/api/sign-up',
    middleware: async (ctx, next) => {
        let user = UserDAO.findByEmail(ctx.request.body.email);
        if (user) {
            throw new Exception(401, 'E-mail already registered.');
        }
        UserDAO.insertUser(ctx.request.body);
        user = UserDAO.findByEmail(ctx.request.body.email);
        ctx.body = {
            token: sign(user, SUPER_SECRET),
            user: Serialize(user)
        };
    }
};

export const SIGN_IN = {
    path: '/api/sign-in',
    middleware: async (ctx, next) => {
        let user = UserDAO.findByEmail(ctx.request.body.email);
        if (user && ctx.request.body.password == user.password) {
            ctx.body = {
                token: sign(user, SUPER_SECRET),
                user: Serialize(user)
            };
        } else {
            throw new Exception(401, 'Uknown user');
        }
    }
};

export const SECURED_ROUTES = {
    path: /^\/api\/(.*)(?:\/|$)/,
    middleware: async (ctx, next) => {
        try {
            let token = ctx.request.headers['authorization'];
            ctx.state.user = verify(token.replace('Bearer ', ''), SUPER_SECRET);
            return next();
        } catch (err) {
            throw new Exception(401, 'Uknown user');
        }
    }
};