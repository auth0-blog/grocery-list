import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {Router} from "@angular/router";
import {User} from "../../common/user";
import {JwtHelper, tokenNotExpired} from "angular2-jwt";

@Injectable()
export class AuthenticationService {
    private _user: User;

    constructor(private router: Router) {
    }

    // Helper function that will allow us to extract the access_token and id_token
    getParameterByName(name: string) {
        let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    // Get and store access_token in local storage
    getAccessToken() {
        let accessToken = this.getParameterByName('access_token');
        localStorage.setItem('token', accessToken);
    }

    // Get and store id_token in local storage
    getIdToken() {
        let idToken = this.getParameterByName('id_token');
        localStorage.setItem('id_token', idToken);
        this.decodeIdToken(idToken);
    }

    // Decode id_token to verify the nonce
    decodeIdToken(token: string) {
        let jwtHelper = new JwtHelper();
        let jwt = jwtHelper.decodeToken(token);
        this._user = new User();
        this._user.email = jwt.email;
        this.verifyNonce(jwt.nonce);
    }

    // Function to generate a nonce which will be used to mitigate replay attacks
    generateNonce() {
        let existing = localStorage.getItem('nonce');
        if (existing === null) {
            let nonce = '';
            let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 16; i++) {
                nonce += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            localStorage.setItem('nonce', nonce);
            return nonce;
        }
        return localStorage.getItem('nonce');
    }

    // Verify the nonce once user has authenticated.
    // If the nonce can't be verified we'll log the user out
    verifyNonce(nonce: string) {
        if (nonce !== localStorage.getItem('nonce')) {
            localStorage.removeItem('id_token');
            localStorage.removeItem('token');
        }
        this.router.navigate(['/grocery-list']);
    }

    user(): User {
        return this._user;
    }

    loggedIn() {
        return tokenNotExpired();
    }
}