


/* global genUtils */

class  Terminal {

    constructor(canvas, skipSetup) {
        this.area = new TerminalArea(canvas);
        if (skipSetup !== true) {
            this.setup();
        }
    }
    getArea = function () {
        return this.area;
    }
    oldInputs = []
    getOldInputs() {
        return this.oldInputs;
    }
    addOldInput() {
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
    getOldInputIndex() {
        return this.oldInputIndex;
    }

    setOldInputIndex(toSet) {
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

    incrementInputIndex() {
        this.setOldInputIndex(this.getOldInputIndex() + 1);
    }

    decrementInputIndex() {
        this.setOldInputIndex(this.getOldInputIndex() - 1);
    }

    setOldInput() {
        if (this.getOldInputIndex() < 0) {
            return;
        }

        if (this.getOldInputs().length < 1) {
            return;
        }
        this.setInput(this.getOldInputs()[ this.getOldInputs().length - 1 - this.getOldInputIndex()]);
    }

    palette = new TerminalPalette();
    getPalette() {
        return this.palette;
    }

    output = [];
    getOutput() {
        return this.output;
    }

    blinkTime = 1500;
    blinkGhost = 1000;
    getBlinkTime() {
        return this.blinkTime;
    }

    getBlinkGhost() {
        return this.blinkGhost;
    }

    lastUpdated = 0;
    getLastUpdated() {
        return this.lastUpdated;
    }

    updateTime() {
        this.lastUpdated = genUtils.getTime();
    }

    displayCursor() {
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
    getCursor() {
        return this.cursor;
    }

    outputLimit = 500;
    getOutputLimit() {
        return this.outputLimit;
    }

    setOutputLimit(toSet) {
        if (toSet < 1) {
            throw 'Output limit must be a positive number!';
        }
        this.outputLimit = toSet;
    }

    //  version = '0.0.1';
    date = '';
    getVersion() {
        return this.version;
    }

    addSplash(clear) {
        if (clear === true) {
            this.clearOutput();
        }
        this.addTextOutput("Welcome to the Galena Terminal System(GTS)");
        this.addTextOutput('(c) 2023 Christopher Tydings');
        //   this.addTextOutput('Version: ' + this.getVersion() + ' : April 14, 2023');
        try {
            this.addTextOutput('Compilation Date : ' + GALENA_COMPILATION_DATE);
        } catch (err) {
            this.addErrorTextOutput('No Compilation Date Found!');
        }
        this.addTextOutput('');
    }

    getOutputSize = function () {
        return this.getOutput().length;
    }

    addColorTextOutput(text, source) {
        while (text.length > this.getTextColCount()) {
            var sub = text.substring(0, this.getTextColCount());
            text = text.substring(this.getTextColCount());
            this.addColorTextOutput(sub, source);
        }
        var entry = this.addTextOutput(text);
        entry.source = source;
        entry.getColor = function () {
            return this.source.getColor();
        };

        entry.draw = function (xPos, yPos, area, caller) {
            var currColor = area.getStyles();
            area.setColor(this.getColor());
            area.drawText(this.getValue(), xPos, yPos);
            area.setColor(currColor.fill);
        };
        this.paint();
    }

    addErrorTextOutput(text) {


        var source = {
            caller: this,
            getColor: function () {
                return this.caller.getPalette().getErrorColor();
            }
        };
        this.addColorTextOutput(text, source);
        return;
    }

    addAlertTextOutput(text) {
        var source = {
            caller: this,
            getColor: function () {
                return this.caller.getPalette().getAlertColor();
            }
        };
        this.addColorTextOutput(text, source);
        return;
    }

    addTextOutput(text, options) {

        if (genUtils.isNull(options) === true) {
            options = {};
        }

        while (text.length > this.getTextColCount()) {
            /* var sub = text.substring(0, this.getTextColCount());
             text = text.substring(this.getTextColCount());
             this.addTextOutput(sub);
             */
            var broken = genUtils.smartBreakup(text, this.getTextColCount());
            this.addTextOutput(broken.first, options);
            text = broken.second;
        }
        var gross = this.getPalette().getFontHeight() * 1.0;
        var toAdd = {
            value: text,
            getValue: function () {
                return this.value;
            },
            gross: gross,
            getHeight: function () {
                return 1;
            },
            getGrossHeight: function () {
                return this.gross;
            },
            draw: function (xPos, yPos, area, caller, time) {
                area.setColor(caller.getPalette().getTextColor());
                area.drawText(this.getValue(time), xPos, yPos);
            },
            contains: function (cursorX, cursorY, event) {
                return false;
            }
        };
        this.addOutput(toAdd);
        if (options.ignorePrint !== true) {
            this.paint();
        }
        return toAdd;
    }

    getOutputAt(index) {
        return this.getOutput()[index];
    }

    addOutput(toAdd) {
        this.getOutput().push(toAdd);
        while (this.getOutputSize() > this.getOutputLimit()) {
            this.getOutput().shift();
        }
    }

    clearOutput() {
        this.output = [];
    }

    calculateIdealHeight() {
        var ret = this.getVerticalInputPadding() * 2 * this.getPalette().getFontHeight();
        for (var index = 0; index < this.getOutput().length; index++)
        {
            ret += this.getOutput()[index].getGrossHeight();
        }
        return ret;
    }

    setCanvas(toSet, width, height) {
        this.getArea().setCanvas(toSet, width, height);
        this.textRowCount = null;
        this.textColCount = null;
    }

    getPNG() {
        var oldCanvas = this.getArea().getCanvas();
        var canvas = document.createElement('canvas');
        var idealHeight = this.calculateIdealHeight();
        canvas.width = this.getArea().getWidth();
        canvas.height = idealHeight;
        canvas.style.zIndex = 8;
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        this.setCanvas(canvas, canvas.width, idealHeight);
        this.paint();
        var ret = this.getArea().getCanvas().toDataURL('image/png');
        this.setCanvas(oldCanvas);
        return ret;
    }

    getTextRowCount() {
        if (genUtils.isNull(this.textRowCount) === true) {

            this.textRowCount = Math.floor((this.getArea().getHeight() - this.getPalette().getFontHeight() / 2) /
                    this.getPalette().getFontHeight());
        }
        return  this.textRowCount;
    }

    getTextColCount() {
        if (genUtils.isNull(this.textColCount) === true) {
            this.textColCount = Math.floor((this.getArea().getWidth() -
                    this.getColStartPosition()) /
                    this.getPalette().getFontWidth());
        }
        return this.textColCount;
    }

    horizontalOffset = 0;
    getHorizontalOffset() {
        return this.horizontalOffset;
    }

    setHorizontalOffset(toSet) {
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

    incrementHorizontalOffset() {
        this.setHorizontalOffset(this.getHorizontalOffset() + 1);
    }

    decrementHorizontalOffset() {
        this.setHorizontalOffset(this.getHorizontalOffset() - 1);
    }

    verticalOffset = 0;
    getVerticalOffset() {
        return this.verticalOffset;
    }

    setVerticalOffset(toSet) {
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

    incrementVerticalOffset() {
        this.setVerticalOffset(this.getVerticalOffset() + 1);
    }

    decrementVerticalOffset() {
        this.setVerticalOffset(this.getVerticalOffset() - 1);
    }

    input = '';
    getInput() {
        return this.input;
    }

    setInput(toSet) {

        this.updateTime();
        this.input = toSet;
    }

    clearInput() {
        this.addOldInput();
        this.setInput('');
    }

    appendInput(toAdd) {
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

    getInputLength() {
        return this.getInput().length;
    }

    trimInput() {
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

    getRowPosition(row) {
        return  Math.floor(this.getPalette().getFontHeight() * row + this.getPalette().getFontHeight() / 2);
    }

    getColStartPosition() {
        return this.colStartPosition;
    }

    colStartPosition = 5;

    inputPrefix = '>: ';

    getInputPrefix = function () {
        return this.inputPrefix;
    }

    getFormattedInputLength()
    {
        var ret = this.getInputPrefix().length + this.getInputLength() + 1;
        return ret;
    }

    passwordMode = false;

    isPasswordMode() {
        return this.passwordMode === true;
    }

    setPasswordMode(toSet) {
        this.passwordMode = toSet === true;

    }

    getCursorInput(cursor) {

        var loc = this.getHorizontalOffset();
        if (loc === 0 || cursor.length < 1) {
            var ret = this.getInput() + cursor;
            if (this.isPasswordMode() === true) {
                ret = '';
                while (ret.length < this.getInput().length) {
                    ret = ret + '*';
                }
                ret = ret + cursor;
            }
            return ret;
        }
        loc = this.getInputLength() - loc;
        var first = this.getInput().substring(0, loc);
        var second = this.getInput().substring(loc);
        if (this.isPasswordMode() === true) {
            var fp = '';
            var sp = '';
            while (fp.length < first.length) {
                fp = fp + '*';
            }
            while (sp.length < second.length) {
                sp = sp + '*';
            }
            first = fp;
            second = sp;
        }
        return first + cursor + second;
    }

    getFormattedInput() {
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
    borderPadding = 5;

    getBorderPadding = function () {
        return this.borderPadding;
    }

    getXPadding = function () {
        return 8;
    }

    verticalInputPadding = 2;
    paint = function () {
        var time = new Date();
        var xPos = this.getXPadding();
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
                    yPos = this.getRowPosition(counter) + this.getBorderPadding();
                    this.getOutputAt(index).draw(xPos, yPos, this.getArea(), this, time);
                } else
                {
                    break;
                }
                counter += len;
                index++;
            }
        }
        yPos = this.getRowPosition(this.getTextRowCount() - 1);
        this.getArea().setColor(this.getPalette().getTextColor());
        this.getArea().drawText(this.getFormattedInput(), xPos, yPos);
    }

    strangeOffset = {
        x: 11,
        y: 11
    };

    getStrangeMouseOffsetX() {
        return this.strangeOffset.x;
    }

    getStrangeMouseOffsetY() {
        return this.strangeOffset.y;
    }

    processMouseEvent(event) {

        var time = new Date();
        var xCursor = event.x;
        var yCursor = event.y;
        var yPos = 0;
        var xPos = this.getXPadding();
        var xPad = this.getXPadding();
        var repaint = false;
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
                    yPos = this.getRowPosition(counter) + this.getBorderPadding();
                    var yLoc = yCursor - yPos - this.getStrangeMouseOffsetY();
                    var xLoc = xCursor - xPos - this.getStrangeMouseOffsetX();

                    if (this.getOutputAt(index).contains(xLoc, yLoc, event) === true)
                    {

                        this.getOutputAt(index).fireMouseEvent(xLoc, yLoc, event);
                        repaint = true;
                    }
                }
                counter += len;
                index++;
            }
        }
        if (repaint === true) {
            this.paint();
        }
    }

    start() {
        var caller = this;
        this.processId = setInterval(function () {
            caller.paint();
        }, 20);
    }

    getProcessId() {
        return this.processId;
    }

    stop() {
        clearInterval(this.getProcessId());
    }
    setup() {
        this.start();
        this.addSplash();
    }
}
