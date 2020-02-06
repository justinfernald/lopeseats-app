export default class StateListener {

    callbacks;

    constructor() {
        this.callbacks = [];
    }

    addListener(callback) {
        var index = this.callbacks.length;
        this.callbacks.push(callback);
        console.log("Registered state listener " + index);
        return index;
    }

    removeListener(id) {
        this.callbacks.splice(id, 1);
    }

    updateState(state) {
        console.log(this.callbacks);
        for (var i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i]();
        }
    }

}