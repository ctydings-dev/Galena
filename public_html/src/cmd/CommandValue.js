class CommandValue {

    constructor(value) {
        this.value = value;

    }

    isTrue = function () {
        return false;
    }

    getValue = function () {

        return this.value;
    }

    getText = function () {

        try {
            return this.getValue().print();
        } catch (err) {

        }
        return this.value + '';

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

    addToTable = function (table, row, col) {
        table.setCell(row, col, this.getText());


    }

}