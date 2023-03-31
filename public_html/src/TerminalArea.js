/* global genUtils */

var terminalCanvas = function (canvas) {

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
        this.getContext().fillSyle = toSet;

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








}