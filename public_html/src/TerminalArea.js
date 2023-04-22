/* global genUtils */

class TerminalArea {

    constructor(canvas) {
        this.canvas = canvas;
        this.setup();
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