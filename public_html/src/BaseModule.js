
class BaseModule {

    /**
     *
     * @param {type} name The name of the module.
     * @returns {BaseModule}
     */
    constructor(name) {
        this.name = name;
        this.introText = '';
        this.activateText = '';
        this.silentMode = true;
    }
    /**
     * Returns the name of the module.
     * @returns {type} The name of the module.
     */
    getName = function () {
        return this.name;
    }

    /**
     * TO BE IMPLEMENTED!!!
     * Executes the command in the module.
     * @param {type} cmd The command to be executed.
     */
    execute = function (cmd) {
        throw  this.getName() + ' has not been initalized yet!';
    }

    /**
     * Returns if the module has intro text.
     * @returns {Boolean} If the module has intro text.
     */
    hasIntroText = function () {
        return this.getIntroText().length > 0;
    }

    /**
     * Returns the intro text for the module.
     * @returns {String} The intro text.
     */
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

    isSilent = function () {
        return this.silentMode === true;
    }

    setSilentMode = function (toSet) {

        this.silentMode = toSet === true;

    }

    printText = function (toPrint) {

        if (this.isSilent() === true) {
            return;
        }

        this.getCaller().printText(toPrint);
    }

    printAlertText = function (toPrint) {
        if (this.isSilent() === true) {
            return;
        }
        this.getCaller().printAlertrText(toPrint);
    }

    printErrorText = function (toPrint) {
        if (this.isSilent() === true) {
            return;
        }
        this.getCaller().printErrorText(toPrint);
    }

    printTable = function (toPrint) {
        if (this.isSilent() === true) {
            return;
        }
        this.getCaller().printTable(toPrint);
    }

    /**
     *
     * Prints the text for the module.
     */
    printHelp = function () {

        this.getCaller().printErrorText('No help for ' + this.getName()
                + ' has been added.');


    }

}

