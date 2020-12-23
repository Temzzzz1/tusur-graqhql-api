
interface IException {
    readonly _name: string,
    readonly _message: string,
    show(value: string): void
}