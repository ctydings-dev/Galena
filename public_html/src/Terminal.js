
/* global genUtils */

class  Terminal {

    constructor(canvas) {
        this.area = new TerminalArea(canvas);
        this.setup();
    }
    getArea = function () {
        return this.area;
    }
    oldInputs = []
    getOldInputs = function () {
        return this.oldInputs;
    }
    addOldInput = function () {
        var toAdd = this.getInput().trim();

        if (toAdd.length < 1) {
            return;
        }

        this.getOldInputs().push(toAdd);
        while (this.getOldInputs().length > this.getOutputLimit()) {
            this.getOldInputs().shift();
        }

    }
    oldInputIndex = 0;
    getOldInputIndex = function () {
        return this.oldInputIndex;
    }

    setOldInputIndex = function (toSet) {
        if (toSet < 0) {
            this.oldInputIndex = 0;
            return;
        }
        if (toSet >= this.getOldInputs().length) {
            this.oldInputIndex = this.getOldInputs().length - 1;
            return;
        }
        this.oldInputIndex = toSet;

    }

    incrementInputIndex = function () {
        this.setOldInputIndex(this.getOldInputIndex() + 1);
    }

    decrementInputIndex = function () {
        this.setOldInputIndex(this.getOldInputIndex() - 1);
    }

    setOldInput = function () {

        if (this.getOldInputIndex() < 0) {
            return;
        }

        if (this.getOldInputs().length < 1) {
            return;
        }

        this.setInput(this.getOldInputs()[ this.getOldInputs().length - 1 - this.getOldInputIndex()]);
    }

    palette = new TerminalPalette();
    getPalette = function () {
        return this.palette;
    }

    output = [];
    getOutput = function () {
        return this.output;
    }

    blinkTime = 1500;
    blinkGhost = 1000;
    getBlinkTime = function () {
        return this.blinkTime;
    }

    getBlinkGhost = function () {
        return this.blinkGhost;
    }

    lastUpdated = 0;
    getLastUpdated = function () {
        return this.lastUpdated;
    }

    updateTime = function () {
        this.lastUpdated = genUtils.getTime();
    }

    displayCursor = function () {
        var test = genUtils.getTime();
        test = test - this.getLastUpdated();
        if (test <= this.getBlinkGhost())
        {
            return true;
        }

        test = test % this.getBlinkTime();
        return test > this.getBlinkTime() / 2;
    }

    cursor = '_';
    getCursor = function () {
        return this.cursor;
    }

    outputLimit = 50;
    getOutputLimit = function () {
        return this.outputLimit;
    }

    version = '0.0.0';
    getVersion = function () {
        return this.version;
    }

    addSplash = function (clear) {
        if (clear === true) {
            this.clearOutput();
        }
        this.addTextOutput("Welcome to the Galena Terminal System(GTS)");
        this.addTextOutput('(c) 2023 Christopher Tydings');
        this.addTextOutput('Version: ' + this.getVersion() + ' : April 4, 2023');
        this.addTextOutput('');



    }

    getOutputSize = function () {
        return this.getOutput().length;
    }

    addTextOutput = function (text) {
        while (text.length > this.getTextColCount()) {
            var sub = text.substring(0, this.getTextColCount());
            text = text.substring(this.getTextColCount());
            this.addTextOutput(sub);

        }


        var toAdd = {
            value: text,
            getValue: function () {
                return this.value;
            },
            getHeight: function () {
                return 1;
            },
            draw: function (xPos, yPos, area, caller) {
                area.drawText(this.getValue(), xPos, yPos);
            }


        };
        this.addOutput(toAdd);
    }

    getOutputAt = function (index) {

        return this.getOutput()[index];
    }

    addOutput = function (toAdd) {
        this.getOutput().push(toAdd);
        while (this.getOutputSize() > this.getOutputLimit()) {
            this.getOutput().shift();
        }
    }

    clearOutput = function () {

        this.output = [];
    }

    getTextRowCount = function () {

        if (genUtils.isNull(this.textRowCount) === true) {

            this.textRowCount = Math.floor((this.getArea().getHeight() - this.getPalette().getFontHeight() / 2) /
                    this.getPalette().getFontHeight());
        }
        return  this.textRowCount;
    }

    getTextColCount = function () {
        if (genUtils.isNull(this.textColCount) === true) {
            this.textColCount = Math.floor((this.getArea().getWidth() -
                    this.getColStartPosition()) /
                    this.getPalette().getFontWidth());
        }
        return this.textColCount;
    }

    horizontalOffset = 0;
    getHorizontalOffset = function () {
        return this.horizontalOffset;
    }

    setHorizontalOffset = function (toSet) {
        this.updateTime();
        if (genUtils.isInteger(toSet) !== true) {
            throw 'HORIZONTAL INCREMENT MUST BE A POSITIVE INTEGER';
        }

        if (toSet > this.getInputLength()) {
            toSet = this.getInputLength();
        }

        if (toSet < 0) {
            toSet = 0;
        }

        this.horizontalOffset = toSet;
    }

    incrementHorizontalOffset = function () {
        this.setHorizontalOffset(this.getHorizontalOffset() + 1);
    }

    decrementHorizontalOffset = function () {
        this.setHorizontalOffset(this.getHorizontalOffset() - 1);
    }

    verticalOffset = 0;
    getVerticalOffset = function () {
        return this.verticalOffset;
    }

    setVerticalOffset = function (toSet) {
        if (toSet > this.getVerticalOffset()) {
            if (this.vertLock === true) {
                return;
            }
        }

        if (toSet < 0) {
            toSet = 0;
        }
        this.verticalOffset = toSet;
    }

    incrementVerticalOffset = function () {
        this.setVerticalOffset(this.getVerticalOffset() + 1);
    }

    decrementVerticalOffset = function () {
        this.setVerticalOffset(this.getVerticalOffset() - 1);
    }

    input = '';
    getInput = function () {
        return this.input;
    }

    setInput = function (toSet) {

        this.updateTime();
        this.input = toSet;
    }

    clearInput = function () {
        this.addOldInput();
        this.setInput('');
    }

    appendInput = function (toAdd) {



        var loc = this.getHorizontalOffset();
        if (loc === 0) {
            this.setInput(this.getInput() + toAdd);
            return;
        }


        loc = this.getInputLength() - loc;
        var first = this.getInput().substring(0, loc);
        var second = this.getInput().substring(loc);
        var toSet = first + toAdd + second;


        this.setInput(toSet);
    }

    getInputLength = function () {
        return this.getInput().length;
    }

    trimInput = function () {
        var len = this.getInputLength();
        if (len < 1) {
            return;
        }
        if (this.getHorizontalOffset() === 0) {
            var inp = this.getInput().substring(0, len - 1);
            this.setInput(inp);
            return;
        }
        len = this.getHorizontalOffset();
        len = this.getInput().length - len;
        var first = this.getInput().substring(0, len - 1);
        var second = this.getInput().substring(len);
        this.setInput(first + second);

    }

    getRowPosition = function (row) {
        return  Math.floor(this.getPalette().getFontHeight() * row + this.getPalette().getFontHeight() / 2);
    }

    getColStartPosition = function () {
        return this.colStartPosition;
    }

    colStartPosition = 5;
    inputPrefix = '>: ';
    getInputPrefix = function () {
        return this.inputPrefix;
    }

    getFormattedInputLength = function ()
    {


        var ret = this.getInputPrefix().length + this.getInputLength() + 1;
        return ret;
    }

    getCursorInput = function (cursor) {

        var loc = this.getHorizontalOffset();

        if (loc === 0 || cursor.length < 1) {
            var ret = this.getInput() + cursor;
            return ret;
        }
        loc = this.getInputLength() - loc;
        var first = this.getInput().substring(0, loc);
        var second = this.getInput().substring(loc);
        return first + cursor + second;


    }

    getFormattedInput = function () {
        var end = '';
        if (this.displayCursor() === true) {
            end = '_';
        }

        if (this.getFormattedInputLength() > this.getTextColCount()) {

            var start = this.getTextColCount() - this.getInputPrefix().length - 2;
            start = this.getInputLength() - start - this.getHorizontalOffset();
            var sub = this.getCursorInput(end).substring(start);
            return this.getInputPrefix() + sub;

        }



        return this.getInputPrefix() + this.getCursorInput(end);
    }

    vertLock = false;

    getVerticalInputPadding = function () {
        return this.verticalInputPadding;
    }

    verticalInputPadding = 2;
    paint = function () {

        var xPos = 5
        var yPos = 0;

        this.getArea().clear();
        this.getArea().setColor(this.getPalette().getBackgroundColor());
        this.getArea().drawBackground();
        this.getArea().setColor(this.getPalette().getTextColor());
        this.getArea().setFont(this.getPalette().getFont());
        if (this.getOutputSize() > 0) {
            this.vertLock = false;
            var rem = this.getTextRowCount() - this.getVerticalInputPadding();
            var total = rem;
            var index = 0;
            var offset = this.getVerticalOffset();
            var index = this.getOutputSize() - 1 - offset;


            var start = 0;

            while (index >= 0) {
                var len = this.getOutputAt(index).getHeight();
                if (len <= rem) {
                    rem -= len;
                    start = index;

                } else
                {
                    break;
                }
                index--;
            }

            index = start;
            rem = total;
            var counter = 0;
            if (index === 0) {
                this.vertLock = true;
            }
            while (index < this.getOutputSize())
            {
                var len = this.getOutputAt(index).getHeight();

                if (len <= rem) {
                    rem -= len;
                    yPos = this.getRowPosition(counter);
                    this.getOutputAt(index).draw(xPos, yPos, this.getArea(), this);

                } else
                {
                    break;
                }
                counter += len;
                index++;
            }



        }
        yPos = this.getRowPosition(this.getTextRowCount() - 1);
        this.getArea().drawText(this.getFormattedInput(), xPos, yPos);
    }

    setup = function () {
        var caller = this;
        setInterval(function () {
            caller.paint();
        }, 20);
        this.addSplash();
    }
}
