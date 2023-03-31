
var TerminalPalette = function () {

    this.dayBackgroundColor = '#000000';
    this.dayTextColor = '#FFFFFF';
    this.getDayBackgroundColor = function () {
        return this.dayBackgroundColor;
    };
    this.getDayTextColor = function () {
        return this.dayTextColor;
    };

    this.getBackgroundColor = function () {
        return this.backgroundColor;
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
    };

    this.textFont = '';

    this.getFont = function () {
        return this.textFont;
    };

    this.getFontHeight = function () {
        return 10;
    };
    this.getFontWidth = function () {
        return 10;
    };



    this.setDayColors();








};


