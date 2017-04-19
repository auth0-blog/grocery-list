import { ErrorHandler } from "@angular/core";

import { Exception } from '../../common/exception';

export class GlobalErrorHandler implements ErrorHandler {
    handleError(error : any) {
        if (error.rejection && typeof error.rejection.json == 'function') {
            let myErrorObj: Exception = error.rejection.json();
            alert(myErrorObj.statusCode + ': ' + myErrorObj.message);
        } else {
            console.log(error);
        }
    }
}