import {Component, ViewEncapsulation} from "@angular/core";
import {AuthenticationService} from "./authentication.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = 'Grocery List';
    nonce: string;

    constructor(private authenticationService: AuthenticationService) {
        this.nonce = this.authenticationService.generateNonce();
    }
}