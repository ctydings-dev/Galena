
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


