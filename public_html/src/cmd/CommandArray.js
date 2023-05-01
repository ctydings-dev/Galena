
class CommandArray extends  CommandValue
{

    constructor() {
        super([]);

    }

    isArray = function () {
        return true;


    }

    length = function () {
        return this.getValue().length;
    }

    at = function (index) {
        index = Number(index);
        if (index < 0 || index >= this.length()) {
            throw 'Index ' + index + ' is out of bounds!';
        }

        return this.getValue()[index];
    }

    push = function (toAdd) {

        if (genUtils.isNull(toAdd) === true) {

            this.value.push(toAdd);
            return;
        }

        if (genUtils.isNull(toAdd.value) === true) {

            toAdd = new CommandValue(toAdd);

        }


        this.value.push(toAdd);
    }

}