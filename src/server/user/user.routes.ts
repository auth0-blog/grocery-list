// routes
import {SINGLETON as UserDAO} from "./user.dao";

export const UPDATE_LIST = {
    path: '/api/update-list',
    middleware: async ctx => {
        let user = UserDAO.findBySubject(ctx.state.user.sub);
        user.items = ctx.request.body.items;
        UserDAO.update(user);
        ctx.body = {};
    }
};

export const GET_LIST = {
    path: '/api/list',
    middleware: async (ctx, next) => {
        let user = UserDAO.findBySubject(ctx.state.user.sub);
        if (!user) {
            // new users must be persisted before being able to fill data
            user = {
                sub: ctx.state.user.sub,
                items: []
            };
            UserDAO.insertUser(user);
        }
        ctx.body = user.items;
        console.log('next');
        return next();
    }
};