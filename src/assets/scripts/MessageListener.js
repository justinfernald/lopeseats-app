export default class MessageListener {

    callbacks;

    constructor() {
        this.callbacks = [];
    }

    addListener(callback) {
        var index = this.callbacks.length;
        this.callbacks.push(callback);
        console.log("Registered message listener " + index);
        return index;
    }

    removeListener(id) {
        this.callbacks.splice(id, 1);
    }

    messageReceived(state) {
        console.log(this.callbacks);
        for (var i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i]();
        }
    }

}