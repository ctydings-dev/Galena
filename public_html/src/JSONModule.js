class JSONModule extends BaseModule {

    constructor() {
        super('JSON');
        this.source = [];
    }

    getSource = function () {
        return this.source;
    }

    addToSource = function (toAdd) {
        this.getSource().push(toAdd);
    }

    execute = function (cmd, entry) {





    }

    print = function (text) {

        this.getCaller().printText(text);
    }

    printResults = function (cols, results) {

        if (results.length < 1) {
            return;
        }


        var tab = new TextTable(cols);
        for (var index = 0; index < results.length; index++) {


            if (results[index].isArray() === true) {

                for (var sub = 0; sub < results[index].length(); sub++) {

                    results[index].at(sub).addToTable(tab, index, sub);


                }


            } else



            {
                results[index].addToTable(tab, index, 0);
            }


        }

        this.getCaller().printTable(tab);
    }

    length = function () {
        return this.getSource().length;
    }

    at = function (index) {
        var xml = this.getSource()[index];
        return xml;

    }

    runCmd = function (cmd, index) {

        cmd.setSource(this.at(index));
        return cmd.execute(this);

    }

    execute = function (cmd, print) {
        try {
            var parser = new CommandParser();
            var cmd = parser.parse(cmd);
            var results = [];

            var cols = [];
            if (cmd.length() > 0) {
                for (var index = 0; index < cmd.length(); index++) {

                    cols.push(cmd.at(index).getText());

                }
            }

            for (var index = 0; index < this.length(); index++) {

                var result = this.runCmd(cmd, index);
                if (genUtils.isNull(result) !== true) {
                    results.push(result);
                }

            }



            this.printResults(cols, results);
        } catch (err) {

            this.getCaller().printErrorText('Error: ' + err);

        }

    }

}