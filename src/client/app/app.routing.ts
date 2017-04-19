import {RouterModule} from "@angular/router";

import {GroceryListComponent} from "./grocery-list/grocery-list.component";
import {AuthenticatedGuard} from "./authenticated.guard";
import {CallbackComponent} from "./callback.component";

const APP_ROUTES = [{
    path: 'grocery-list',
    component: GroceryListComponent,
    canActivate: [AuthenticatedGuard]
}, {
    path: 'callback',
    component: CallbackComponent,
}];

export const Routing = RouterModule.forRoot(APP_ROUTES);