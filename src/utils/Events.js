export default class Events {
    static events = {};

    static Register(e, callback) {
        if (!this.events[e]) this.events[e] = [];
        this.events[e].push(callback);
    }

    static Emit(e, data) {
        if (!this.events[e]) return;
        this.events[e].forEach(callback => callback(data));
    }
}