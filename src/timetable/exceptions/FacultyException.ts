
export class FacultyException implements IException {

    readonly _name: string = "FacultyError"
    readonly _message: string = "getFacultyByName(): faculty not found:"

    constructor(value: string) {
        this.show(value)
    }

    public show(value: string) {
        console.error(`${this._name}: ${this._message} ${value}`)
    }
}