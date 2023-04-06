



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
        while (stmt.step()) { //
            const row = stmt.getAsObject();
            this.getCaller().printText(JSON.stringify(row));

        }
        this.getCaller().printText('');

    }

}