class ServerControlModule extends BaseModule {

    constructor(terminal, source, session, password) {
        super('SERVER');
        this.source = source;
        this.encryption = new EncryptionModule(this, this.source);
        this.session = session;
        this.terminal = terminal;
        this.password = md5(password);




    }

    getPassword = function () {
        return this.password;
    }

    clearPassword = function () {
        this.password = null;
    }

    getEncryption = function () {
        return this.encryption;
    }

    getSession = function () {
        return this.session;
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

    processCommand = function (command) {
        var currMode = this.getTerminal().getMode();
        this.getTerminal().setMode(command.mode);

        var prelim = command.preliminaryCommands;
        for (var index = 0; index < prelim.length; index++) {
            this.getTerminal().getTerminal().setInput(prelim[index]);
            this.getTerminal().processCmd();


        }


        var cmds = command.commands;

        for (var index = 0; index < cmds.length; index++) {

            this.getTerminal().getTerminal().setInput(cmds[index]);
            this.getTerminal().processCmd();

        }



        //  this.getTerminal().setMode(currMode);

    }

    processOutput = function (output) {


        if (output.type === 'COMMAND') {

            this.processCommand(output);
            return;
        }
        if (output.type === 'TEXT') {

            this.printText(output.text);
            return;
        }






        alert(output.substring(0, 10));


        this.printErrorText('Unable to handle server response!');
        // this.printText(output);
    }

    execute = function (input) {
        this.executeServerCommand(input);

    }

    executeServerCommand = function (message) {


        this.getEncryption().sendRSACommand(message);


    }

}