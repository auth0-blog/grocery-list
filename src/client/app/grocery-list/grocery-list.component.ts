import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../authentication.service";
import {User} from "../../../common/user";
import {AuthHttp} from "angular2-jwt";
import {Response} from "@angular/http";
import {Observable} from "rxjs";

@Component({
    selector: 'panel-component',
    templateUrl: './grocery-list.component.html',
    styles: [`
        .jumbotron p { font-size: 1em; }
        .jumbotron form { margin-bottom: 1em; }
    `]
})
export class GroceryListComponent implements OnInit {
    private updateList = '/api/update-list';
    private getList = '/api/list';
    newItem: string;

    constructor (private authenticationService: AuthenticationService, private authHttp: AuthHttp) { }

    ngOnInit(): void {
        this.loadList().subscribe(items => this.getUser().items = items);
    }

    private loadList(): Observable<string[]> {
        return this.authHttp.get(this.getList)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    private updateUsersList() {
        this.authHttp.post(this.updateList, this.getUser())
            .subscribe(
                data => this.newItem = null,
                err => console.log(err)
            );
    }

    getItems() : Array<string> {
        return this.getUser().items;
    }

    addItem() : void {
        if (this.newItem && this.newItem.trim() != '') {
            if (!this.getUser().items) {
                this.getUser().items = [];
            }

            this.getUser().items.push(this.newItem);
            this.updateUsersList();
        }
    }

    removeItem(index: number) : void {
        this.getUser().items.splice(index, 1);
        this.updateUsersList();
    }

    private getUser(): User {
        return this.authenticationService.user();
    }
}