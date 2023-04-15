



class SQLModule extends BaseModule {

    constructor(source) {
        super('SQL');
        this.source = source;
        this.createDatabase();
    }

    getSource = function () {
        return this.source;
    }

    getDatabase = function () {
        return this.db;
    }

    createDatabase = function () {
        this.db = new this.source.Database();


    }

    execute = function (cmd) {
        this.getCaller().printText(cmd);
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



        }
        if (genUtils.isNull(table) !== true) {
            this.getCaller().printTable(table);
        }



        this.getCaller().printText('');

    }

}