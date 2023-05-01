class Command extends CommandArray {

    constructor(name) {


        super();
        this.name = name;
    }

    addArg = function (toAdd) {
        this.getArgs().push(toAdd);
    }

    getArgs = function () {
        return this.value;
    }

    getArg = function (index) {
        if (index < 0 || index >= this.length()) {
            throw 'Out of bounds index!';
        }

        return this.getArgs()[index];
    }

    getName = function () {
        return this.name;
    }

    at = function (index) {
        return this.getArg(index);
    }

    isBoolean = function () {

        return false;
    }

    getValue = function (caller) {
        return this.execute(caller);
    }

    execute = function (caller) {
        throw 'Not yet implemented!';
    }

}