class ServerControlModule extends BaseModule {

    constructor(terminal, source, session, password) {
        super('SERVER');
        this.source = source;
        this.encryption = new EncryptionModule(this, this.source);
        this.session = session;
        this.terminal = terminal;
        this.password = md5(password);
        this.currentDB = '';




    }

    setCurrentDB = function (toSet) {
        this.currentDB = toSet;

    }

    getCurrentDB = function () {
        return this.currentDB;
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
        var ret = this.getTerminal().printText(msg);
        return ret;

    }

    printBusyText = function (msg) {
        return this.getTerminal().printBusyText(msg);
    }

    getUser = function () {
        return this.getTerminal().getServerUser();
    }

    getPassword = function () {
        return this.getTerminal().getSecretText();
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

            this.printText(output.value);
            return;
        }

        if (output.type === 'TABLE') {

            var cols = output.cols;
            var rows = output.rows;
            if (Array.isArray(cols) !== true) {
                cols = [cols];
            }
            var table = new TextTable(cols);

            for (var row = 0; row < rows.length; row++) {
                for (var col = 0; col < rows[row].length; col++) {
                    var cell = rows[row][col];
                    table.setCell(row, col, cell);

                }
            }
            this.getTerminal().printTable(table);
            return;
        }



        if (output.type === 'TEXT_LIST') {

            var value = output.value;
            for (var index = 0; index < value.length; index++) {

                this.printText(value[index]);
            }
            return;
        }






        if (output.type === 'ERROR') {
            this.printErrorText(output.value);

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

    printHelp = function () {

        this.printText('');
        this.printText('***SERVER COMMAND MODULE INSTRUCTIONS***');

        this.printText('This module is used for communication to a server.');
        this.printText('Several different commands are listed below.');
        this.printText('');
        this.printText('SQL COMMANDS');
        this.printText('SQL_TABLE_LIST [db name]');
        this.printText('SQL_TABLE_DUMP [db name] [table name OR *');
        this.printText('SQL_CMD [db name] [sql command]');


    }

}