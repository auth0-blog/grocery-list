import {Exception} from "../common/exception";

export default async (ctx, next) => {
    try {
        return await next();
    } catch (err) {
        if (err instanceof Exception) {
            // it transform the exception to an object literal
            ctx.body = err.toObject();
            ctx.status = err.statusCode;
        } else {
            // unknow error
            ctx.body = { message: 'Unexpected error.' };
            ctx.status = 500;
        }
    }
};
