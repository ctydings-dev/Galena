
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
