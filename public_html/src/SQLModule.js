



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

    exportDBToLocalFile = function (fileName) {



        var data = this.exportDB();
        data = 'var loadParsedData = function(db){\nvar data = '
                + this.formatDBData(data);

        data = data + ';\n db.loadDatabase(data);}';




        data = [data];
        this.getCaller().downloadToLocal(data, fileName);
    }

    moduleCmd = function (input) {

        var cmd = input.trim();
        var toCheck = cmd.toUpperCase();



        if (toCheck.indexOf('EXPORT_LOADER') === 0) {

            cmd = cmd.trim();


            var fileName = cmd.substring(13).trim();
            if (fileName.length < 1) {

                this.getCaller().printErrorText('No file name given!');
                return;

            }




            this.exportDBToLocalFile(fileName);
            this.getCaller().printAlertText('Database exported to ' + fileName + '.');
            return true;
        }









        if (toCheck.indexOf('EXPORT') === 0) {

            cmd = cmd.trim();


            var fileName = cmd.substring(6).trim();
            if (fileName.length < 1) {

                this.getCaller().printErrorText('No file name given!');
                return;

            }




            this.exportDBToLocal(fileName);
            this.getCaller().printAlertText('Database exported to ' + fileName + '.');
            return true;
        }


        if (toCheck === 'RELOAD') {

            this.reloadDB();
            this.getCaller().printAlertText('Database reloaded.');

            return true;
        }






        return false;
    }

    execute = function (cmd) {

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
        try {


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
        } catch (err) {

            this.getCaller().printErrorText(err);
        }

    }

    printHelp = function () {
        var help = 'To use, enter the sql command in a SQLLite format. '
                + 'Several custom commands can also be used. Command parameters, where applicable, are separated by a space.';
        this.getCaller().printText(help);
        this.getCaller().printText('');
        this.getCaller().printText('Custom Commands:');
        var cols = ['Name', 'Desc.'];
        var table = new TextTable(cols);
        table.setCell(0, 0, 'DOWNLOAD file_name');
        table.setCell(0, 1, 'Downloads the DB as a binary array.');
        table.setCell(1, 0, 'RELOAD');
        table.setCell(1, 1, 'Reloads the database. Typcially used for internal use.');
        this.getCaller().printTable(table);
        this.getCaller().printText('');

        help = 'Pragma can also be used for SQLLite system operations. ' +
                'To use, type \' PRAGMA\' plus the command name/paramters.'
                + ' Please set the parameters in parenthesis.';
        this.getCaller().printText(help);
        this.getCaller().printText('');
        this.getCaller().printText('Pragma Commands:');
        cols = ['Name', 'Desc.'];
        table = new TextTable(cols);
        table.setCell(0, 0, 'TABLE_LIST');
        table.setCell(0, 1, 'Lists the tables.');
        table.setCell(1, 0, 'TABLE_INFO(table_name)');
        table.setCell(1, 1, 'Lists the columns in the table.');
        this.getCaller().printTable(table);





    }

}