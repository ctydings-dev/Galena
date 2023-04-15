var TerminalSystem = function (canvas, useVerbose) {

    this.terminal = new Terminal(canvas);
    this.verbose = useVerbose;
    this.keySet = new KeySet();
    this.systemKey = '!';
    this.mode = null;
    this.modes = [];
    this.verbose = true;
    this.isVerbose = function () {
        return this.verbose === true;
    };
    this.setVerbose = function (toSet) {

        this.verbose = toSet === true;
    };
    this.getModes = function () {
        return this.modes;
    };
    this.addModule = function (toAdd) {

        toAdd.caller = this;
        toAdd.getCaller = function () {
            return this.caller;
        };
        var name = toAdd.getName().trim().toUpperCase();
        this.getModes()[name] = toAdd;
        if (this.hasMode() === false) {
            this.setMode(name);
        }

    };
    this.hasMode = function () {
        return genUtils.isNull(this.getMode()) !== true;
    };
    this.executeModeCommand = function (cmd) {
        if (genUtils.isNull(this.getMode) === true) {
            throw 'No mode has been selected!';
        }
        this.getModes()[this.getMode()].execute(cmd);
    };
    this.getMode = function () {
        return this.mode;
    };
    this.setMode = function (toSet) {
        toSet = toSet + '';
        toSet = toSet.trim().toUpperCase();

        if (genUtils.isNull(this.getModes()[toSet]) === true) {
            throw toSet + ' is not a valid mode!';
        }
        this.mode = toSet;
    };
    this.getSystemKey = function () {
        return this.systemKey;
    };
    this.getKeySet = function () {
        return this.keySet;
    };
    this.paint = function () {
        this.getTerminal().paint();
    };
    this.getTerminal = function () {
        return this.terminal;
    };
    this.appendInput = function (toAppend) {
        this.getTerminal().appendInput(toAppend);
    };
    this.processDownEvent = function (event) {

        var value = this.getKeySet().processDownEvent(event.keyCode);
        if (value.furtherProcess() === false) {
            this.paint();
            return;
        }


        this.processKey(value);
        this.paint();
    };
    this.processUpEvent = function (event) {
        this.getKeySet().processUpEvent(event.keyCode);
        this.paint();
    };
    this.printVerbose = function (toPrint) {
        if (this.isVerbose() === true) {
            this.printText(toPrint);
        }

    };
    this.printText = function (toPrint) {
        this.getTerminal().addTextOutput(toPrint);
    };
    this.processCmd = function () {
        var input = this.getTerminal().getInput();
        input = input.trim();
        if (input.indexOf(this.getSystemKey()) === 0) {

            this.executeSystemCommand(input);
            this.getTerminal().clearInput();
            return;
        }
        try {
            this.executeModeCommand(input);
        } catch (err) {
            this.printText(err);
        }
        this.getTerminal().clearInput();
    };
    this.processKey = function (key) {
        if (key.isBackspace() === true) {

            this.getTerminal().trimInput();
            return;
        }

        if (key.isUp() === true) {

            if (key.isShift() === true) {
                this.getTerminal().incrementInputIndex();
                this.getTerminal().setOldInput();
                return;
            }

            this.getTerminal().incrementVerticalOffset();
            return;
        }

        if (key.isDown() === true) {
            if (key.isShift() === true) {
                this.getTerminal().decrementInputIndex();
                this.getTerminal().setOldInput();
                return;
            }



            this.getTerminal().decrementVerticalOffset();
            return;
        }
        if (key.isLeft() === true) {
            this.getTerminal().incrementHorizontalOffset();
            return;
        }

        if (key.isRight() === true) {
            this.getTerminal().decrementHorizontalOffset();
            return;
        }


        if (key.isEnter() === true) {
            this.processCmd();
            this.getTerminal().setVerticalOffset(0);
            this.getTerminal().setHorizontalOffset(0);
            this.getTerminal().oldInputIndex = -1;
            return;
        }



        this.getTerminal().appendInput(key.getValue());
    };

    this.printTable = function (table) {




    };


    this.printArray = function (toPrint) {


        for (var index = 0; index < toPrint.length; index++) {
            this.printText(toPrint[index] + '');
        }

    };


    this.executeSystemCommand = function (input) {
        this.getTerminal().clearInput();
        if (input.length < 1) {
            this.printText('No command was given!');
            return;
        }
        input = input.substring(1);
        var broken = genUtils.breakupString(input, ' ');
        for (var index in broken) {
            broken[index] = broken[index].trim().toUpperCase();
        }

        if (broken.length < 1) {

            this.printText('No command was given!');
            return;
        }



        if (broken[0] === 'MODE')
        {
            if (broken.length < 2) {
                this.printText('The mode is : ' + this.getMode());

                return;
            }

            var mode = broken[1];
            try {
                this.printVerbose('Setting mode to ' + mode + '.');
                this.setMode(mode);
                return;

            } catch (err) {
                this.printText(err);
            }


            return;
        }

        if (broken[0] === 'CLEAR') {
            this.getTerminal().addSplash(true);
            if (broken[1] === 'ALL') {
                this.getTerminal().clearOutput();
            }


            return;
        }




        this.printText('Command ' + broken[0] +
                ' is not a recognized command!');








    };
    var caller = this;
    window.addEventListener("keydown", function () {
        caller.processDownEvent(event);
    });
    window.addEventListener("keyup", function () {
        caller.processUpEvent(event);
    });
    this.paint();
};