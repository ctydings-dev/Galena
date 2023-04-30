class CommandValue {

    constructor(value) {
        this.value = value;

    }

    getValue = function () {
        return this.value;
    }

    isCommand = function () {
        return false;
    }

    isArray = function () {
        return false;


    }

    isQuote = function () {
        return false;
    }

}