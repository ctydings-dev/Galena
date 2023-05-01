class JSONTreeCommand extends Command {

    constructor() {
        super('TREE');
        this.source = null;
    }

    setSource = function (toSet) {
        this.source = toSet;
    }

    getSource = function () {
        if (genUtils.isNull(this.source) === true) {
            throw 'No source!';
        }
        return this.source;
    }

    parseObj = function (input, caller, padding, limit) {

        if (limit < 0) {
            return;
        }
        for (var prop in input) {

            caller.print(padding + prop);
            var sub = input[prop];
            if (sub !== (sub + '')) {
                this.parseObj(sub, caller, padding + '  ', limit - 1);
            }
        }






    }

    execute = function (caller) {

        if (this.length() === 1) {

            if (this.getArg(0).getValue() < 1) {
                return;
            }


        }

        this.parseObj(this.getSource(), caller, ' ', 10);
        this.addArg(new CommandValue(0));
        return null;
    }
}