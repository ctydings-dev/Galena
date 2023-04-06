
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
    }



};
