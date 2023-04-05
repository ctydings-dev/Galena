var TerminalSystem = function (canvas, useVerbose) {

    this.terminal = new Terminal(canvas);
    this.verbose = useVerbose;
    this.keySet = new KeySet();

    this.getKeySet = function () {
        return this.keySet;
    };
    this.paint = function () {
        this.getTerminal().paint();
    };

    this.isVerbose = function () {
        return this.verbose === true;
    };

    this.setVerbose = function (value) {
        this.verbose = value === true;
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
    };



    this.processCmd = function () {
        var input = this.getTerminal().getInput();
        this.getTerminal().addTextOutput(input);
        this.getTerminal().clearInput();


    };

    this.processKey = function (key) {
        if (key.isBackspace() === true) {

            this.getTerminal().trimInput();
            return;
        }

        if (key.isUp() === true) {
            this.getTerminal().incrementVerticalOffset();
            return;
        }

        if (key.isDown() === true) {
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
            return;
        }




        this.getTerminal().appendInput(key.getValue());


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