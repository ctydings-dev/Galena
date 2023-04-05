
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
    }



};
