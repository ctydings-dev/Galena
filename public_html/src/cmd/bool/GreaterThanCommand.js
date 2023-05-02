class GreaterThanCommand extends BooleanCommand {

    constructor() {
        super('LD');
    }

    compare = function (valueA, valueB, caller) {
        return valueA > valueB;

    }
}