class SuperString {
    constructor(value) {
        this.value = value + '';


        this.special = [];
        this.calcStatus();
    }

    makeSpecial = function (index) {
        if (genUtils.isNull(this.special[index]) === false) {
            return;
        }

        this.special[index] = {

            print: true,
            ignore: false,
            comment: false


        };

    }

    ignore = function (index) {

        this.getSpecial(index).ignore = true;



    }

    comment = function (index) {
        this.getSpecial(index).comment = true;
    }

    noPrint = function (index) {



        this.getSpecial(index).print = false;
    }

    getSpecial = function (index) {

        if (genUtils.isNull(this.special[index]) === true) {
            this.makeSpecial(index);
        }
        return this.special[index];
    }

    isIgnore = function (index) {

        return this.getSpecial(index).ignore === true;

    }

    isComment = function (index) {
        return  this.getSpecial(index).comment === true;
    }

    isNoPrint = function (index) {

        return this.getSpecial(index).print === false;

    }

    length = function () {
        return this.getValue().length;
    }
    at = function (position) {

        return this.getValue()[position];

    }

    contains = function (target) {
        return this.indexOf(target) >= 0;

    }

    calcStatus = function () {
        var cmt = null;


        for (var index = 0; index < this.length(); index++)
        {

            if (this.isIgnore(index) === false)
            {
                var temp = this.at(index);
                if (this.at(index) === '\\') {
                    if (index + 1 < this.length()) {
                        this.ignore(index + 1);
                        this.noPrint(index);
                    } else
                    {
                        throw 'Illegal Escape';
                    }
                }

                if (genUtils.isNull(cmt) === true) {


                    if (this.at(index) === "'" || this.at(index) === '"') {
                        this.comment(index);
                        cmt = this.at(index);
                        this.noPrint(index);
                    }

                } else
                {
                    this.comment(index);
                    if (this.at(index) === cmt) {
                        this.noPrint(index);
                        cmt = null;
                    }




                }








            }






        }

    }

    print = function (start, end) {

        if (genUtils.isNull(start) === true) {
            start = 0;
        }

        if (genUtils.isNull(end) === true) {
            end = this.length();
        }


        var ret = '';
        for (var index = start; index < end; index++) {
            var print = this.isNoPrint(index);
            var toPrint = this.at(index).toUpperCase();

            if (this.isComment(index) === true) {
                toPrint = toPrint.toLowerCase();
            }

            if (print === false) {
                ret += toPrint;
            }

        }

        return ret;
    }

    isValid = function (index) {
        if (this.isComment(index) === true) {
            return false;
        }

        if (this.isIgnore(index) === true) {
            return false;
        }

        return true;


    }

    createSub = function (start, end) {
        var sub = this.getValue().substring(start, end);
        sub = new SuperString(sub);
        var counter = 0;
        for (var index = start; index < end; index++) {
            sub.special[counter] = this.getSpecial(index);
            counter++;
        }
        return sub;
    }

    indexOf = function (target, start) {

        if (genUtils.isNull(start) === true) {
            start = 0;
        }
        for (var index = 0; index < this.length(); index++)
        {
            if (this.isComment(index) === false && this.isIgnore(index) === false) {

                if (this.at(index) === target) {
                    return index;
                }

            }
        }

        return -1;
    }

    getValue = function () {
        return this.value;
    }

}