export class User {
    public email: string;
    public password: string;
    public name: string;
    public token: string;
    public items: Array<string>;

    public static OnSerialized(instance : User, json : any) : void {
        delete json.password;
        delete json.meta;
    }
}