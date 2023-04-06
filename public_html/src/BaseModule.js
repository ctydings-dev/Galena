
class BaseModule {

    constructor(name) {
        this.name = name;
    }
    getName = function () {
        return this.name;
    }
    execute = function () {
        this.getCaller().printText(this.getName() + ' has not been initalized yet!');
    }

}

