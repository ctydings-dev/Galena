



class SQLModule extends BaseModule {

    constructor(source) {
        super('SQL');
        this.source = source;
        this.createDatabase();
        this.cmdCounter = 0;
        this.cmdCounterThreshold = 150;


    }

    getCmdCounter = function () {
        return this.cmdCounter;
    }

    getCmdResetThreshold = function () {
        return this.cmdCounterThreshold;
    }

    incrementCmdCounter = function () {
        this.cmdCounter++;
    }

    resetCmdCounter = function () {
        this.cmdCounter = 0;
    }

    needReset = function () {
        return this.getCmdCounter() >= this.getCmdResetThreshold();

    }

    getSource = function () {
        return this.source;
    }

    getDatabase = function () {
        return this.db;
    }

    closeDatabase = function () {
        this.getDatabase().close();
    }

    createDatabase = function () {
        this.db = new this.source.Database();
    }

    loadDatabase = function (data) {
        this.db = new this.source.Database(data);


    }

    reloadDB = function () {

        var data = this.exportDB();
        this.closeDatabase();
        this.loadDatabase(data);
        this.resetCmdCounter();

    }

    exportDB = function () {


        var data = this.getDatabase().export();
        return data;

    }

    formatDBData = function (data) {

        if (data.length < 1) {
            return '[]';
        }

        var ret = '[' + data[0];
        for (var index = 1; index < data.length; index++) {
            ret = ret + ',' + data[index];

        }

        ret = ret + ']';



        return ret;
    }

    exportDBToLocal = function (fileName) {

        var data = this.exportDB();
        data = [this.formatDBData(data)];
        this.getCaller().downloadToLocal(data, fileName);

    }

    moduleCmd = function (input) {

        var cmd = input.trim();
        var toCheck = cmd.toUpperCase();

        if (toCheck.indexOf('EXPORT') === 0) {

            cmd = cmd.trim();


            var fileName = cmd.substring(6).trim();
            if (fileName.length < 1) {

                this.getCaller().printText('No file name given!');
                return;

            }


            this.exportDBToLocal(fileName);
            this.getCaller().printText('Database exported to ' + fileName + '.');
            return true;
        }


        if (toCheck === 'RELOAD') {

            this.reloadDB();
            this.getCaller().printText('Database reloaded.');

            return true;
        }






        return false;
    }

    execute = function (cmd, print) {

        if (genUtils.isNull(print) === true) {
            print = true;
        }



        if (this.moduleCmd(cmd) === true) {
            return;
        }
        this.incrementCmdCounter();
        if (this.needReset() === true) {
            this.reloadDB();
        }



        if (print === true) {
            this.getCaller().printText(cmd);
        }
        const stmt = this.getDatabase().prepare(cmd);
        stmt.getAsObject(); // {col1:1, col2:111}

        // Bind new values
        stmt.bind();

        var table = null;

        var counter = 0;


        while (stmt.step()) { //
            const row = stmt.getAsObject();
            if (counter === 0) {

                var cols = [];
                for (var prop in row) {
                    cols.push(prop + '');

                }

                table = new TextTable(cols);
            }

            var index = 0;
            for (var prop in row) {
                var value = row[prop];
                table.setCell(counter, index, value);

                index++;
            }

            counter++;

        }
        if (genUtils.isNull(table) !== true) {
            this.getCaller().printTable(table);
        }


        if (print === true) {
            this.getCaller().printText('');
        }

    }

}