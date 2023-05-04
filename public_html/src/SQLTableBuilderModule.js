class SQLTableBuilderModule extends BaseModule {

    constructor(sql) {
        super('SQL_TABLE');
        this.sql = sql;

    }

    getSQL = function () {
        return this.sql;

    }

    reloadDB = function () {
        this.getSQL().reloadDB();

    }

    executeSQLCmd = function (cmd) {
        //  this.getSQL().execute(cmd);
        alert(cmd);
    }

    execute = function (cmd) {
        if (cmd.trim().toUpperCase().indexOf('SQL_TABLE') === 0) {

            var parser = new CommandParser();
            var parsed = parser.parse(cmd);
            parsed.execute(this);


            return;
        }

        this.getSQL().execute(cmd);

    }

}