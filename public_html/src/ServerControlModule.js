class ServerControlModule extends BaseModule {

    constructor(terminal, source, session) {
        super('SERVER');
        this.source = source;
        this.encryption = new EncryptionModule(this, this.source);
        this.session = session;
        this.terminal = terminal;




    }

    getEncryption = function () {
        return this.encryption;
    }

    getSession = function () {
        return this.getTerminal().getServerAddress();
    }

    printText = function (msg) {
        this.getTerminal().printText(msg);
    }

    getTerminal = function ()
    {
        return this.terminal;
    }

    printErrorText = function (msg) {
        this.getTerminal().printErrorText(msg);
    }

    executeSystemCommand = function (broken, orig) {



    }

    processOutput = function (output) {
        if (output.isString === true) {
            this.printText(output.value);
            return;
        }


        this.printText(output);
    }

    executeServerCommand = function (message) {


        this.getEncryption().sendRSACommand(message);


    }

}