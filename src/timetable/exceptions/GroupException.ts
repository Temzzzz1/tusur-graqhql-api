
export class GroupException implements IException {

    readonly _name: string = "GroupError"
    readonly _message: string = "getByGroudId(): group not found: "

    constructor(value: string) {
        this.show(value)
    }

    public show(value: string) {
        console.error(`${this._name}: ${this._message} ${value}`) 
    }
}