
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
        this.getValue().push(toAdd);
    }

}