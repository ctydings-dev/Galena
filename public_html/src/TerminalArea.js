/* global genUtils */

class TerminalArea {

    constructor(canvas) {
        this.canvas = canvas;
        // this.setup();
    }

    setCanvas(toSet, width, height) {
        this.canvas = toSet;
        this.context = null;
        this.width = width;
        this.height = height;


    }

    getCanvas() {
        return this.canvas;
    }
    getContext() {
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

    getStyles() {

        var ret = {
            fill: this.getContext().fillStyle,
            stroke: this.getContext().strokeStyle

        };

        return ret;
    }

    setColor(toSet) {
        this.getContext().fillStyle = toSet;
        this.getContext().strokeStyle = toSet;
    }

    setFont(toSet) {

        this.getContext().font = toSet;
    }

    getTextMode() {

        return this.textMode;
    }

    textMode = 3

    drawText(text, x, y) {


        if (this.getTextMode() % 2 === 1) {
            this.getContext().fillText(text, x, y);
        }

        if (this.getTextMode() > 1) {
            this.getContext().strokeText(text, x, y);
        }








    }

    clear() {
        this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());
    }

    fillRect(x, y, w, h) {
        this.getContext().fillRect(x, y, w, h);
    }

    drawBackground() {
        this.fillRect(0, 0, this.getWidth(), this.getHeight());
    }
//https://www.geeksforgeeks.org/how-to-sharpen-blurry-text-in-html5-canvas/

    setup() {
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