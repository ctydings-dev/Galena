
/* global genUtils */

var Terminal = function (canvas) {

    this.area = new TerminalArea(canvas);
    this.getArea = function () {
        return this.area;
    };
    this.palette = new TerminalPalette();
    this.getPalette = function () {
        return this.palette;
    };
    this.output = [];
    this.getOutput = function () {
        return this.output;
    };
    this.blinkTime = 1500;
    this.blinkGhost = 1000;
    this.getBlinkTime = function () {
        return this.blinkTime;
    };
    this.getBlinkGhost = function () {
        return this.blinkGhost;
    };
    this.lastUpdated = 0;
    this.getLastUpdated = function () {
        return this.lastUpdated;
    };
    this.updateTime = function () {
        this.lastUpdated = genUtils.getTime();
    };
    this.displayCursor = function () {
        var test = genUtils.getTime();
        test = test - this.getLastUpdated();
        if (test <= this.getBlinkGhost())
        {
            return true;
        }

        test = test % this.getBlinkTime();
        return test > this.getBlinkTime() / 2;
    };
    this.cursor = '_';
    this.getCursor = function () {
        return this.cursor;
    };
    this.outputLimit = 50;
    this.getOutputLimit = function () {
        return this.outputLimit;
    };
    this.version = '0.0.0';
    this.getVersion = function () {
        return this.version;
    };

    this.addSplash = function (clear) {
        if (clear === true) {
            this.clearOutput();
        }
        this.addTextOutput("Welcome to the Galena Terminal System(GTS)");
        this.addTextOutput('(c) 2023 Christopher Tydings');
        this.addTextOutput('Version: ' + this.getVersion() + ' : April 4, 2023');



    };


    this.getOutputSize = function () {
        return this.getOutput().length;
    };
    this.addTextOutput = function (text) {
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
    };
    this.getOutputAt = function (index) {

        return this.getOutput()[index];
    };
    this.addOutput = function (toAdd) {
        this.getOutput().push(toAdd);
        while (this.getOutputSize() > this.getOutputLimit()) {
            this.getOutput().shift();
        }
    };
    this.clearOutput = function () {
        this.output = [];
    };
    this.getTextRowCount = function () {

        if (genUtils.isNull(this.textRowCount) === true) {

            this.textRowCount = Math.floor((this.getArea().getHeight() - this.getPalette().getFontHeight() / 2) /
                    this.getPalette().getFontHeight());
        }
        return  this.textRowCount;
    };
    this.getTextColCount = function () {
        if (genUtils.isNull(this.textColCount) === true) {
            this.textColCount = Math.floor((this.getArea().getWidth() -
                    this.getColStartPosition()) /
                    this.getPalette().getFontWidth());
        }
        return this.textColCount;
    };
    this.horizontalOffset = 0;
    this.getHorizontalOffset = function () {
        return this.horizontalOffset;
    };
    this.setHorizontalOffset = function (toSet) {

        if (genUtils.isInteger(toSet) !== true) {
            throw 'HORIZONTAL INCREMENT MUST BE A POSITIVE INTEGER';
        }

        if (toSet > this.getOutputSize()) {
            toSet = this.getOutputSize();
        }

        if (toSet < 0) {
            toSet = 0;
        }

        this.horizontalOffset = toSet;
    };
    this.incrementHorizontalOffset = function () {
        this.setHorizontalOffset(this.getHorizontalOffset() + 1);
    };
    this.decrementHorizontalOffset = function () {
        this.setHorizontalOffset(this.getHorizontalOffset() - 1);
    };
    this.verticalOffset = 0;
    this.getVerticalOffset = function () {
        return this.verticalOffset;
    };
    this.setVerticalOffset = function (toSet) {
        if (toSet > this.getVerticalOffset()) {
            if (this.vertLock === true) {
                return;
            }
        }

        if (toSet < 0) {
            toSet = 0;
        }
        this.verticalOffset = toSet;
    };
    this.incrementVerticalOffset = function () {
        this.setVerticalOffset(this.getVerticalOffset() + 1);
    };
    this.decrementVerticalOffset = function () {
        this.setVerticalOffset(this.getVerticalOffset() - 1);
    };
    this.input = '';
    this.getInput = function () {
        return this.input;
    };
    this.setInput = function (toSet) {

        this.updateTime();
        this.input = toSet;
    };
    this.clearInput = function () {
        this.setInput('');
    };
    this.appendInput = function (toAdd) {
        this.setInput(this.getInput() + toAdd);
    };
    this.getInputLength = function () {
        return this.getInput().length;
    };
    this.trimInput = function () {
        var len = this.getInputLength();
        if (len < 1) {
            return;
        }
        var inp = this.getInput().substring(0, len - 1);
        this.setInput(inp);
    };
    this.getRowPosition = function (row) {
        return  Math.floor(this.getPalette().getFontHeight() * row + this.getPalette().getFontHeight() / 2);
    };
    this.getColStartPosition = function () {
        return this.colStartPosition;
    };
    this.colStartPosition = 5;
    this.inputPrefix = '>: ';
    this.getInputPrefix = function () {
        return this.inputPrefix;
    };
    this.getFormattedInputLength = function ()
    {


        var ret = this.getInputPrefix().length + this.getInputLength() + 1;
        return ret;
    };

    this.getCursorInput = function (cursor) {

        var loc = this.getHorizontalOffset();

        if (loc === 0 || cursor.length < 1) {
            var ret = this.getInput() + cursor;
            return ret;
        }

        var first = this.getInput().substring(0, loc);
        var second = this.getInput().substring(loc);
        return first + cursor + second;


    };

    this.getFormattedInput = function () {
        var end = '';
        if (this.displayCursor() === true) {
            end = '_';
        }
        var len = this.getFormattedInputLength();
        if (this.getFormattedInputLength() > this.getTextColCount()) {

            var start = this.getTextColCount() - this.getInputPrefix().length - 2;
            start = this.getInputLength() - start;
            var sub = this.getCursorInput(end).substring(start);
            return this.getInputPrefix() + sub;

        }



        return this.getInputPrefix() + this.getCursorInput(end);
    };
    this.vertLock = false;

    this.paint = function () {

        var xPos = 5
        var yPos = 0;

        this.getArea().clear();
        this.getArea().setColor(this.getPalette().getBackgroundColor());
        this.getArea().drawBackground();
        this.getArea().setColor(this.getPalette().getTextColor());
        this.getArea().setFont(this.getPalette().getFont());
        if (this.getOutputSize() > 0) {
            this.vertLock = false;
            var rem = this.getTextRowCount() - 3;
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
    };
    var caller = this;
    setInterval(function () {
        caller.paint();
    }, 20);
    this.addSplash();
};