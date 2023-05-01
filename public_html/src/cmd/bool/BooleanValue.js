class BooleanValue extends CommandValue {
    constructor(value) {
        this.value = value === true;

    }

    isTrue = function () {

        return this.value === true;

    }

}
