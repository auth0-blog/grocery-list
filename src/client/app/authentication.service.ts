import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {User} from "../../common/user";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
    private _user: User;

    constructor(private http: Http, private router: Router) { }

    private onAuthenticated(response: any): void {
        this._user = response.json().user;
        localStorage.setItem('token', response.json().token);
        this.router.navigate(['/grocery-list']);
    }

    authenticate(email: string, password: string): Promise<void> {
        return this.http.post('/api/sign-in', { email, password })
            .toPromise()
            .then(response => this.onAuthenticated.call(this, response));
    }

    signUp(user: User): Promise<void> {
        return this.http.post('/api/sign-up', user)
            .toPromise()
            .then(response => this.onAuthenticated.call(this, response));
    }

    user(): User {
        return this._user;
    }
}