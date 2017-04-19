import {Component} from "@angular/core";
import {AuthenticationService} from "../authentication.service";

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html'
})
export class SignInComponent {

    email: string;
    password: string;

    constructor(private authenticationService: AuthenticationService) { }

    signIn(): void {
        this.authenticationService
            .authenticate(this.email, this.password);
    }
}