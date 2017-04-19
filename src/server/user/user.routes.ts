// routes
import {SINGLETON as UserDAO} from "./user.dao";

export default {
    path: '/api/update-list',
    middleware: async (ctx, next) => {
        let user = UserDAO.findByEmail(ctx.state.user.email);
        user.items = ctx.request.body.items;
        UserDAO.update(user);
        ctx.body = {};
    }
}