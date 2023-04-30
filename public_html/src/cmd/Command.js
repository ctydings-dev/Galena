class Command extends CommandValue {

    constructor() {


        super();
        this.name = name;
    }

    addArg = function (toAdd) {
        this.getValue().push(toAdd);
    }

    getName = function () {
        return this.name;
    }

}