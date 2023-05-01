class EqualsCommand extends BooleanCommand {

    constructor() {
        super('EQ');
    }

    compare = function (valueA, valueB, caller) {
        return valueA === valueB;

    }
}