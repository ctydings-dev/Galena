
var TerminalPalette = function () {

    this.dayBackgroundColor = '#FFFFFF';
    this.dayTextColor = '#000000';


    this.nightBackgroundColor = '#2c333d';
    this.nightTextColor = '#5bc7a0';


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



    this.getBackgroundColor = function () {
        return this.backgroundColor;
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
    };

    this.setNightColors = function () {

        this.setTextColor(this.getNightTextColor());
        this.setBackgroundColor(this.getNightBackgroundColor());
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


