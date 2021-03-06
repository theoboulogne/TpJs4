class Observable {

    constructor() {
        this.rep = [];
    }

    on(eventName, callback) {
        this.rep.push(new Repertory(eventName, callback));
        console.log(callback);
    }

    off(eventName, callback) {
        this.rep.splice(this.rep.findIndex(value => value.eventName == eventName && value.callback == callback), 1);
    }

    trigger(eventName, ...rest) {
        this.nbArg = rest.length;
        let myFunction = this.rep.find(value => value.eventName == eventName && value.callback.length == this.nbArg);
        myFunction.callback(...rest);
    }

}

class Repertory {

    constructor(eventName, callback) {
        this.eventName = eventName;
        this.callback = callback;
    }

}