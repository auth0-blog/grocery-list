import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
    template: `<h1>oi</h1>`
})
export class CallbackComponent {

    constructor(private authService: AuthenticationService) {
        this.authService.getIdToken();
        this.authService.getAccessToken();
    }
}