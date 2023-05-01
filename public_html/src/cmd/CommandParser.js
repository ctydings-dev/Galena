class CommandParser {

    constructor() {

    }

    parse = function (value) {

        value = new SuperString(value);

        var start = value.indexOf('(');
        if (start < 1) {
            throw 'Is not a function';
        }


        var name = value.createSub(0, start).print();

        var ret = new Command(name);

        var rem = value.createSub(start, value.length());

        var index = this.getFuncEnd(rem);

        rem = rem.createSub(1, index);

        index = this.getParamEnd(rem);

        while (index > 0) {

            var first = rem.createSub(0, index);
            rem = rem.createSub(index + 1);
            ret.addArg(this.parseParam(first));

            index = this.getParamEnd(rem);

        }
        if (rem.length() > 0) {

            ret.addArg(this.parseParam(rem));

        }


        return this.convertCommand(ret);

    }

    parseParam = function (input) {

        if (this.isComment(input) === true)
        {

            return new CommandQuote(input.print());
        }


        if (input.contains('(') === true) {
            return this.parse(input.getValue());
        }




        var ret = new CommandValue(input.print());




        return ret;
    }

    convertCommand = function (toConvert) {

        var ret = null;
        var name = toConvert.getName();
        name = name.trim().toUpperCase();


        if (name === 'JSON') {

            ret = new JSONValueCommand();

        }

        if (name === 'IF') {

            ret = new IFCommand();

        }
        if (name === 'NULL') {

            ret = new IsNullValueCommand();

        }

        if (name === 'TREE') {

            ret = new JSONTreeCommand();
        }



        if (genUtils.isNull(ret) === true) {
            throw name + ' is not a recognized command!';
        }

        ret.value = toConvert.value;

        return ret;

    }

    isComment = function (toTest) {
        if (toTest.length() < 1) {
            return false;
        }

        var isCmt = toTest.isComment(0);

        for (var index = 0; index < toTest.length(); index++)
        {

            if (isCmt !== toTest.isComment(index))
            {
                throw 'Comment mismatch!';
            }

        }
        return isCmt;
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