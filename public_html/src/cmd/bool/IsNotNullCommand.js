class IsNotNullCommand extends BooleanCommand {

    constructor() {
        super('EXISTS');
    }

    isTrue = function (caller) {

        if (this.length() < 1) {
            throw 'Insufficent argument count exception!'
        }
        var base = this.at(0).getValue();


        return genUtils.isNull(base) !== true;
    }
}