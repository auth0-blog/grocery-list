import {Component} from "@angular/core";
import {AuthenticationService} from "../authentication.service";
import {User} from "../../../common/user";

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
    user: User = new User();

    constructor(private authenticationService: AuthenticationService) { }

    signUp(): void {
        this.authenticationService
            .signUp(this.user);
    }
}