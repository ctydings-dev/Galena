/* global genUtils */

var TerminalArea = function (canvas) {

    this.canvas = canvas;
    this.getCanvas = function () {
        return this.canvas;
    };
    this.getContext = function () {
        if (genUtils.isNull(this.context) === true) {
            this.context = this.getCanvas().getContext('2d');
        }
        return this.context;
    };

    this.getWidth = function () {
        if (genUtils.isNull(this.width) === true) {
            this.width = this.getCanvas().getBoundingClientRect().width;
        }

        return this.width;
    };

    this.getHeight = function () {
        if (genUtils.isNull(this.height) === true) {
            this.height = this.getCanvas().getBoundingClientRect().height;
        }
        return this.height;
    };
    this.setColor = function (toSet) {
        this.getContext().fillStyle = toSet;

    };

    this.setFont = function (toSet) {
        this.getContext().font = toSet;
    };

    this.drawText = function (text, x, y) {
        this.getContext().strokeText(text, x, y);
    };

    this.clear = function () {
        this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());
    };

    this.fillRect = function (x, y, w, h) {
        this.getContext().fillRect(x, y, w, h);
    };

    this.drawBackground = function () {
        this.fillRect(0, 0, this.getWidth(), this.getHeight());
    };
//https://www.geeksforgeeks.org/how-to-sharpen-blurry-text-in-html5-canvas/
    var ctx = canvas.getContext('2d');
    window.devicePixelRatio = 1; //Blury Text
    window.devicePixelRatio = 2;      //Clear Text
    //(CSS pixels).
    //Display Size
    var ctx = this.getContext();
    canvas.style.width = this.getWidth() + "px";
    canvas.style.height = this.getHeight() + "px";

    var scale = window.devicePixelRatio;

    canvas.width = Math.floor(this.getWidth() * scale);
    canvas.height = Math.floor(this.getHeight() * scale);

    //CSS pixels for coordinate systems
    ctx.scale(scale, scale);
    ctx.font = '10px Courier New';

    ctx.textBaseline = 'middle';




};