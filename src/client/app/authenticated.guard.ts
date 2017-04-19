import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private authenticationService : AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
                Observable<boolean> | Promise<boolean> | boolean {
        if (this.authenticationService.user() != null) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}