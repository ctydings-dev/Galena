
/* global genUtils */

class FreeTextTerminal {

    constructor(canvas, skipSetup) {
        this.palette = new TerminalPalette();
        this.area = new TerminalArea(canvas);

        this.output = [];

        this.cursor = this.createCursor();

        this.addErrorTextOutput('');






        if (skipSetup !== true) {
            this.setup();
        }
    }


getOutputHeight = function(){
return 18;
}

    createCursor = function () {
        var cursor = {};
        cursor.x = 0;
        cursor.y = 0;

        cursor.getX = function () {
            return this.x;
        }

        cursor.getY = function () {
            return this.y;
        }

        cursor.increaseX = function () {
            this.x++;

            var check = this.getCaller().getOutputText(this.getY());
            if (this.x > check.length) {
                this.increaseY();
                this.x = 0;

            }


        }

        cursor.decreaseX = function () {
            this.x--;
            if (this.x < 0) {

                if(this.getY() > 0){
                    this.decreaseY();
                   this.x = this.getCaller().getOutputText(this.getY()).length;
                    return;
                }

                this.x = 0;
            }
        }
        cursor.increaseY = function () {
            this.y++;

            if(this.getX() > this.getCaller().getOutputLength(this.getY())){
                this.x = this.getCaller().getOutputLength(this.getY());
            }


        }

        cursor.getCursorRange = function () {
            return {
                start: this.getY(),
                end: this.getY()
            };
        }

        cursor.isInRange = function (range) {
            return this.getY() === range;
        }

        cursor.getCaller = function () {
            return this.caller;
        }

        cursor.decreaseY = function () {
            this.y--;
            if (this.y < 0) {
                this.y = 0;
            }

if(this.getX() > this.getCaller().getOutputLength(this.getY())){
    this.x = this.getCaller().getOutputLength(this.getY());
}

        }
        cursor.caller = this;

        return cursor;
    }

    clearInput = function () {
        this.output = [];
        this.setMaxOutput(-1);
    }

    getArea = function () {
        return this.area;
    }

    getOutput = function () {
        return this.output;
    }

    getOutputAt = function (index) {
        return this.getOutput()[index];
    }

    getOutputLength = function(index){
        return this.getOutputText(index).length;
    }

    getOutputText = function (index) {
        var ret = this.getOutputAt(index);
        if (genUtils.isNull(ret) === true) {
            return '';
        }
        return ret.getValue(new Date());

    }

    addErrorTextOutput = function(toPrint){
this.errorText ={
emptry : false,
time : new Date(),
text : toPrint
} 


    }
    
getErrorText = function(){

if(this.errorTexxt.empty === false)
{
    return this.errorText.text;
}

return '';

}




    getCursor = function () {
        return this.cursor;
    }

    start = function () {
        var caller = this;
        this.processId = setInterval(function () {
            caller.paint();
        }, 20);


    }

    getProcessId = function () {
        return this.processId;
    }


    stop = function () {
        clearInterval(this.getProcessId())
    }

    setup = function () {
        this.start();
        this.setMaxOutput(-1);
    }

    setTextOutput = function (toAdd, position, options) {
        if (position > this.getMaxOutput()) {
            this.setMaxOutput(position);
        }

        var ret = {
            value: toAdd,
            getValue: function () {
                return this.value;
            }

        }

        this.getOutput()[position] = ret;
        return ret;


    }

    getMaxOutput = function () {
        return this.max;
    }


    setMaxOutput = function (toSet) {
        this.max = toSet;
    }

    addTextOutput = function (toAdd, options) {
        var index = this.getMaxOutput() + 1;
        this.setTextOutput(toAdd, index, options);
    }

    setLast = function(){
        
        this.last = (new Date).getTime();
    }

    inLastTime = function(){
        var diff = ((new Date()).getTime());
        diff = diff - this.last ;

        return diff < 1500;
    }

    paint = function () {
        var time = new Date();
        var xPos = 8;
        var yPos = 0;
        this.getArea().clear();
        this.getArea().setColor(this.getPalette().getBackgroundColor());
        this.getArea().drawBackground();
        this.getArea().setColor(this.getPalette().getTextColor());
        this.getArea().setFont(this.getPalette().getFont());
        var out = this.getOutput();
        var start = 0;
var test = this.getMaxOutput();
        if(this.getMaxOutput() > this.getOutputHeight()){
start = this.getMaxOutput() - this.getOutputHeight();

        }

     


        var cursorHit = false;
        for (var index = start; index <= this.getMaxOutput(); index++) {
            var toPrint = this.getOutput()[index];
            if (genUtils.isNull(toPrint) !== true) {

                if (this.getCursor().isInRange(index) === false) {
                    this.printLine(toPrint, time, index- start)
                }


            }
        }



        var range = this.getCursor().getCursorRange();
var blank = {
    getValue : function(){
        return '';
    }
}
        for (var index = range.start; index <= range.end; index++) {
            var toPrint = this.getOutput()[index];
            if (genUtils.isNull(toPrint) !== true) {
                this.printCursorLine(toPrint, time, index- start);
            }
            else {
                this.printCursorLine(blank, time, index- start);
            }

        }


    }




    getBaseVerticalPad = function () {
        return 15;
    }

    getHorizontalPad = function () {
        return 15;
    }

    formatCursorLine = function (line, time) {
        var first = line.substring(0, this.getCursor().getX());
        var last = line.substring(this.getCursor().getX());
        var toAdd = '_';
        if (time.getSeconds() % 2 == 1 && this.inLastTime() == false) {
            toAdd = '';
        }
        var ret = first + toAdd + last;
        return ret;
    }

    printCursorLine = function (toPrint, time, vertical) {
        var text = toPrint.getValue();
        text = this.formatCursorLine(text, time);
        var y = this.convertVertToIndex(vertical) + this.getBaseVerticalPad();
        var x = this.getHorizontalPad();
        this.getArea().drawText(text, x, y);

    }


    printLine = function (toPrint, time, vertical) {
        var text = toPrint.getValue();

        var y = this.convertVertToIndex(vertical) + this.getBaseVerticalPad();
        var x = this.getHorizontalPad();
        this.getArea().drawText(text, x, y);

    }

    convertVertToIndex = function (toConvert) {
        return toConvert * 20;
    }


    getPalette = function () {
        return this.palette;
    }

    decrementHorizontalOffset = function () {
        this.setLast();
        this.getCursor().increaseX();
    }

    incrementHorizontalOffset = function () {
        this.getCursor().decreaseX();
    }

    decrementVerticalOffset = function () {
        this.getCursor().increaseY();
    }

    incrementVerticalOffset = function () {
        this.getCursor().decreaseY();
    }

    appendInput = function(value){

var output = this.getOutputText(this.getCursor().getY());

var x = this.getCursor().getX();


var first = output.substring(0,x);
var second = output.substring(x);

var toSet = first + value + second;
this.setTextOutput(toSet, this.getCursor().getY());

this.getCursor().increaseX();




    }


trimInput = function(){
    var output = this.getOutputText(this.getCursor().getY());

    var x = this.getCursor().getX();
    if(x < 1){
        return;
    }

    var first = output.substring(0,x-1);
    var second = output.substring(x);


    var toSet = first +  second;
    this.setTextOutput(toSet, this.getCursor().getY());
    
this.getCursor().decreaseX();

}



}