class CreateSQLTableCommand extends Command {

    constructor() {
        super('SQL_TABLE');
    }

    getTableName = function () {
        return this.getArg(0).getText().trim().toLowerCase();
    }

    clearTable = function (caller) {
        var cmd = 'DROP TABLE IF EXISTS ' + this.getTableName() + ';';
        caller.executeSQLCmd(cmd);
    }

    getFields = function () {

        var ret = [];
        var hasArray = -1;
        for (var index = 1; index < this.length(); index += 1) {
            var value = this.getArg(index);
            value = value.getText();
            value = genUtils.breakupString(value, ' ');
            var name = value[0];
            var type = value[1];


            var isArray = (value[2] + '').trim().toUpperCase() === 'ARRAY';

            var source = value[3];
            if (genUtils.isNull(source) === true) {
                source = name;
            }

            if (isArray === true) {
                if (hasArray >= 0) {
                    throw 'Only one array table permitted!';
                }
                hasArray = ret.length;
            }

            if (this.isValidType(type) !== true) {
                throw type + ' is not a valid type!';
            }
            var toAdd = {
                name: name,
                type: type,
                isArray: isArray,
                source: source

            };
            ret.push(toAdd);
        }



        if (hasArray >= 0) {

            var array = ret[hasArray];
            var sub = [];
            for (var index = 0; index < ret.length; index++) {
                if (index !== hasArray) {
                    sub.push(ret[index]);
                }


            }


            sub.push(array);
            ret = sub;
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

    ignoreErrors = function () {


        return false;
    }

    createInsert = function (caller, fields, source, index) {
        var cmd = '';
        try {
            var isArray = fields[fields.length - 1].isArray === true;

            if (isArray === true) {

                if (genUtils.isNull(index) === true) {

                    index = this.getArrayLength(fields[fields.length - 1].source, source) - 1;
                    this.createInsert(caller, fields, source, index);
                    return;
                }

                if (index > 0) {
                    this.createInsert(caller, fields, source, index - 1);
                }


            }

            var end = fields.length;
            if (isArray === true) {
                end--;
            }
            var values = '';
            var valueFields = '';
            for (var sub = 0; sub < end; sub++) {

                valueFields = valueFields + fields[sub].name + ',';
                values = values + this.getValue(fields[sub], source) + ',';
            }


            if (isArray === true) {

                valueFields = valueFields + fields[fields.length - 1].name;
                var value = this.getValue(fields[fields.length - 1], source, index);
                values = values + value;
            } else
            {
                valueFields = valueFields.substring(0, valueFields.length - 1);
                values = values.substring(0, values.length - 1);
            }
            cmd = 'INSERT INTO ' + this.getTableName() + ' (' + valueFields;
            cmd = cmd + ') VALUES (' + values + ');';
            caller.executeSQLCmd(cmd);
            //
//  alert(cmd);
            //    return cmd;
        } catch (err) {

            if (this.ignoreErrors() === false) {
                throw err;
            }


        }


    }

    getArrayLength = function (name, source) {
        var cmd = new JSONValueCommand();
        cmd.addArg(new CommandValue(name));
        cmd.setSource(source);
        var value = cmd.execute();

        return value.length();


    }

    parsePath = function (path) {

        var ret = genUtils.breakupString(path, '.');
        return ret;
    }

    getPath = function (path, curr) {


        for (var index = 0; index < path.length; index++) {
            var child = path[index];

            curr = curr[child];
            if (genUtils.isNull(curr) === true) {
                return null;
            }



        }




        return curr;
    }

    getValue = function (field, source, index) {


        var path = this.parsePath(field.source);
        var value = this.getPath(path, source);




        if (genUtils.isNull(value) === true) {

            throw field.source + ' is not a valid field!';

        }

        if (index >= 0) {
            value = value[index];
        }


        if (field.type.trim().toUpperCase() === 'BLOB' || field.type.trim().toUpperCase().indexOf('VARCHAR') >= 0) {

            value = genUtils.replaceInString(value, "'", "''");
            value = "'" + value + "'";

        }


        return value;
    }

    createTable = function (caller, fields) {

        var name = this.getTableName();
        var cmd = 'CREATE TABLE ' + name + '(id INTEGER PRIMARY KEY';
        for (var index = 0; index < fields.length; index++) {

            cmd = cmd + ', ' + fields[index].name + ' ' + fields[index].type;
        }

        cmd = cmd + ');';
        caller.executeSQLCmd(cmd);
    }

    getSource = function () {
        return this.source;
    }

    setSource = function (toSet) {
        this.source = toSet;
    }

    execute = function (caller) {

        if (this.length() < 2) {
            throw 'Invalid number of arguments!';
        }

        var fields = this.getFields();
        this.clearTable(caller);
        this.createTable(caller, fields);

        for (var index = 0; index < this.getSource().length; index++) {
            var entry = this.getSource()[index];
            this.createInsert(caller, fields, entry);


        }

    }

}