export default class TypeUtils {
    static isPromise<T>(value: T | Promise<T>): value is Promise<T> {
        return (value as Promise<T>).then !== undefined;
    }
}
