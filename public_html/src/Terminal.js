
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


        };

        this.appendInput(toAdd);

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

    this.getTextRowCount = function () {

        if (genUtils.isNull(this.textRowCount) === true) {

            this.textRowCount = Math.floor(this.getArea().getHeight() / this.getPalette().getFontHeight());
        }
        return  this.textRowCount;
    };

    this.getTextColCount = function () {
        if (genUtils.isNull(this.textColCount) === true) {
            this.textColCount = Math.floor((this.getArea().getWidth() - this.getColStartPosition()) / this.getPalette().getFontWidth());
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

    this.getRowPosition = function (row) {
        return  Math.floor(this.getPalette().getTextHeight() * row);

    };

    this.getColStartPosition = function () {
        return this.colStartPosition;
    };

    this.colStartPosition = 5;

    this.inputPrefix = '>: ';

    this.getInputPrefix = function () {
        return this.input.Prefix;
    };

    this.getFormattedInputLength = function ()
    {
        this.getOutputPrefix().length + this.getInputLength();


    };
    this.getFormattedInput = function () {

        return this.getInputPrefix() + this.getInput();

    };




    this.paint = function () {

        var start = 0;
        this.getArea().clear();
        this.getArea().setColor(this.getPalette().getBackgroundColor());
        this.getArea().drawBackground();
        this.getArea().setColor(this.getPalette().getTextColor());
        this.getArea().setFont(this.getPalette().getFont());
        if (this.getOutputSize() > 0) {
            var rem = this.getTextRowCount() - 1;
            for (var index = this.getOutputSize(); index >= 0; index--) {
                if (rem > 0) {
                    var height = this.getOutputAt(index).getHeight();
                    rem = rem - height;

                    if (rem > 0) {
                        start = index;
                    }

                }
            }
        }
        var yPos = this.getColStartPosition();
        for (var row = 0; row < this.getTextRowCount() - 1; row++) {
            var index = row + start;

            if (this.getOutputSize() > index) {
                var xPos = this.getRowPosition(row);
                this.getOutputAt(index).draw(xPos, yPos, this.getArea(), this);


            }



        }

        xPos = this.getTextRowCount() - 1;
        this.getArea().drawText(this.getFormattedInput(), xPos, yPos);








    };




};