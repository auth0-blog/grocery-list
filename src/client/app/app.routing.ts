import {RouterModule} from "@angular/router";

import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {GroceryListComponent} from "./grocery-list/grocery-list.component";
import {AuthenticatedGuard} from "./authenticated.guard";

const APP_ROUTES = [
    { path: '', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'grocery-list', component: GroceryListComponent, canActivate: [AuthenticatedGuard] }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);