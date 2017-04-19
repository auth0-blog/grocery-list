export class Exception extends Error {
    private _statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this._statusCode = statusCode;
    }

    get statusCode(): number {
        return this._statusCode;
    }

    toObject(): Object {
        return {
            statusCode: this._statusCode,
            message: this.message
        }
    }
}