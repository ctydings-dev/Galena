
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
        85: 'upper',
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
    };

    this.shift = false;
    this.alt = false;
    this.cntrl = false;
    this.isShift = function () {
        return this.shift === true;
    };
    this.altShift = function () {
        this.shift = !this.isShift();
    };
    this.isAlt = function () {
        return this.alt === true;
    };
    this.isCntrl = function () {
        return this.cntrl === true;
    };
    this.altAlt = function () {
        this.alt = !this.isAlt();
    };
    this.altCntrl = function () {
        this.cntrl = !this.isCntrl;
    };

    this.processUpEvent = function (code) {
        if (code === this.shiftKey) {
            this.altShift();
            return;
        }
        if (code === this.altKey) {
            this.altAlt();
            return;
        }
        if (code === this.cntrlKey) {
            this.altCntrl();
            return;
        }



    };




    this.processDownEvent = function (code) {
        var ret = {
            value: null,
            alt: this.isAlt(),
            cntrl: this.isCntrl(),
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
            }
        };

        if (this.isShift() === true) {

            ret.setValue(this.upper[code]);

        } else
        {
            ret.setValue(this.lower[code]);
        }

        if (ret.hasValue() === true) {
            return ret;
        }

        if (code === this.shiftKey) {
            this.altShift();
            ret.process = false;
            return ret;
        }
        if (code === this.altKey) {
            this.altAlt();
            ret.alt = this.isAlt();
            ret.process = false;
            return ret;
        }
        if (code === this.cntrlKey) {
            this.altCntrl();
            ret.cntrl = this.isCntrl();
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


        alert(code + ' IS NOT A RECOGNIZED FUNCTION');




    };









};