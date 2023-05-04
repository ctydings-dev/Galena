class CreateSQLTableCommand extends Command {

    constructor() {
        super('SQL_TABLE');

    }

    getTableName = function () {
        return this.getArg(0).getText().trim().toLowerCase();


    }

    clearTable = function (caller) {
        var cmd = 'DELETE TABLE IF EXSITS ' + this.getTableName() + ';';
        caller.executeSQLCmd(cmd);



    }

    getFields = function () {

        var ret = [];


        for (var index = 1; index < this.length(); index += 1) {
            var value = this.getArg(index);
            value = value.getText();

            value = genUtils.breakupString(value, ' ');
            var name = value[0];
            var type = value[1];
            var isArray = (value[2] + '').trim().toUpperCase() === 'TRUE';

            if (this.isValidType(type) !== true) {
                throw type + ' is not a valid type!';
            }
            var toAdd = {
                name: name,
                type: type,
                isArray: isArray
            };


            ret.push(toAdd);

        }

        return ret;
    }

    isValidType = function (type) {

        type = type.trim().toUpperCase();

        if (type === 'INTEGER') {
            return true;
        }


        if (type.indexOf('VARCHAR') === 0) {
            return true;
        }

        if (type === 'FLOAT') {
            return true;
        }

        if (type === 'INTEGER') {
            return true;
        }


        if (type === 'BOOL') {
            return true;
        }

        return false;



    }

    createTable = function (caller) {

        var fields = this.getFields();


        var name = this.getTableName();

        var cmd = 'CREATE TABLE ' + name + '(id INTEGER PRIMARY KEY';

        for (var index = 0; index < fields.length; index++) {

            cmd = cmd + ', ' + fields[index].name + ' ' + fields[index].type;


        }

        cmd = cmd + ');';

        caller.executeSQLCmd(cmd);



    }

    execute = function (caller) {

        if (this.length() < 2) {
            throw 'Invalid number of arguments!';
        }

        this.clearTable(caller);
        this.createTable(caller);



    }

}