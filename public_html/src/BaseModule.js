
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
        this.silentMode = false;
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

    /**
     * Returns if the module is in silent mode.
     * @returns {Boolean} If the module is in slient mode.
     */
    isSilent = function () {
        return this.silentMode === true;
    }

    /**
     * Sets the silent mode for the module.
     * @param {Boolean} toSet If the module is to be in silent mode.
     */
    setSilentMode = function (toSet) {

        this.silentMode = toSet === true;

    }

    /**
     * Prints out the text if the silent mode is off.
     * @param {String} toPrint The text to print out.
     */
    printText = function (toPrint) {

        if (this.isSilent() === true) {
            return;
        }

        return    this.getCaller().printText(toPrint);
    }

    /**
     * Prints out the alert text if the silent mode is off.
     * @param {String} toPrint The alert text to print out.
     */
    printAlertText = function (toPrint) {
        if (this.isSilent() === true) {
            return;
        }
        return   this.getCaller().printAlertrText(toPrint);
    }

    /**
     * Prints out the error text if the silent mode is off.
     * @param {String} toPrint The error text to print out.
     */
    printErrorText = function (toPrint) {
        if (this.isSilent() === true) {
            return;
        }
        return  this.getCaller().printErrorText(toPrint);
    }

    /**
     * Prints out the text table if the silent mode is off.
     * @param {String} toPrint The text table to print out.
     */
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

