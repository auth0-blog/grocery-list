export class User {
    public email: string;
    public sub: string;
    public items: Array<string>;

    public static OnSerialized(instance : User, json : any) : void {
        delete json.meta;
    }
}