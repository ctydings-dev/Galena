var TerminalSystem = function (canvas, useVerbose) {

    this.terminal = new Terminal(canvas);
    this.verbose = useVerbose;
    this.keySet = new KeySet();

    this.getKeySet = function () {
        return this.keySet;
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
            return;
        }


        this.processKey(value);

    };

    this.processKey = function (key) {

        alert(key.getValue());


    };
    var caller = this;
    window.addEventListener("keydown", function () {
        caller.processDownEvent(event);
    });


};