import {NgModule, ErrorHandler} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule, HttpModule, FormsModule
    ],
    providers: []
})
export class AppModule { }