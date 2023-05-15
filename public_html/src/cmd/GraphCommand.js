class CreateGraphCommand extends Command {

    constructor() {
        super('GRAPH');
    }

    setSQL = function (toSet) {

        this.sql = toSet;
    }
    getSQL = function () {
        return this.sql;
    }

    getDataCmd = function (table, x, y) {
        var ret = 'SELECT ' + x + ' ,' + y;

        ret = ret + ' FROM ' + table;
        +';';

        return ret;


    }

    getData = function (table, xName, yName) {

        var cmd = this.getDataCmd(table, xName, yName);
        var data = this.getSQL().getData(cmd);

        var ret = {x: [], y: []};

        for (var index = 0; index < data.length; index++) {
            var x = data[index][0];
            var y = data[index][1];
            ret.x.push(x);
            ret.y.push(y);



        }


        return ret;
    }

    execute = function (caller) {

        if (this.length() < 3) {

            throw 'Too few arguments!';

        }

        var tableName = this.getArg(0).getText();
        var xName = this.getArg(1).getText();
        var yName = this.getArg(2).getText();

        var data = this.getData(tableName, xName, yName);


        var width = caller.getCaller().getTerminal().getArea().getWidth() - 20;
        var height = 125;
        var grapher = caller.createSingleLineGrapher(data.x, data.y, width, height);
        caller.createGraphObject(width, height, grapher);







    }
}