import {Exception} from "../common/exception";

export default async (ctx, next) => {
    try {
        return next();
    } catch (err) {
        if (err instanceof Exception) {
            // it transform the exception to an object literal
            this.body = err.toObject();
            this.status = err.statusCode;
        } else {
            // unknow error
            this.body = { message: 'Unexpected error.' };
            this.status = 500;
        }
    }
};