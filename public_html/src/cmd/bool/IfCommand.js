class IfCommand extends BooleanCommand {

    constructor() {
        super('IF');
    }

    isTrue = function (caller) {

        if (this.at(0).getValue() === true) {
            return true;
        }
        return false;

    }

    execute = function (caller) {
        if (this.length() < 1) {
            throw 'No boolean condition in statement!';
        }

        var ret = [];

        if (this.isTrue(caller) === false) {
            return ret;
        }


        for (var index = 1; index < this.length; index++) {

            ret.push(this.getArg(index).getValue(caller));


        }


    }

}