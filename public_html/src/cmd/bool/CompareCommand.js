class CompareCommand extends BooleanCommand {

    constructor(name) {
        super(name);
    }

    compare = function (valueA, valueB, caller) {
        throw 'Unimplmented comparison command.';

    }

    isTrue = function (caller) {

        if (this.length() < 2) {
            throw 'Insufficent argument count exception!'
        }
        var base = this.at(0).getValue();
        for (var index = 1; index < this.length(); index++) {

            if (this.compare(base, this.at(index).getValue(), caller) === false) {
                return false;
            }


        }



        return true;
    }
}