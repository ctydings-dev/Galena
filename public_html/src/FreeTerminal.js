
/* global genUtils */

class  FreeTerminal {

    constructor(canvas, skipSetup) {
        this.area = new TerminalArea(canvas);
        if (skipSetup !== true) {
            this.setup();
        }
        this.output = {};

        this.cursor = {};
        this.cursor.x = 0;
        this.cursor.y = 0;

    }
    getArea = function () {
        return this.area;
    }

    getOutput = function () {
        return this.output;
    }

    getCursor = function () {
        return this.cursor;
    }

    setup = function () {
        var caller = this;
        setInterval(function () {
            caller.paint();
        }, 20);

    }
}

