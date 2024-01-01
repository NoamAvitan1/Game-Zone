class myFuncObserver {
    constructor(value) {
        this.state = value;
    }
    
    subscriptions = [

    ]

    emit = function(value) {
        this.state = value
        this.subscriptions.map(func => func(value))
    }

    subscribe = function(func) {
        this.subscriptions.push(func)
    }
}

const f1 = () => console.log("f1 is subscribed")
const f2 = () => console.log("f2 is subscribed")
const f3 = () => console.log("f3 is subscribed")
const f4 = () => console.log("f4 is subscribed")

const myFunc = () => {
    console.log("I am the emitter")
}

const MyObserver = new myFuncObserver(myFunc)

MyObserver.subscribe(f1)
MyObserver.subscribe(f2)
MyObserver.subscribe(f3)
MyObserver.subscribe(f4)

MyObserver.emit()

const userFunction = (value) => {
    `div${value}div`
    `div${value}div`
    `div${value}div`
}