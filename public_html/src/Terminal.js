
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

    this.outputLimit = 50;
    this.getOutputLimit = function () {
        return this.outputLimit;
    };

    this.getOutputSize = function () {
        return this.getOutput().length;
    };

    this.addTextOutput = function (text) {
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


        }

        this.appendInput(toAdd);

    };




    this.addOutput = function (toAdd) {
        this.getOutput().push(toAdd);

        while (this.getOutputSize() > this.getOutputLimit()) {
            this.getOutput().shift();
        }
    };

    this.getTextRowCount = function () {

        if (genUtils.isNull(this.textRowCount) === true) {

            this.textRowCount = this.getArea().getHeight() / this.getPalette().getTextHeight();
        }
        return  this.textRowCount;
    };

    this.getTextColCount = function () {
        if (genUtils.isNull(this.textColCount) === true) {
            this.textColCount = this.getArea().getWidth() / this.getPalette().getTextWidth();
        }
        return this.textColCount;

    };

    this.horizontalOffset = 0;

    this.getHorizontalOffset = function () {
        return this.horizontalOffset;
    };

    this.setHorizontalOffset = function (toSet) {

        if (genUtils.isInteger(toSe) !== true) {
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




    this.input = '';
    this.getInput = function () {
        return this.input;
    };
    this.setInput = function (toSet) {
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






};