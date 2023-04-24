
class BaseModule {

    constructor(name) {
        this.name = name;
        this.introText = '';
        this.activateText = '';
    }
    getName = function () {
        return this.name;
    }
    execute = function () {
        throw  this.getName() + ' has not been initalized yet!';
    }

    hasIntroText = function () {
        return this.getIntroText().length > 0;
    }

    getIntroText = function () {

        return this.introText;

    }

    activate = function (caller) {

    }

    getActivateText = function () {

        return this.activateText;
    }

    hasActivateText = function () {
        return this.getActivateText().length > 0;
    }

}

