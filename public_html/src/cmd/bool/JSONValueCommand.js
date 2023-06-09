class JSONValueCommand extends Command {

    constructor() {
        super('JSON');
        this.source = null;
    }

    parsePath = function (path) {

        var ret = genUtils.breakupString(path, '.');
        return ret;
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

    getPath = function (path) {

        var curr = this.getSource();

        path = this.parsePath(path.getText());

        for (var index = 0; index < path.length; index++) {
            var child = path[index];

            curr = curr[child];
            if (genUtils.isNull(curr) === true) {
                return null;
            }



        }

        if (Array.isArray(curr) === true) {
            var ret = new CommandArray();

            for (var index = 0; index < curr.length; index++) {





                ret.push(curr[index]);

            }
            return ret;


        }


        return new CommandValue(new SuperString(curr));
    }

    execute = function () {

        var ret = new CommandArray();


        if (this.length() === 1) {
            return this.getPath(this.getArg(0));
        }


        for (var index = 0; index < this.length(); index++) {
            ret.push(this.getPath(this.getArg(index)));
        }
        return ret;


    }

}