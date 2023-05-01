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

    getSource = function () {
        return this.source;
    }
    setSource = function (toSet) {
        this.source = toSet;
    }

    execute = function (caller) {
        if (this.length() < 1) {
            throw 'No boolean condition in statement!';
        }

        var ret = [];

        if (this.isTrue(caller) === false) {
            return ret;
        }



        for (var index = 1; index < this.length(); index++) {
            var child = this.getArg(index);

            if (child.isQuote() === false &&
                    child.isArray() === false) {
                var sub = new JSONValueCommand();
                sub.addArg(child.getValue());

                ret.push(sub.getValue());
            } else {
                child.setSource(this.getSource());

                ret.push(child.getValue(caller));

            }
        }


    }

}