/**
 * Galena Terminal System(GTS) Distribution File
 * (C) 2023 Christopher Tydings
 * Dist Creation Timestamp : 2023-10-20_18-25-51
 * Caveat Emptor
 */
const GALENA_COMPILATION_DATE = '2023-10-20_18-25-51';
const genUtils = {
    isNull: function (toTest) {
        if (toTest === false) {
            return false;
        }
        if (toTest === null) {
            return true;
        }
        if (toTest === undefined) {
            return true;
        }
        return false;
    },
    isNumber: function (toTest) {
        if (isNaN(toTest) === true) {
            return false;
        }
        return true;
    },
    isInteger: function (toTest) {
        if (this.isNumber(toTest) === false) {
            return false;
        }
        return toTest % 1 === 0;
    },
    isType: function (toTest, target) {
        if (this.isNull(toTest) || this.isNull(toTest.getType)) {
            return false;
        }
        if (toTest !== 'function') {
            return false;
        }
        return ('' + toTest.getType()).trim().toUpperCase() === (target + '').trim().toUpperCase();
    },
    getTime: function () {
        var temp = new Date();
        return temp.getTime();
    },
    breakupString: function (input, delim) {
        var ret = [];
        var index = input.indexOf(delim);
        while (index >= 0) {
            var sub = input.substring(0, index);
            if (sub.length > 1) {
                ret.push(sub);
            }
            input = input.substring(index + delim.length);
            index = input.indexOf(delim);
        }
        if (input.length > 0) {
            ret.push(input);
        }
        return ret;
    },
    smartBreakup: function (toBreak, length) {
        if (toBreak.length <= length) {
            return toBreak;
        }
        var broken = this.breakupString(toBreak, ' ');
        if (broken[0].length > length) {
            var first = toBreak.substring(0, length);
            var second = toBreak.substring(length);
            var ret = {
                first: first,
                second: second
            };
            return ret;
        }
        var first = broken[0];
        for (var index = 1; index < broken.length; index++) {
            var cur = first.length + broken[index].length + 1;
            if (cur > length) {
                var second = '';
                for (var sub = index; sub < broken.length; sub++) {
                    second = second + ' ' + broken[sub];
                }
                second = second.substring(1, second.length);
                var ret = {
                    first: first,
                    second: second
                };
                return ret;
            }
            first = first + ' ' + broken[index];
        }
        var ret = {
            first: first,
            second: ''
        };
        return ret;
    },
    replaceInString(input, target, rep) {
        var targetLength = target.length;
        var ret = '';
        var index = input.indexOf(target);
        while (index > 0) {
            var toAdd = input.substring(0, index);
            input = input.substring(index + targetLength);
            ret = ret + toAdd + rep;
            index = input.indexOf(target);
        }
        if (input.length > 0) {
            ret = ret + input;
        }
        return ret;
    }
};

var TerminalPalette = function () {
    this.dayBackgroundColor = '#FFFFFF';
    this.dayTextColor = '#000000';
    this.nightBackgroundColor = '#2c333d';
    this.nightTextColor = '#5bc7a0';
    this.nightErrorTextColor = '#d15858';
    this.dayErrorTextColor = '#c90a0a';
    this.dayAlertTextColor = '#9ba807';
    this.nightAlertTextColor = '#d2d980';
    this.getDayBackgroundColor = function () {
        return this.dayBackgroundColor;
    };
    this.getDayTextColor = function () {
        return this.dayTextColor;
    };
    this.getNightBackgroundColor = function () {
        return this.nightBackgroundColor;
    };
    this.getNightTextColor = function () {
        return this.nightTextColor;
    };
    this.getNightErrorTextColor = function () {
        return this.nightErrorTextColor;
    };
    this.getDayErrorTextColor = function () {
        return this.dayErrorTextColor;
    };
    this.getNightAlertTextColor = function () {
        return this.nightAlertTextColor;
    };
    this.getDayAlertTextColor = function () {
        return this.dayAlertTextColor;
    };
    this.getBackgroundColor = function () {
        return this.backgroundColor;
    };
    this.setErrorColor = function (color) {
        this.errorTextColor = color;
    };
    this.getErrorColor = function () {
        return this.errorTextColor;
    };
    this.setAlertColor = function (toSet) {
        this.alertColor = toSet;
    };
    this.getAlertColor = function () {
        return this.alertColor;
    };
    this.setFont = function (toSet) {
        this.textFont = toSet;
    };
    this.setBackgroundColor = function (toSet) {
        this.backgroundColor = toSet;
    };
    this.setTextColor = function (toSet) {
        this.textColor = toSet;
    };
    this.getTextColor = function () {
        return this.textColor;
    };
    this.setDayColors = function () {
        this.setTextColor(this.getDayTextColor());
        this.setBackgroundColor(this.getDayBackgroundColor());
        this.setErrorColor(this.getDayErrorTextColor());
        this.setAlertColor(this.getDayAlertTextColor());
    };
    this.setNightColors = function () {
        this.setTextColor(this.getNightTextColor());
        this.setBackgroundColor(this.getNightBackgroundColor());
        this.setErrorColor(this.getNightErrorTextColor());
        this.setAlertColor(this.getNightAlertTextColor());
    };
    this.textFont = '14px Courier New';
    this.getFont = function () {
        return this.textFont;
    };
    this.getFontHeight = function () {
        return 14;
    };
    this.getFontWidth = function () {
        return 10;
    };
    this.setDayColors();
};

/* global genUtils */
class TerminalArea {
    constructor(canvas) {
        this.canvas = canvas;
        // this.setup();
    }
    setCanvas = function (toSet, width, height) {
        this.canvas = toSet;
        this.context = null;
        this.width = width;
        this.height = height;
    }
    getCanvas = function () {
        return this.canvas;
    }
    getContext = function () {
        if (genUtils.isNull(this.context) === true) {
            this.context = this.getCanvas().getContext('2d');
        }
        return this.context;
    }
    getWidth = function () {
        if (genUtils.isNull(this.width) === true) {
            this.width = this.getCanvas().getBoundingClientRect().width;
        }
        return this.width;
    }
    getHeight = function () {
        if (genUtils.isNull(this.height) === true) {
            this.height = this.getCanvas().getBoundingClientRect().height;
        }
        return this.height;
    }
    getStyles = function () {
        var ret = {
            fill: this.getContext().fillStyle,
            stroke: this.getContext().strokeStyle
        };
        return ret;
    }
    setColor = function (toSet) {
        this.getContext().fillStyle = toSet;
        this.getContext().strokeStyle = toSet;
    }
    setFont = function (toSet) {
        this.getContext().font = toSet;
    }
    getTextMode = function () {
        return this.textMode;
    }
    textMode = 3;
    drawText = function (text, x, y) {
        if (this.getTextMode() % 2 === 1) {
            this.getContext().fillText(text, x, y);
        }
        if (this.getTextMode() > 1) {
            this.getContext().strokeText(text, x, y);
        }
    }
    clear = function () {
        this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());
    }
    fillRect = function (x, y, w, h) {
        this.getContext().fillRect(x, y, w, h);
    }
    drawBackground = function () {
        this.fillRect(0, 0, this.getWidth(), this.getHeight());
    }
//https://www.geeksforgeeks.org/how-to-sharpen-blurry-text-in-html5-canvas/
    setup = function () {
        var ctx = this.getCanvas().getContext('2d');
        window.devicePixelRatio = 1; //Blury Text
        window.devicePixelRatio = 2; //Clear Text
        //(CSS pixels).
        //Display Size
        var ctx = this.getContext();
        this.getCanvas().style.width = this.getWidth() + "px";
        canvas.style.height = this.getHeight() + "px";
        var scale = window.devicePixelRatio;
        this.getCanvas().width = Math.floor(this.getWidth() * scale);
        this.getCanvas().height = Math.floor(this.getHeight() * scale);
        //CSS pixels for coordinate systems
        ctx.scale(scale, scale);
        ctx.font = '10px Courier New';
        ctx.textBaseline = 'middle';
    }
}
;

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
    outputLimit = 500;
    getOutputLimit = function () {
        return this.outputLimit;
    }
    setOutputLimit = function (toSet) {
        if (toSet < 1) {
            throw 'Output limit must be a positive number!';
        }
        this.outputLimit = toSet;
    }
    //  version = '0.0.1';
    date = '';
    getVersion = function () {
        return this.version;
    }
    addSplash = function (clear) {
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
    addColorTextOutput = function (text, source) {
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
    addErrorTextOutput = function (text) {
        var source = {
            caller: this,
            getColor: function () {
                return this.caller.getPalette().getErrorColor();
            }
        };
        this.addColorTextOutput(text, source);
        return;
    }
    addAlertTextOutput = function (text) {
        var source = {
            caller: this,
            getColor: function () {
                return this.caller.getPalette().getAlertColor();
            }
        };
        this.addColorTextOutput(text, source);
        return;
    }
    addTextOutput = function (text, options) {
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
            draw: function (xPos, yPos, area, caller) {
                area.setColor(caller.getPalette().getTextColor());
                area.drawText(this.getValue(), xPos, yPos);
            }
        };
        this.addOutput(toAdd);
        if (options.ignorePrint !== true) {
            this.paint();
        }
        return toAdd;
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
    calculateIdealHeight = function () {
        var ret = this.getVerticalInputPadding() * 2 * this.getPalette().getFontHeight();
        for (var index = 0; index < this.getOutput().length; index++)
        {
            ret += this.getOutput()[index].getGrossHeight();
        }
        return ret;
    }
    setCanvas = function (toSet, width, height) {
        this.getArea().setCanvas(toSet, width, height);
        this.textRowCount = null;
        this.textColCount = null;
    }
    getPNG = function () {
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
    passwordMode = false;
    isPasswordMode = function () {
        return this.passwordMode === true;
    }
    setPasswordMode = function (toSet) {
        this.passwordMode = toSet === true;
    }
    getCursorInput = function (cursor) {
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
    borderPadding = 5;
    getBorderPadding = function () {
        return this.borderPadding;
    }
    verticalInputPadding = 2;
    paint = function () {
        var xPos = 8;
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
        this.getArea().setColor(this.getPalette().getTextColor());
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

/* global genUtils */
var TerminalSystem = function (canvas, useVerbose) {
    this.terminal = new Terminal(canvas);
    this.verbose = useVerbose;
    this.keySet = new KeySet();
    this.systemKey = '!';
    this.mode = null;
    this.modes = [];
    this.serverUserName = 'GUEST';
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
        try {
            toAdd.caller = this;
            toAdd.getCaller = function () {
                return this.caller;
            };
            var name = toAdd.getName().trim().toUpperCase();
            this.getModes()[name] = toAdd;
            if (this.hasMode() === false) {
                this.setMode(name);
            }
        } catch (err) {
            this.printErrorText(err + '');
        }
    };
    this.hasMode = function () {
        return genUtils.isNull(this.getMode()) !== true;
    };
    this.executeModeCommand = function (cmd) {
        try {
            if (genUtils.isNull(this.getMode) === true) {
                throw 'No mode has been selected!';
            }
            this.getMode().execute(cmd);
        } catch (err) {
            throw err;
        }
    };
    this.useClientValue = true;
    this.hasServerModule = function () {
        return false;
    };
    this.getServerUser = function () {
        return this.serverUserName;
    };
    this.setServerUser = function (toSet) {
        this.serverUserName = toSet;
    };
    this.executeServerCmd = function (broken, orig) {
        if (this.hasServerModule() !== true) {
            this.printErrorText('This terminal does not have a server '
                    + 'module attached!');
            return;
        }
        if (broken[0] === 'SERVER') {
            if (broken.length !== 2) {
                if (this.getServerAddress() === null) {
                    this.printErrorText('Server command must include one server address!');
                    return;
                }
                orig[1] = this.getServerAddress();
            }
            this.setUseServer(orig[1]);
            this.printVerbose('Sending commands to server: ' + orig[1]);
            this.printText('Please Enter Password.');
            this.getTerminal().setPasswordMode(true);
            return;
        }
        if (broken[0] === 'PASSWORD' || broken[0] === 'SERVER_PASSWORD') {
            this.printText('Please Enter Password.');
            this.getTerminal().setPasswordMode(true);
            return;
        }
        if (broken[0] === 'SERVER_NAME') {
            if (broken.length !== 2) {
                this.printErrorText('Server name command must include one server address!');
                return;
            }
            this.setServerAddress(orig[1]);
            this.printVerbose('Server address set to: ' + orig[1]);
            return;
        }
        if (broken[0] === 'SERVER_USER') {
            if (broken.length !== 2) {
                this.printErrorText('Server user command must include one server address!');
                return;
            }
            this.setServerUser(orig[1]);
            this.printVerbose('Server user set to: ' + orig[1]);
            return;
        }
        if (genUtils.isNull(this.getServerModule()) === true) {
            this.setupServerModule();
        } else
        {
            this.getServerModule().executeServerCommand('!ECHO HELLO DOLLY');
        }
        this.getServerModule().executeSystemCommand(broken, orig);
    };
    this.setupServerModule = function () {
        var time = Date.now();
        var sessionName = 'SESSION_' + time;
        var toSet = new ServerControlModule(this, this.getServerAddress(), sessionName, this.secretText);
        //this.secretText = '';
        this.setServerModule(toSet);
        this.addModule(toSet);
    };
    this.setServerModule = function (toSet) {
        this.serverModule = toSet;
    };
    this.getServerModule = function () {
        return this.serverModule;
    };
    this.useLocal = function () {
        return this.useClientValue === true;
    };
    this.setUseLocal = function () {
        this.useClientValue = true;
    };
    this.setUseServer = function (serverName) {
        this.setServerAddress(serverName);
        this.useClientValue = false;
    };
    this.serverAddress = null;
    this.setServerAddress = function (toSet) {
        this.serverAddres = toSet;
    };
    this.getServerAddress = function () {
        return this.serverAddres;
    };
    this.getMode = function () {
        return this.getModes()[this.getModeName()];
    };
    this.getModeName = function () {
        return this.mode;
    };
    this.setMode = function (toSet) {
        var orig = this.getMode();
        try {
            toSet = toSet + '';
            toSet = toSet.trim().toUpperCase();
            if (genUtils.isNull(this.getModes()[toSet]) === true) {
                throw toSet + ' is not a valid mode!';
            }
            this.mode = toSet;
            this.getMode().activate(this);
            if (this.getMode().hasIntroText()) {
                this.printAlertText(this.getMode().getIntroText());
            }
        } catch (err) {
            this.printErrorText(err + '');
            this.mode = orig;
            this.printErrorText('Mode reset to ' + this.getModeName() + '!');
        }
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
        var value = this.getKeySet().processDownEvent(event);
        if (value.isUnknown() === true) {
            this.printErrorText(value.getValue() + ' is not a recognized key!');
            this.paint();
            return;
        }
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
    this.printText = function (toPrint, options) {
        this.getTerminal().addTextOutput(toPrint, options);
    };
    this.printErrorText = function (toPrint) {
        this.getTerminal().addErrorTextOutput('' + toPrint);
    };
    this.printAlertText = function (toPrint) {
        this.getTerminal().addAlertTextOutput(toPrint);
    };
    this.processCmd = function () {
        var input = this.getTerminal().getInput();
        if (this.getTerminal().isPasswordMode() === true) {
            this.processPrivate(input);
            return;
        }
        input = input.trim();
        if (input.indexOf(this.getSystemKey()) === 0) {
            this.executeSystemCommand(input);
            this.getTerminal().clearInput();
            return;
        }
        try {
            this.executeModeCommand(input);
        } catch (err) {
            this.printErrorText(err);
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
        var len = this.getTerminal().getTextColCount();
        var out = table.toArray(len);
        this.printArray(out);
    };
    this.printArray = function (toPrint) {
        var options = {
            ignorePrint: true
        };
        for (var index = 0; index < toPrint.length; index++) {
            this.printText(toPrint[index] + '', options);
        }
    };
    this.downloadImageToLocal = function (fileName) {
        var data = this.getTerminal().getPNG();
        var anchorTag = document.createElement('a');
        anchorTag.href = data;
        anchorTag.target = '_blank';
        anchorTag.download = fileName;
        document.body.appendChild(anchorTag);
        anchorTag.click();
        document.body.removeChild(anchorTag);
    };
    this.downloadToLocal = function (data, fileName) {
//Where this code was copied from tag is lost, will replace once found.
//I believe that it came from https://stackoverflow.com/questions/3749231/
//download-file-using-javascript-jquery
        var file = new Blob(data, {
            type: 'text'
        });
        var fileURL = URL.createObjectURL(file);
// create an anchor and click on it.
        var anchorTag = document.createElement('a');
        anchorTag.href = fileURL;
        anchorTag.target = '_blank';
        anchorTag.download = fileName;
        document.body.appendChild(anchorTag);
        anchorTag.click();
        document.body.removeChild(anchorTag);
    };
    this.processPrivate = function (input)
    {
        this.secretText = input;
        this.getTerminal().clearInput();
        this.getTerminal().setPasswordMode(false);
        if (this.hasServerModule() === true) {
            this.setupServerModule();
        }
    };
    this.getSecretText = function () {
        if (this.secretText === null) {
            return '';
        }
        return this.secretText;
    };
    this.executeSystemCommand = function (input) {
        this.getTerminal().clearInput();
        if (input.length < 1) {
            this.printErrorText('No command was given!');
            return;
        }
        input = input.substring(1);
        var orig = [];
        var broken = genUtils.breakupString(input, ' ');
        for (var index in broken) {
            orig.push(broken[index]);
            broken[index] = broken[index].trim().toUpperCase();
        }
        if (broken.length < 1) {
            this.printErrorText('No command was given!');
            return;
        }
        if (broken[0] === 'OUTPUT_SIZE') {
            if (broken.length !== 2 || Number.isNaN(broken[1]))
            {
                this.printErrorText('A positive number must be provided!');
                return;
            }
            var size = Number(broken[1]);
            if (genUtils.isNull(size) === true || Number.isNaN(size) === true || size < 1) {
                this.printErrorText('A positive number must be provided!');
                return;
            }
            this.getTerminal().setOutputLimit(size);
            this.printVerbose('Output size set to ' + size + '.');
            return;
        }
        if (broken[0] === 'SERVER') {
            this.executeServerCmd(broken, orig);
            return;
        }
        if (broken[0] === 'SERVER_NAME') {
            this.executeServerCmd(broken, orig);
            return;
        }
        if (broken[0] === 'SERVER_USER') {
            this.executeServerCmd(broken, orig);
            return;
        }
        if (broken[0] === 'PASSWORD' || broken[0] === 'SERVER_PASSWORD') {
            this.executeServerCmd(broken, orig);
            return;
        }
        if (broken[0] === 'SERVER_CONNECT') {
            this.executeServerCmd(broken, orig);
            return;
        }
        if (broken[0] === 'PING') {
            this.executeServerCmd(broken, orig);
            return;
        }
        if (broken[0] === 'LOCAL') {
            this.setUseLocal();
            this.printVerbose('Processing commands locally.');
            return;
        }
        if (broken[0] === 'HELP') {
            if (broken.length > 1) {
                for (var index = 1; index < broken.length; index++) {
                    var mod = this.getModes()[broken[index]];
                    if (genUtils.isNull(mod) === true) {
                        this.printErrorText(broken[index] + ' is not a listed module!');
                    } else
                    {
                        mod.printHelp();
                    }
                }
                return;
            }
            this.printSystemHelp();
            this.getMode().printHelp();
            return;
        }
        if (broken[0] === 'MODE')
        {
            if (broken.length > 1) {
                //this.printText('The mode is : ' + this.getMode());
                var mode = broken[1];
                if (this.useLocal() === false) {
                    this.printVerbose('Sending Mode Request \'' + mode + '\' to ' + this.getServerAddress() + '.');
                    return;
                }
                try {
                    this.printVerbose('Setting mode to ' + mode + '.');
                    this.setMode(mode);
                    return;
                } catch (err) {
                    this.printText(err);
                }
            }
        }
        if (broken[0] === 'MODE' || broken[0] === 'MODES') {
            this.printText('Registered modes:');
            for (var mode in this.getModes()) {
                if (this.getModeName() === mode) {
                    this.printAlertText('   ' + mode + ' <- CURRENT');
                } else
                {
                    this.printText('   ' + mode);
                }
            }
            this.printText('Enviroment:');
            var srvName = this.getServerAddress();
            if (srvName === null) {
                srvName = 'None Entered';
            }
            if (this.useLocal() === true && this.getModeName() !== 'SERVER') {
                this.printAlertText('Local Mode <- CURRENT');
                this.printText('Server: ' + srvName);
            } else
            {
                this.printText('Local Mode');
                this.printAlertText('Server: ' + srvName + ' <- CURRENT');
            }
            return;
        }
        if (broken[0] === 'SAVE') {
            if (broken.length !== 2) {
                this.printErrorText('A file name must be provided for the \n\
save function!');
                return;
            }
            var out = '';
            var output = this.getTerminal().getOutput();
            for (var index = 0; index < output.length; index++) {
                out = out + output[index].getValue() + '\n';
            }
            var fileName = broken[1];
            this.downloadToLocal([out], fileName);
            return;
        }
        if (broken[0] === 'IMAGE') {
            if (broken.length !== 2) {
                this.printErrorText('A file name must be provided for the \n\
save function!');
                return;
            }
            var out = '';
            var output = this.getTerminal().getOutput();
            for (var index = 0; index < output.length; index++) {
                out = out + output[index].getValue() + '\n';
            }
            var fileName = broken[1];
            this.downloadImageToLocal(fileName);
            return;
        }
        if (broken[0] === 'FONT')
        {
            this.getTerminal().getPalette().setNightColors();
            var font = '';
            for (var index = 1; index < broken.length; index++) {
                font = font + orig[index] + ' ';
            }
            this.getTerminal().getPalette().setFont(font);
            return;
        }
        if (broken[0] === 'DAY') {
            this.getTerminal().getPalette().setDayColors();
            return;
        }
        if (broken[0] === 'NIGHT') {
            this.getTerminal().getPalette().setNightColors();
            return;
        }
        if (broken[0] === 'CLEAR') {
            this.getTerminal().addSplash(true);
            if (broken[1] === 'ALL') {
                this.getTerminal().clearOutput();
            }
            return;
        }
        this.printErrorText('Command ' + broken[0] +
                ' is not a recognized command!');
    };
    this.printSystemHelp = function () {
        this.printText('The Galean Terminal System is a text based system. To use, simply type in the desired command. The current output appears in the bottom of the screen. Colors are used to denote message types');
        this.printAlertText('This is an alert message.');
        this.printErrorText('This is an error message!');
        this.printText('');
        this.printText('Modes');
        this.printText('Most functionality is based in the modules loaded' +
                ' into the system. Except for system commands,' +
                ' described below, most inputs are handled by this modules.' +
                ' Please see the module specific help contents for further'
                + ' information.');
        this.printText('');
        this.printText('Controls');
        this.printText("Beyond the alpha numberic keys, the arrow and shift keys can be used to interact with the system. The right and left arrows reposition the cursor on the input. The up and down arrows adjust the output text. If the shift key is held, then the up and down arrows set the input to previous inputs.");
        this.printText('System Commands');
        this.printText('System commands are entered by typing \'!\' followed, without a space, by the name of the command. Parameters follow separatede by a space.');
    }
    var caller = this;
    window.addEventListener("keydown", function () {
        caller.processDownEvent(event);
    });
    window.addEventListener("keyup", function () {
        caller.processUpEvent(event);
    });
    this.paint();
};

var KeySet = function () {
    this.shiftKey = 16;
    this.cntrlKey = 17;
    this.altKey = 18;
    this.enterKey = 13;
    this.tab = 19;
    this.up = 38;
    this.left = 37;
    this.right = 39;
    this.down = 40;
    this.back = 8;
    this.del = 46;
    this.lower = {
        65: 'a',
        66: 'b',
        67: 'c',
        68: 'd',
        69: 'e',
        70: 'f',
        71: 'g',
        72: 'h',
        73: 'i',
        74: 'j',
        75: 'k',
        76: 'l',
        77: 'm',
        78: 'n',
        79: 'o',
        80: 'p',
        81: 'q',
        82: 'r',
        83: 's',
        84: 't',
        85: 'u',
        86: 'v',
        87: 'w',
        88: 'x',
        89: 'y',
        90: 'z',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',
        48: '0',
        173: '-',
        61: '=',
        192: '`',
        219: '[',
        221: ']',
        59: ';',
        222: '\'',
        188: ',',
        190: '.',
        191: '/',
        220: '\\',
        32: ' ',
        189: '-',
        187: '=',
        96: '0',
        97: '1',
        98: '2',
        99: '3',
        100: '4',
        101: '5',
        102: '6',
        103: '7',
        104: '8',
        105: '9',
        110: '.',
        106: '*',
        109: '-',
        107: '+',
        111: '/',
        186: ';'
    };
    this.upper = {
        65: 'A',
        66: 'B',
        67: 'C',
        68: 'D',
        69: 'E',
        70: 'F',
        71: 'G',
        72: 'H',
        73: 'I',
        74: 'J',
        75: 'K',
        76: 'L',
        77: 'M',
        78: 'N',
        79: 'O',
        80: 'P',
        81: 'Q',
        82: 'R',
        83: 'S',
        84: 'T',
        85: 'U',
        86: 'V',
        87: 'W',
        88: 'X',
        89: 'Y',
        90: 'Z',
        49: '!',
        50: '@',
        51: '#',
        52: '$',
        53: '%',
        54: '^',
        55: '&',
        56: '*',
        57: '(',
        48: ')',
        173: '_',
        61: '+',
        192: '~',
        219: '{',
        221: '}',
        59: ':',
        222: '“',
        188: '<',
        190: '>',
        191: '?',
        220: '|',
        32: ' ',
        189: '_',
        187: '+',
        96: '0',
        97: '1',
        98: '2',
        99: '3',
        100: '4',
        101: '5',
        102: '6',
        103: '7',
        104: '8',
        105: '9',
        110: '.',
        106: '*',
        109: '-',
        107: '+',
        111: '/',
        186: ':'
    };
    this.cntrl = false;
    this.processUpEvent = function (event) {
        var code = event.keyCode;
        if (code === this.shiftKey) {
            return;
        }
        if (code === this.altKey) {
            return;
        }
        if (code === this.cntrlKey) {
            return;
        }
    };
    this.processDownEvent = function (event) {
        var code = event.keyCode;
        var alt = event.altKey === true;
        var shift = event.shiftKey === true;
        var cntrl = event.cntrlKey === true;
        var ret = {
            value: null,
            alt: alt,
            cntrl: cntrl,
            shift: shift,
            isShift: function () {
                return this.shift;
            },
            isAlt: function () {
                return this.alt === true;
            },
            isCntrl: function () {
                return this.cntrl === true;
            },
            setValue: function (toSet) {
                this.value = toSet;
                if (this.hasValue() === true) {
                    this.process = true;
                }
            },
            process: true,
            furtherProcess: function () {
                return this.process === true;
            },
            getValue: function () {
                return this.value;
            },
            hasValue: function () {
                return genUtils.isNull(this.getValue()) === false;
            },
            isAlt: function () {
                return false;
            },
            isUp: function () {
                return false;
            },
            isDown: function () {
                return false;
            },
            isLeft: function () {
                return false;
            },
            isRight: function () {
                return false;
            },
            isEnter: function () {
                return false;
            },
            isBackspace: function () {
                return false;
            },
            isUnknown: function () {
                return false;
            }
        };
        if (shift === true) {
            ret.setValue(this.upper[code]);
        } else
        {
            ret.setValue(this.lower[code]);
        }
        if (ret.hasValue() === true) {
            return ret;
        }
        if (code === this.shiftKey) {
            ret.process = false;
            return ret;
        }
        if (code === this.altKey) {
            ret.process = false;
            return ret;
        }
        if (code === this.cntrlKey) {
            ret.process = false;
            return ret;
        }
        if (code === this.up)
        {
            ret.isUp = function () {
                return true;
            };
            return ret;
        }
        if (code === this.down) {
            ret.isDown = function () {
                return true;
            };
            return ret;
        }
        if (code === this.left) {
            ret.isLeft = function () {
                return true;
            };
            return ret;
        }
        if (code === this.right) {
            ret.isRight = function () {
                return true;
            };
            return ret;
        }
        if (code === this.enterKey) {
            ret.isEnter = function () {
                return true;
            };
            return ret;
        }
        if (code === this.back) {
            ret.isBackspace = function () {
                return true;
            }
            return ret;
        }
        if (code === this.del) {
            ret.isBackspace = function () {
                return true;
            }
            return ret;
        }
        ret.value = code;
        ret.isUnknown = function () {
            return true;
        }
        return ret;
    };
};

class BaseModule {
    /**
     *
     * @param {type} name The name of the module.
     * @returns {BaseModule}
     */
    constructor(name) {
        this.name = name;
        this.introText = '';
        this.activateText = '';
        this.silentMode = true;
    }
    /**
     * Returns the name of the module.
     * @returns {type} The name of the module.
     */
    getName = function () {
        return this.name;
    }
    /**
     * TO BE IMPLEMENTED!!!
     * Executes the command in the module.
     * @param {type} cmd The command to be executed.
     */
    execute = function (cmd) {
        throw  this.getName() + ' has not been initalized yet!';
    }
    /**
     * Returns if the module has intro text.
     * @returns {Boolean} If the module has intro text.
     */
    hasIntroText = function () {
        return this.getIntroText().length > 0;
    }
    /**
     * Returns the intro text for the module.
     * @returns {String} The intro text.
     */
    getIntroText = function () {
        return this.introText;
    }
    activate = function (caller) {
    }
    getActivateText = function () {
        return this.activateText;
    }
    hasActivateText = function () {
        return this.getActivateText().length > 0;
    }
    /**
     * Returns if the module is in silent mode.
     * @returns {Boolean} If the module is in slient mode.
     */
    isSilent = function () {
        return this.silentMode === true;
    }
    /**
     * Sets the silent mode for the module.
     * @param {Boolean} toSet If the module is to be in silent mode.
     */
    setSilentMode = function (toSet) {
        this.silentMode = toSet === true;
    }
    /**
     * Prints out the text if the silent mode is off.
     * @param {String} toPrint The text to print out.
     */
    printText = function (toPrint) {
        if (this.isSilent() === true) {
            return;
        }
        this.getCaller().printText(toPrint);
    }
    /**
     * Prints out the alert text if the silent mode is off.
     * @param {String} toPrint The alert text to print out.
     */
    printAlertText = function (toPrint) {
        if (this.isSilent() === true) {
            return;
        }
        this.getCaller().printAlertrText(toPrint);
    }
    /**
     * Prints out the error text if the silent mode is off.
     * @param {String} toPrint The error text to print out.
     */
    printErrorText = function (toPrint) {
        if (this.isSilent() === true) {
            return;
        }
        this.getCaller().printErrorText(toPrint);
    }
    /**
     * Prints out the text table if the silent mode is off.
     * @param {String} toPrint The text table to print out.
     */
    printTable = function (toPrint) {
        if (this.isSilent() === true) {
            return;
        }
        this.getCaller().printTable(toPrint);
    }
    /**
     *
     * Prints the text for the module.
     */
    printHelp = function () {
        this.getCaller().printErrorText('No help for ' + this.getName()
                + ' has been added.');
    }
}

class SQLModule extends BaseModule {
    constructor(source) {
        super('SQL');
        this.source = source;
        this.createDatabase();
        this.cmdCounter = 0;
        this.cmdCounterThreshold = 150;
    }
    getCmdCounter = function () {
        return this.cmdCounter;
    }
    getCmdResetThreshold = function () {
        return this.cmdCounterThreshold;
    }
    incrementCmdCounter = function () {
        this.cmdCounter++;
    }
    resetCmdCounter = function () {
        this.cmdCounter = 0;
    }
    needReset = function () {
        return this.getCmdCounter() >= this.getCmdResetThreshold();
    }
    getSource = function () {
        return this.source;
    }
    getDatabase = function () {
        return this.db;
    }
    closeDatabase = function () {
        this.getDatabase().close();
    }
    createDatabase = function () {
        this.db = new this.source.Database();
    }
    loadDatabase = function (data) {
        this.db = new this.source.Database(data);
    }
    reloadDB = function () {
        var data = this.exportDB();
        this.closeDatabase();
        this.loadDatabase(data);
        this.resetCmdCounter();
    }
    exportDB = function () {
        var data = this.getDatabase().export();
        return data;
    }
    formatDBData = function (data) {
        if (data.length < 1) {
            return '[]';
        }
        var ret = '[' + data[0];
        for (var index = 1; index < data.length; index++) {
            ret = ret + ',' + data[index];
        }
        ret = ret + ']';
        return ret;
    }
    exportDBToLocal = function (fileName) {
        var data = this.exportDB();
        data = [this.formatDBData(data)];
        this.getCaller().downloadToLocal(data, fileName);
    }
    exportDBToLocalFile = function (fileName) {
        var data = this.exportDB();
        data = 'var loadParsedData = function(db){\nvar data = '
                + this.formatDBData(data);
        data = data + ';\n db.loadDatabase(data);}';
        data = [data];
        this.getCaller().downloadToLocal(data, fileName);
    }
    moduleCmd = function (input) {
        var cmd = input.trim();
        var toCheck = cmd.toUpperCase();
        if (toCheck.indexOf('EXPORT_LOADER') === 0 ||
                toCheck.indexOf('EXPORT_FILE') === 0) {
            cmd = cmd.trim();
            var fileName = cmd.substring(13).trim();
            if (fileName.length < 1) {
                this.printErrorText('No file name given!');
                return;
            }
            this.exportDBToLocalFile(fileName);
            this.printAlertText('Database exported to '
                    + fileName + '.');
            return true;
        }
        if (toCheck.indexOf('EXPORT') === 0) {
            cmd = cmd.trim();
            var fileName = cmd.substring(6).trim();
            if (fileName.length < 1) {
                this.printErrorText('No file name given!');
                return;
            }
            this.exportDBToLocal(fileName);
            this.printAlertText('Database exported to ' +
                    fileName + '.');
            return true;
        }
        if (toCheck === 'RELOAD') {
            this.reloadDB();
            this.printAlertText('Database reloaded.');
            return true;
        }
        return false;
    }
    execute = function (cmd) {
        if (genUtils.isNull(print) === true) {
            print = true;
        }
        if (this.moduleCmd(cmd) === true) {
            return;
        }
        this.incrementCmdCounter();
        if (this.needReset() === true) {
            this.reloadDB();
        }
        if (print === true) {
            this.printText(cmd);
        }
        try {
            const stmt = this.getDatabase().prepare(cmd);
            stmt.getAsObject(); // {col1:1, col2:111}
            // Bind new values
            stmt.bind();
            var table = null;
            var counter = 0;
            while (stmt.step()) { //
                const row = stmt.getAsObject();
                if (counter === 0) {
                    var cols = [];
                    for (var prop in row) {
                        cols.push(prop + '');
                    }
                    table = new TextTable(cols);
                }
                var index = 0;
                for (var prop in row) {
                    var value = row[prop];
                    table.setCell(counter, index, value);
                    index++;
                }
                counter++;
            }
            if (genUtils.isNull(table) !== true) {
                this.printTable(table);
            }
            if (index < 0) {
                index = 0;
            }
            if (cmd.toUpperCase().trim().indexOf('SELECT') === 0) {
                this.printText('Results: ' + counter);
            }
            if (print === true) {
                this.printText('');
            }
        } catch (err) {
            this.printErrorText(err);
        }
    }
    getData = function (cmd) {
        const stmt = this.getDatabase().prepare(cmd);
        stmt.getAsObject(); // {col1:1, col2:111}
        // Bind new values
        stmt.bind();
        var ret = []
        var counter = 0;
        while (stmt.step()) { //
            const row = stmt.getAsObject();
            var curr = [];
            var index = 0;
            for (var prop in row) {
                var value = row[prop];
                curr.push(value)
                index++;
            }
            ret.push(curr);
        }
        return ret;
    }
    printHelp = function () {
        var help = 'To use, enter the sql command in a SQLLite format. '
                + 'Several custom commands can also be used. Command parameters, where applicable, are separated by a space.';
        this.printText(help);
        this.printText('');
        this.printText('Custom Commands:');
        var cols = ['Name', 'Desc.'];
        var table = new TextTable(cols);
        table.setCell(0, 0, 'DOWNLOAD file_name');
        table.setCell(0, 1, 'Downloads the DB as a binary array.');
        table.setCell(1, 0, 'RELOAD');
        table.setCell(1, 1, 'Reloads the database. Typcially used for internal use.');
        this.printTable(table);
        this.printText('');
        help = 'Pragma can also be used for SQLLite system operations. ' +
                'To use, type \' PRAGMA\' plus the command name/paramters.'
                + ' Please set the parameters in parenthesis.';
        this.printText(help);
        this.printText('');
        this.printText('Pragma Commands:');
        cols = ['Name', 'Desc.'];
        table = new TextTable(cols);
        table.setCell(0, 0, 'TABLE_LIST');
        table.setCell(0, 1, 'Lists the tables.');
        table.setCell(1, 0, 'TABLE_INFO(table_name)');
        table.setCell(1, 1, 'Lists the columns in the table.');
        this.printTable(table);
    }
}

/* global genUtils */
class TextTable {
    constructor(columns) {
        this.columns = columns;
        this.data = [];
        this.axis = '+';
        this.verticalBorder = '|';
        this.horizontalBorder = '-';
    }
    getAxis = function () {
        return this.axis;
    }
    getVerticalBorder = function () {
        return this.verticalBorder;
    }
    getHorizontalBorder = function () {
        return this.horizontalBorder;
    }
    getColumns = function () {
        return this.columns;
    }
    getColumn = function (index) {
        return this.getColumns()[index];
    }
    getData = function () {
        return this.data;
    }
    getRowCount = function () {
        return this.getData().length;
    }
    getColCount = function () {
        var ret = 0;
        for (var index = 0; index < this.getRowCount(); index++) {
            var value = this.getRow(index).length;
            if (value > ret) {
                ret = value;
            }
        }
        return ret;
    }
    getRow = function (index) {
        if (genUtils.isNull(this.getData()[index]) === true) {
            this.getData()[index] = [];
        }
        return this.getData()[index];
    }
    getCell = function (row, col) {
        var ret = this.getRow(row)[col];
        if (genUtils.isNull(ret) === true) {
            this.setCell(row, col, '');
            return this.getCell(row, col);
        }
        return ret;
    }
    setCell = function (row, col, value) {
        this.getRow(row)[col] = value + '';
    }
    getCellLength = function (row, col) {
        var value = this.getCell(row, col) + '';
        return value.length;
    }
    getLengthData = function () {
        var yEnd = this.getRowCount();
        var xEnd = this.getColCount();
        var ret = [];
        ret[0] = [];
        for (var col = 0; col < this.getColumns().length; col++) {
            ret[0][col] = this.getColumn(col).length;
        }
        for (var y = 0; y < yEnd; y++) {
            ret[y + 1] = [];
            for (var x = 0; x < xEnd; x++) {
                ret[y + 1][x] = this.getCellLength(y, x);
            }
        }
        return ret;
    }
    getColStats = function () {
        var lens = this.getLengthData();
        var ret = [];
        var grandMax = 0;
        for (var col = 0; col < lens[0].length; col++) {
            var max = 0;
            var total = 0
            for (var row = 0; row < lens.length; row++) {
                var value = lens[row][col];
                if (max < value) {
                    max = value;
                }
                total += value;
            }
            grandMax += max;
            ret[col] = {
                max: max,
                total: total
            };
        }
        var grandTotal = 0;
        for (var x = 0; x < ret.length; x++) {
            grandTotal += ret[x].max;
            var ratio = ret[x].max / grandMax;
            ret[x].ratio = ratio;
        }
        var stats = {
            cols: ret,
            total: grandTotal
        };
        return stats;
    }
    getColLengths = function (length) {
        length = length - this.getColCount() - 1;
        var lens = this.getColStats();
        var ret = [];
        if (lens.total <= length) {
            lens = lens.cols;
            for (var x = 0; x < lens.length; x++) {
                ret[x] = lens[x].max;
            }
            return ret;
        }
        for (var x = 0; x < lens.cols.length; x++) {
            ret[x] = lens.cols[x].ratio * length;
            ret[x] = Math.floor(ret[x]);
            if (ret[x] < 1) {
                ret[x] = 1;
            }
        }
        var col = 0;
        while (this.calcTotalHelper(ret) < length) {
            ret[col]++;
            col++;
            if (col >= ret.length) {
                col = 0;
            }
        }
        return ret;
    }
    calcTotalHelper = function (cols) {
        var ret = 0;
        for (var x = 0; x < cols.length; x++) {
            ret += cols[x];
        }
        return ret;
    }
    createFillerHelper = function (length, value) {
        var ret = value + '';
        while (ret.length < length) {
            ret = ret + value;
        }
        if (ret.length > length) {
            ret = ret.substring(0, length);
        }
        return ret;
    }
    createBlankHelper = function (length) {
        return this.createFillerHelper(length, '       ');
    }
    createHorizontalRow = function (lengths) {
        var ret = [];
        for (var col = 0; col < lengths.length; col++) {
            ret[col] = this.createFillerHelper(lengths[col], this.getHorizontalBorder());
        }
        return ret;
    }
    addCellToDataHelper = function (data, length, ret, col) {
        ret[col] = [];
        var counter = 0;
        while (data.length > length) {
            var sub = data.substring(0, length);
            data = data.substring(length);
            ret[col].push(sub);
            counter++;
        }
        if (data.length > 0) {
            while (data.length < length) {
                data = data + ' ';
            }
            counter++;
            ret[col].push(data);
        }
        return counter;
    }
    rowToText = function (data, lengths)
    {
        var ret = [];
        var max = 0;
        for (var col = 0; col < data.length; col++) {
            var len = this.addCellToDataHelper(data[col], lengths[col], ret, col);
            if (max < len) {
                max = len;
            }
        }
        for (var col = 0; col < ret.length; col++) {
            var blank = this.createBlankHelper(lengths[col]);
            while (ret[col].length < max) {
                ret[col].push(blank);
            }
        }
        return ret;
    }
    addRowData = function (data, toAdd) {
        var height = toAdd[0].length;
        var start = data.length;
        for (var row = 0; row < height; row++) {
            data[row + start] = [];
            for (var col = 0; col < toAdd.length; col++) {
                data[row + start][col] = toAdd[col][row];
            }
        }
        return data;
    }
    toArray = function (length) {
        var lens = this.getColLengths(length);
        var parsed = [];
        parsed.push(this.createHorizontalRow(lens));
        var titleLen = 1;
        for (var row = -1; row < this.getRowCount(); row++) {
            var toParse = this.getColumns();
            if (row >= 0) {
                toParse = this.getRow(row);
            }
            var toAdd = this.rowToText(toParse, lens);
            this.addRowData(parsed, toAdd);
            if (row === -1) {
                titleLen = toAdd[0].length;
            }
        }
        var ret = [];
        var axis = this.getAxis();
        var delim = this.getVerticalBorder();
        ret.push(this.rowToString(parsed[0], this.getAxis()));
        for (var row = 1; row < parsed.length; row++) {
            ret.push(this.rowToString(parsed[row], delim));
            if (row === titleLen) {
                ret.push(this.rowToString(parsed[0], this.getAxis()));
            }
        }
        ret.push(this.rowToString(parsed[0], this.getAxis()));
        return ret;
    }
    rowToString = function (data, delimiter) {
        var ret = delimiter;
        for (var x = 0; x < data.length; x++) {
            ret = ret + data[x] + delimiter;
        }
        return ret;
    }
    dataToString = function (data) {
        var ret = [];
        ret.push(this.rowToString(data[0]), this.getAxis());
        for (var col = 1; col < data.length; col++) {
            ret.push(this.rowToString(data[col]), this.getVerticalBorder());
        }
        return ret;
    }
}

class JSONModule extends BaseModule {
    constructor() {
        super('JSON');
        this.source = [];
    }
    getSource = function () {
        return this.source;
    }
    addToSource = function (toAdd) {
        this.getSource().push(toAdd);
    }
    execute = function (cmd, entry) {
    }
    print = function (text) {
        this.getCaller().printText(text);
    }
    printResults = function (cols, results) {
        if (results.length < 1) {
            return;
        }
        var tab = new TextTable(cols);
        for (var index = 0; index < results.length; index++) {
            if (results[index].isArray() === true) {
                for (var sub = 0; sub < results[index].length(); sub++) {
                    results[index].at(sub).addToTable(tab, index, sub);
                }
            } else
            {
                results[index].addToTable(tab, index, 0);
            }
        }
        this.getCaller().printTable(tab);
    }
    length = function () {
        return this.getSource().length;
    }
    at = function (index) {
        var xml = this.getSource()[index];
        return xml;
    }
    runCmd = function (cmd, index) {
        cmd.setSource(this.at(index));
        return cmd.execute(this);
    }
    execute = function (cmd, print) {
        try {
            var parser = new CommandParser();
            var cmd = parser.parse(cmd);
            var results = [];
            var cols = [];
            if (cmd.length() > 0) {
                for (var index = 0; index < cmd.length(); index++) {
                    cols.push(cmd.at(index).getText());
                }
            }
            for (var index = 0; index < this.length(); index++) {
                var result = this.runCmd(cmd, index);
                if (genUtils.isNull(result) !== true) {
                    results.push(result);
                }
            }
            this.printResults(cols, results);
        } catch (err) {
            this.getCaller().printErrorText('Error: ' + err);
        }
    }
}

class SQLTableBuilderModule extends BaseModule {
    constructor(sql) {
        super('SQL_TABLE');
        this.sql = sql;
    }
    getSQL = function () {
        return this.sql;
    }
    reloadDB = function () {
        this.getSQL().reloadDB();
    }
    executeSQLCmd = function (cmd) {
        this.getSQL().execute(cmd);
    }
    getSource = function () {
        return this.source;
    }
    setSource = function (toSet) {
        this.source = toSet;
    }
    execute = function (cmd) {
        if (cmd.trim().toUpperCase().indexOf('SQL_TABLE') === 0) {
            var parser = new CommandParser();
            var parsed = parser.parse(cmd);
            parsed.setSource(this.getSource());
            parsed.execute(this);
            return;
        }
        this.getSQL().execute(cmd);
    }
}

class SuperString {
    constructor(value) {
        this.value = value + '';
        this.special = [];
        this.calcStatus();
    }
    makeSpecial = function (index) {
        if (genUtils.isNull(this.special[index]) === false) {
            return;
        }
        this.special[index] = {
            print: true,
            ignore: false,
            comment: false
        };
    }
    ignore = function (index) {
        this.getSpecial(index).ignore = true;
    }
    isSuperString = function () {
        return true;
    }
    comment = function (index) {
        this.getSpecial(index).comment = true;
    }
    noPrint = function (index) {
        this.getSpecial(index).print = false;
    }
    getSpecial = function (index) {
        if (genUtils.isNull(this.special[index]) === true) {
            this.makeSpecial(index);
        }
        return this.special[index];
    }
    isIgnore = function (index) {
        return this.getSpecial(index).ignore === true;
    }
    isComment = function (index) {
        return  this.getSpecial(index).comment === true;
    }
    isNoPrint = function (index) {
        return this.getSpecial(index).print === false;
    }
    isStringComment = function () {
        var ret = false;
        for (var index = 0; index < this.length(); index++) {
            if (this.at(index) !== ' ') {
                if (this.isIgnore(index) === false) {
                    if (this.isComment(index) === true) {
                        ret = true;
                    } else
                    {
                        if (ret === true) {
                            throw 'Comment mismatch!';
                        }
                    }
                }
            }
        }
        return ret;
    }
    length = function () {
        return this.getValue().length;
    }
    at = function (position) {
        return this.getValue()[position];
    }
    contains = function (target) {
        return this.indexOf(target) >= 0;
    }
    calcStatus = function () {
        var cmt = null;
        for (var index = 0; index < this.length(); index++)
        {
            if (this.isIgnore(index) === false)
            {
                var temp = this.at(index);
                if (this.at(index) === '\\') {
                    if (index + 1 < this.length()) {
                        this.ignore(index + 1);
                        this.noPrint(index);
                    } else
                    {
                        throw 'Illegal Escape';
                    }
                }
                if (genUtils.isNull(cmt) === true) {
                    if (this.at(index) === "'" || this.at(index) === '"' || this.at(index) === "“") {
                        this.comment(index);
                        cmt = this.at(index);
                        this.noPrint(index);
                    }
                } else
                {
                    this.comment(index);
                    if (this.at(index) === cmt) {
                        this.noPrint(index);
                        cmt = null;
                    }
                }
            }
        }
    }
    print = function (start, end) {
        if (genUtils.isNull(start) === true) {
            start = 0;
        }
        if (genUtils.isNull(end) === true) {
            end = this.length();
        }
        var ret = '';
        for (var index = start; index < end; index++) {
            var print = this.isNoPrint(index);
            var toPrint = this.at(index);
            if (print === false) {
                ret += toPrint;
            }
        }
        return ret;
    }
    isValid = function (index) {
        if (this.isComment(index) === true) {
            return false;
        }
        if (this.isIgnore(index) === true) {
            return false;
        }
        return true;
    }
    createSub = function (start, end) {
        var sub = this.getValue().substring(start, end);
        sub = new SuperString(sub);
        var counter = 0;
        for (var index = start; index < end; index++) {
            sub.special[counter] = this.getSpecial(index);
            counter++;
        }
        return sub;
    }
    indexOf = function (target, start) {
        if (genUtils.isNull(start) === true) {
            start = 0;
        }
        for (var index = 0; index < this.length(); index++)
        {
            if (this.isComment(index) === false && this.isIgnore(index) === false) {
                if (this.at(index) === target) {
                    return index;
                }
            }
        }
        return -1;
    }
    getValue = function () {
        return this.value;
    }
}

class CommandValue {
    constructor(value) {
        if (typeof value === 'string') {
            value = new SuperString(value);
        }
        this.value = value;
    }
    isTrue = function () {
        return false;
    }
    getValue = function () {
        return this.value;
    }
    getText = function () {
        try {
            return this.getValue().print();
        } catch (err) {
        }
        return this.value + '';
    }
    isCommand = function () {
        return false;
    }
    isArray = function () {
        return false;
    }
    isQuote = function () {
        return false;
    }
    addToTable = function (table, row, col) {
        table.setCell(row, col, this.getText());
    }
}

class CommandArray extends  CommandValue
{
    constructor() {
        super([]);
    }
    isArray = function () {
        return true;
    }
    length = function () {
        return this.getValue().length;
    }
    at = function (index) {
        index = Number(index);
        if (index < 0 || index >= this.length()) {
            throw 'Index ' + index + ' is out of bounds!';
        }
        return this.getValue()[index];
    }
    push = function (toAdd) {
        if (genUtils.isNull(toAdd) === true) {
            this.value.push(toAdd);
            return;
        }
        if (genUtils.isNull(toAdd.value) === true) {
            toAdd = new CommandValue(toAdd);
        }
        this.value.push(toAdd);
    }
}

class CommandQuote extends  CommandValue
{
    constructor(value) {
        super(value);
    }
    isQuote = function () {
        return true;
    }
}

class Command extends CommandArray {
    constructor(name) {
        super();
        this.name = name;
    }
    addArg = function (toAdd) {
        this.push(toAdd);
    }
    getArgs = function () {
        return this.value;
    }
    length = function () {
        return this.getArgs().length;
    }
    getArg = function (index) {
        if (index < 0 || index >= this.length()) {
            throw 'Out of bounds index!';
        }
        return this.getArgs()[index];
    }
    getName = function () {
        return this.name;
    }
    at = function (index) {
        return this.getArg(index);
    }
    isBoolean = function () {
        return false;
    }
    getValue = function (caller) {
        return this.execute(caller);
    }
    execute = function (caller) {
        throw 'Not yet implemented!';
    }
}

class CommandParser {
    constructor() {
    }
    parse = function (value) {
        value = new SuperString(value);
        var start = value.indexOf('(');
        if (start < 1) {
            throw 'Is not a function';
        }
        var name = value.createSub(0, start).print();
        var ret = new Command(name);
        var rem = value.createSub(start, value.length());
        var index = this.getFuncEnd(rem);
        rem = rem.createSub(1, index);
        index = this.getParamEnd(rem);
        while (index > 0) {
            var first = rem.createSub(0, index);
            rem = rem.createSub(index + 1);
            ret.addArg(this.parseParam(first));
            index = this.getParamEnd(rem);
        }
        if (rem.length() > 0) {
            ret.addArg(this.parseParam(rem));
        }
        return this.convertCommand(ret);
    }
    parseParam = function (input) {
        if (this.isComment(input) === true)
        {
            return new CommandQuote(input.print());
        }
        if (input.contains('(') === true) {
            return this.parse(input.getValue());
        }
        var ret = new CommandValue(input.print());
        return ret;
    }
    convertCommand = function (toConvert) {
        var ret = null;
        var name = toConvert.getName();
        name = name.trim().toUpperCase();
        if (name === 'JSON') {
            ret = new JSONValueCommand();
        }
        if (name === 'IF') {
            ret = new IFCommand();
        }
        if (name === 'NULL') {
            ret = new IsNullValueCommand();
        }
        if (name === 'TREE') {
            ret = new JSONTreeCommand();
        }
        if (name === 'SQL_TABLE') {
            ret = new CreateSQLTableCommand();
        }
        if (name === 'GRAPH') {
            ret = new CreateGraphCommand();
        }
        if (genUtils.isNull(ret) === true) {
            throw name + ' is not a recognized command!';
        }
        ret.value = toConvert.value;
        return ret;
    }
    isComment = function (toTest) {
        return toTest.isStringComment();
    }
    getParamEnd = function (input) {
        var counter = 0;
        for (var index = 0; index < input.length(); index++) {
            if (input.isValid(index) === true) {
                if (input.at(index) === '(') {
                    counter++;
                }
                if (input.at(index) === ')') {
                    counter--;
                }
                if (counter === 0) {
                    if (input.at(index) === ',') {
                        return index;
                    }
                }
            }
        }
        return -1;
    }
    getFuncEnd = function (input) {
        var counter = 0;
        for (var index = 0; index < input.length(); index++) {
            if (input.isValid(index) === true) {
                if (input.at(index) === '(') {
                    counter++;
                }
                if (input.at(index) === ')') {
                    counter--;
                }
                if (counter === 0) {
                    return index;
                }
            }
        }
        throw 'Parenthesis mismatch!';
    }
}

class BooleanCommand extends Command {
    constructor(name) {
        super(name);
    }
    isTrue = function () {
        return false;
    }
    isBoolean = function () {
        return false;
    }
}

class CompareCommand extends BooleanCommand {
    constructor(name) {
        super(name);
    }
    compare = function (valueA, valueB, caller) {
        throw 'Unimplmented comparison command.';
    }
    isTrue = function (caller) {
        if (this.length() < 2) {
            throw 'Insufficent argument count exception!'
        }
        var base = this.at(0).getValue();
        for (var index = 1; index < this.length(); index++) {
            if (this.compare(base, this.at(index).getValue(), caller) === false) {
                return false;
            }
        }
        return true;
    }
}

class IfCommand extends BooleanCommand {
    constructor() {
        super('IF');
    }
    isTrue = function (caller) {
        if (this.at(0).getValue() === true) {
            return true;
        }
        return false;
    }
    getSource = function () {
        return this.source;
    }
    setSource = function (toSet) {
        this.source = toSet;
    }
    execute = function (caller) {
        if (this.length() < 1) {
            throw 'No boolean condition in statement!';
        }
        var ret = [];
        if (this.isTrue(caller) === false) {
            return ret;
        }
        for (var index = 1; index < this.length(); index++) {
            var child = this.getArg(index);
            if (child.isQuote() === false &&
                    child.isArray() === false) {
                var sub = new JSONValueCommand();
                sub.addArg(child.getValue());
                ret.push(sub.getValue());
            } else {
                child.setSource(this.getSource());
                ret.push(child.getValue(caller));
            }
        }
    }
}

class EqualsCommand extends BooleanCommand {
    constructor() {
        super('EQ');
    }
    compare = function (valueA, valueB, caller) {
        return valueA === valueB;
    }
}

class GreaterThanCommand extends BooleanCommand {
    constructor() {
        super('LD');
    }
    compare = function (valueA, valueB, caller) {
        return valueA > valueB;
    }
}

class IsNotNullCommand extends BooleanCommand {
    constructor() {
        super('EXISTS');
    }
    isTrue = function (caller) {
        if (this.length() < 1) {
            throw 'Insufficent argument count exception!'
        }
        var base = this.at(0).getValue();
        return genUtils.isNull(base) !== true;
    }
}

class IsNullCommand extends BooleanCommand {
    constructor() {
        super('null');
    }
    isTrue = function (caller) {
        if (this.length() < 1) {
            throw 'Insufficent argument count exception!'
        }
        var base = this.at(0).getValue();
        return genUtils.isNull(base) === true;
    }
}

class JSONValueCommand extends Command {
    constructor() {
        super('JSON');
        this.source = null;
    }
    parsePath = function (path) {
        var ret = genUtils.breakupString(path, '.');
        return ret;
    }
    setSource = function (toSet) {
        this.source = toSet;
    }
    getSource = function () {
        if (genUtils.isNull(this.source) === true) {
            throw 'No source!';
        }
        return this.source;
    }
    getPath = function (path) {
        var curr = this.getSource();
        path = this.parsePath(path.getText());
        for (var index = 0; index < path.length; index++) {
            var child = path[index];
            curr = curr[child];
            if (genUtils.isNull(curr) === true) {
                return null;
            }
        }
        if (Array.isArray(curr) === true) {
            var ret = new CommandArray();
            for (var index = 0; index < curr.length; index++) {
                ret.push(curr[index]);
            }
            return ret;
        }
        return new CommandValue(new SuperString(curr));
    }
    execute = function () {
        var ret = new CommandArray();
        if (this.length() === 1) {
            return this.getPath(this.getArg(0));
        }
        for (var index = 0; index < this.length(); index++) {
            ret.push(this.getPath(this.getArg(index)));
        }
        return ret;
    }
}

class LessThanCommand extends BooleanCommand {
    constructor() {
        super('LD');
    }
    compare = function (valueA, valueB, caller) {
        return valueA < valueB;
    }
}

class JSONTreeCommand extends Command {
    constructor() {
        super('TREE');
        this.source = null;
    }
    setSource = function (toSet) {
        this.source = toSet;
    }
    getSource = function () {
        if (genUtils.isNull(this.source) === true) {
            throw 'No source!';
        }
        return this.source;
    }
    parseObj = function (input, caller, padding, limit) {
        if (limit < 0) {
            return;
        }
        for (var prop in input) {
            caller.print(padding + prop);
            var sub = input[prop];
            if (sub !== (sub + '')) {
                this.parseObj(sub, caller, padding + '  ', limit - 1);
            }
        }
    }
    execute = function (caller) {
        if (this.length() === 1) {
            if (this.getArg(0).getValue() < 1) {
                return;
            }
        }
        this.parseObj(this.getSource(), caller, ' ', 10);
        this.addArg(new CommandValue(0));
        return null;
    }
}

class CreateSQLTableCommand extends Command {
    constructor() {
        super('SQL_TABLE');
    }
    getTableName = function () {
        return this.getArg(0).getText().trim().toLowerCase();
    }
    clearTable = function (caller) {
        var cmd = 'DROP TABLE IF EXISTS ' + this.getTableName() + ';';
        caller.executeSQLCmd(cmd);
    }
    getFields = function () {
        var ret = [];
        var hasArray = -1;
        for (var index = 1; index < this.length(); index += 1) {
            var value = this.getArg(index);
            value = value.getText();
            value = genUtils.breakupString(value, ' ');
            var name = value[0];
            var type = value[1];
            var isArray = (value[2] + '').trim().toUpperCase() === 'ARRAY';
            var source = value[3];
            if (genUtils.isNull(source) === true) {
                source = name;
            }
            if (isArray === true) {
                if (hasArray >= 0) {
                    throw 'Only one array table permitted!';
                }
                hasArray = ret.length;
            }
            if (this.isValidType(type) !== true) {
                throw type + ' is not a valid type!';
            }
            var toAdd = {
                name: name,
                type: type,
                isArray: isArray,
                source: source
            };
            ret.push(toAdd);
        }
        if (hasArray >= 0) {
            var array = ret[hasArray];
            var sub = [];
            for (var index = 0; index < ret.length; index++) {
                if (index !== hasArray) {
                    sub.push(ret[index]);
                }
            }
            sub.push(array);
            ret = sub;
        }
        return ret;
    }
    isValidType = function (type) {
        type = type.trim().toUpperCase();
        if (type === 'INTEGER') {
            return true;
        }
        if (type.indexOf('VARCHAR') === 0) {
            return true;
        }
        if (type === 'FLOAT') {
            return true;
        }
        if (type === 'INTEGER') {
            return true;
        }
        if (type === 'BOOL') {
            return true;
        }
        return false;
    }
    ignoreErrors = function () {
        return false;
    }
    createInsert = function (caller, fields, source, index) {
        var cmd = '';
        try {
            var isArray = fields[fields.length - 1].isArray === true;
            if (isArray === true) {
                if (genUtils.isNull(index) === true) {
                    index = this.getArrayLength(fields[fields.length - 1].source, source) - 1;
                    this.createInsert(caller, fields, source, index);
                    return;
                }
                if (index > 0) {
                    this.createInsert(caller, fields, source, index - 1);
                }
            }
            var end = fields.length;
            if (isArray === true) {
                end--;
            }
            var values = '';
            var valueFields = '';
            for (var sub = 0; sub < end; sub++) {
                valueFields = valueFields + fields[sub].name + ',';
                values = values + this.getValue(fields[sub], source) + ',';
            }
            if (isArray === true) {
                valueFields = valueFields + fields[fields.length - 1].name;
                var value = this.getValue(fields[fields.length - 1], source, index);
                values = values + value;
            } else
            {
                valueFields = valueFields.substring(0, valueFields.length - 1);
                values = values.substring(0, values.length - 1);
            }
            cmd = 'INSERT INTO ' + this.getTableName() + ' (' + valueFields;
            cmd = cmd + ') VALUES (' + values + ');';
            caller.executeSQLCmd(cmd);
            //
//  alert(cmd);
            //    return cmd;
        } catch (err) {
            if (this.ignoreErrors() === false) {
                throw err;
            }
        }
    }
    getArrayLength = function (name, source) {
        var cmd = new JSONValueCommand();
        cmd.addArg(new CommandValue(name));
        cmd.setSource(source);
        var value = cmd.execute();
        return value.length();
    }
    parsePath = function (path) {
        var ret = genUtils.breakupString(path, '.');
        return ret;
    }
    getPath = function (path, curr) {
        for (var index = 0; index < path.length; index++) {
            var child = path[index];
            curr = curr[child];
            if (genUtils.isNull(curr) === true) {
                return null;
            }
        }
        return curr;
    }
    getValue = function (field, source, index) {
        var path = this.parsePath(field.source);
        var value = this.getPath(path, source);
        if (genUtils.isNull(value) === true) {
            throw field.source + ' is not a valid field!';
        }
        if (index >= 0) {
            value = value[index];
        }
        if (field.type.trim().toUpperCase() === 'BLOB' || field.type.trim().toUpperCase().indexOf('VARCHAR') >= 0) {
            value = genUtils.replaceInString(value, "'", "''");
            value = "'" + value + "'";
        }
        return value;
    }
    createTable = function (caller, fields) {
        var name = this.getTableName();
        var cmd = 'CREATE TABLE ' + name + '(id INTEGER PRIMARY KEY';
        for (var index = 0; index < fields.length; index++) {
            cmd = cmd + ', ' + fields[index].name + ' ' + fields[index].type;
        }
        cmd = cmd + ');';
        caller.executeSQLCmd(cmd);
    }
    getSource = function () {
        return this.source;
    }
    setSource = function (toSet) {
        this.source = toSet;
    }
    execute = function (caller) {
        if (this.length() < 2) {
            throw 'Invalid number of arguments!';
        }
        var fields = this.getFields();
        this.clearTable(caller);
        this.createTable(caller, fields);
        for (var index = 0; index < this.getSource().length; index++) {
            var entry = this.getSource()[index];
            this.createInsert(caller, fields, entry);
        }
    }
}

/*	This work is licensed under Creative Commons GNU LGPL License.
 License: http://creativecommons.org/licenses/LGPL/2.1/
 Version: 0.9
 Author:  Stefan Goessner/2006
 Web:     http://goessner.net/
 */
function xml2json(xml, tab) {
    var X = {
        toObj: function (xml) {
            var o = {};
            if (xml.nodeType == 1) {   // element node ..
                if (xml.attributes.length)   // element with attributes  ..
                    for (var i = 0; i < xml.attributes.length; i++)
                        o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
                if (xml.firstChild) { // element has child nodes ..
                    var textChild = 0, cdataChild = 0, hasElementChild = false;
                    for (var n = xml.firstChild; n; n = n.nextSibling) {
                        if (n.nodeType == 1)
                            hasElementChild = true;
                        else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/))
                            textChild++; // non-whitespace text
                        else if (n.nodeType == 4)
                            cdataChild++; // cdata section node
                    }
                    if (hasElementChild) {
                        if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                            X.removeWhite(xml);
                            for (var n = xml.firstChild; n; n = n.nextSibling) {
                                if (n.nodeType == 3)  // text node
                                    o["#text"] = X.escape(n.nodeValue);
                                else if (n.nodeType == 4)  // cdata node
                                    o["#cdata"] = X.escape(n.nodeValue);
                                else if (o[n.nodeName]) {  // multiple occurence of element ..
                                    if (o[n.nodeName] instanceof Array)
                                        o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                    else
                                        o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                } else  // first occurence of element..
                                    o[n.nodeName] = X.toObj(n);
                            }
                        } else { // mixed content
                            if (!xml.attributes.length)
                                o = X.escape(X.innerXml(xml));
                            else
                                o["#text"] = X.escape(X.innerXml(xml));
                        }
                    } else if (textChild) { // pure text
                        if (!xml.attributes.length)
                            o = X.escape(X.innerXml(xml));
                        else
                            o["#text"] = X.escape(X.innerXml(xml));
                    } else if (cdataChild) { // cdata
                        if (cdataChild > 1)
                            o = X.escape(X.innerXml(xml));
                        else
                            for (var n = xml.firstChild; n; n = n.nextSibling)
                                o["#cdata"] = X.escape(n.nodeValue);
                    }
                }
                if (!xml.attributes.length && !xml.firstChild)
                    o = null;
            } else if (xml.nodeType == 9) { // document.node
                o = X.toObj(xml.documentElement);
            } else
                alert("unhandled node type: " + xml.nodeType);
            return o;
        },
        toJson: function (o, name, ind) {
            var json = name ? ("\"" + name + "\"") : "";
            if (o instanceof Array) {
                for (var i = 0, n = o.length; i < n; i++)
                    o[i] = X.toJson(o[i], "", ind + "\t");
                json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
            } else if (o == null)
                json += (name && ":") + "null";
            else if (typeof (o) == "object") {
                var arr = [];
                for (var m in o)
                    arr[arr.length] = X.toJson(o[m], m, ind + "\t");
                json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
            } else if (typeof (o) == "string")
                json += (name && ":") + "\"" + o.toString() + "\"";
            else
                json += (name && ":") + o.toString();
            return json;
        },
        innerXml: function (node) {
            var s = ""
            if ("innerHTML" in node)
                s = node.innerHTML;
            else {
                var asXml = function (n) {
                    var s = "";
                    if (n.nodeType == 1) {
                        s += "<" + n.nodeName;
                        for (var i = 0; i < n.attributes.length; i++)
                            s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
                        if (n.firstChild) {
                            s += ">";
                            for (var c = n.firstChild; c; c = c.nextSibling)
                                s += asXml(c);
                            s += "</" + n.nodeName + ">";
                        } else
                            s += "/>";
                    } else if (n.nodeType == 3)
                        s += n.nodeValue;
                    else if (n.nodeType == 4)
                        s += "<![CDATA[" + n.nodeValue + "]]>";
                    return s;
                };
                for (var c = node.firstChild; c; c = c.nextSibling)
                    s += asXml(c);
            }
            return s;
        },
        escape: function (txt) {
            return txt.replace(/[\\]/g, "\\\\")
                    .replace(/[\"]/g, '\\"')
                    .replace(/[\n]/g, '\\n')
                    .replace(/[\r]/g, '\\r');
        },
        removeWhite: function (e) {
            e.normalize();
            for (var n = e.firstChild; n; ) {
                if (n.nodeType == 3) {  // text node
                    if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                        var nxt = n.nextSibling;
                        e.removeChild(n);
                        n = nxt;
                    } else
                        n = n.nextSibling;
                } else if (n.nodeType == 1) {  // element node
                    X.removeWhite(n);
                    n = n.nextSibling;
                } else                      // any other node
                    n = n.nextSibling;
            }
            return e;
        }
    };
    if (xml.nodeType == 9) // document node
        xml = xml.documentElement;
    var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
    return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
}

/*	This work is licensed under Creative Commons GNU LGPL License.
 License: http://creativecommons.org/licenses/LGPL/2.1/
 Version: 0.9
 Author:  Stefan Goessner/2006
 Web:     http://goessner.net/
 */
function json2xml(o, tab) {
    var toXml = function (v, name, ind) {
        var xml = "";
        if (v instanceof Array) {
            for (var i = 0, n = v.length; i < n; i++)
                xml += ind + toXml(v[i], name, ind + "\t") + "\n";
        } else if (typeof (v) == "object") {
            var hasChild = false;
            xml += ind + "<" + name;
            for (var m in v) {
                if (m.charAt(0) == "@")
                    xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                else
                    hasChild = true;
            }
            xml += hasChild ? ">" : "/>";
            if (hasChild) {
                for (var m in v) {
                    if (m == "#text")
                        xml += v[m];
                    else if (m == "#cdata")
                        xml += "<![CDATA[" + v[m] + "]]>";
                    else if (m.charAt(0) != "@")
                        xml += toXml(v[m], m, ind + "\t");
                }
                xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
            }
        } else {
            xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
        }
        return xml;
    }, xml = "";
    for (var m in o)
        xml += toXml(o[m], m, "");
    return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
}

