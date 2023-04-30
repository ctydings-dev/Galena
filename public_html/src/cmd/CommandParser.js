class CommandParser {

    constructor() {

    }

    createCmd = function (toSet) {
        this.raw = toSet;
        this.value = new SuperString(toSet);
        this.args = [];
        this.parse();


    }

    getValue = function () {
        return this.value;
    }

    setRaw = function (toSet) {
        this.raw = toSet;
    }
    getRaw = function () {
        return this.raw;
    }

    getName = function () {
        return this.name.print();
    }

    getArgs = function () {

        return this.args;
    }
    getLength = function () {
        var ret = this.getName().length() + 2;
        for (var index = 0; index < this.getArgs().length; index++) {
            if (index > 1) {
                ret++;
            }

            ret += this.getArgs()[index].length;
        }
        return ret;
    }

    parse = function () {

        var start = this.getValue().indexOf('(');
        if (start < 1) {
            throw 'Is not a function';
        }


        var name = this.getValue().createSub(0, start);
        this.name = name;
        var rem = this.getValue().createSub(start, this.getValue().length());

        var index = this.getFuncEnd(rem);

        rem = rem.createSub(1, index);

        index = this.getParamEnd(rem);

        while (index > 0) {

            var first = rem.createSub(0, index);
            rem = rem.createSub(index + 1);
            this.args.push(this.parseParam(first));
            index = this.getParamEnd(rem);

        }
        if (rem.length() > 0) {
            this.args.push(this.parseParam(rem));
        }




    }

    parseParam = function (input) {




        var ret = {
            isFunc: function () {
                return false;
            },
            value: input,
            getValue: function () {
                return this.value;
            },
            isComment: function () {
                return this.getValue().isComment(0);
            },
            getText: function () {
                return this.getValue().print();
            }
        };



        return ret;
    }

    getParamEnd = function (input) {
        var counter = 0;

        for (var index = 0; index < input.length(); index++) {




            if (input.isValid(index) === true) {



                if (input.at(index) === '(') {

                    counter++;

                }

                if (input.at(index) === ')') {

                    counter--;

                }
                if (counter === 0) {


                    if (input.at(index) === ',') {
                        return index;
                    }
                }
            }
        }
        return -1;


    }

    getFuncEnd = function (input) {

        var counter = 0;

        for (var index = 0; index < input.length(); index++) {


            if (input.isValid(index) === true) {



                if (input.at(index) === '(') {

                    counter++;

                }

                if (input.at(index) === ')') {

                    counter--;

                }
                if (counter === 0) {
                    return index;
                }
            }
        }

        throw 'Parenthesis mismatch!';


    }

}