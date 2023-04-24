var TerminalSystem = function (canvas, useVerbose) {

    this.terminal = new Terminal(canvas);
    this.verbose = useVerbose;
    this.keySet = new KeySet();
    this.systemKey = '!';
    this.mode = null;
    this.modes = [];
    this.verbose = true;
    this.isVerbose = function () {
        return this.verbose === true;
    };
    this.setVerbose = function (toSet) {

        this.verbose = toSet === true;
    };
    this.getModes = function () {
        return this.modes;
    };
    this.addModule = function (toAdd) {

        try {
            toAdd.caller = this;
            toAdd.getCaller = function () {
                return this.caller;
            };
            var name = toAdd.getName().trim().toUpperCase();
            this.getModes()[name] = toAdd;
            if (this.hasMode() === false) {
                this.setMode(name);
            }
        } catch (err) {
            this.printErrorText(err + '');

        }


    };
    this.hasMode = function () {
        return genUtils.isNull(this.getMode()) !== true;
    };
    this.executeModeCommand = function (cmd) {
        try {
            if (genUtils.isNull(this.getMode) === true) {
                throw 'No mode has been selected!';
            }
            this.getMode().execute(cmd);
        } catch (err) {
            throw err;
        }
    };
    this.getMode = function () {
        return this.getModes()[this.getModeName()];
    };

    this.getModeName = function () {
        return this.mode;
    };

    this.setMode = function (toSet) {
        var orig = this.getMode();
        try {
            toSet = toSet + '';
            toSet = toSet.trim().toUpperCase();

            if (genUtils.isNull(this.getModes()[toSet]) === true) {
                throw toSet + ' is not a valid mode!';
            }
            this.mode = toSet;
            this.getMode().activate(this);
            if (this.getMode().hasIntroText()) {
                this.printAlertText(this.getMode().getIntroText());
            }
        } catch (err) {
            this.printErrorText(err + '');

            this.mode = orig;
            this.printErrorText('Mode reset to ' + this.getModeName() + '!');
        }

    };
    this.getSystemKey = function () {
        return this.systemKey;
    };
    this.getKeySet = function () {
        return this.keySet;
    };
    this.paint = function () {
        this.getTerminal().paint();
    };
    this.getTerminal = function () {
        return this.terminal;
    };
    this.appendInput = function (toAppend) {
        this.getTerminal().appendInput(toAppend);
    };
    this.processDownEvent = function (event) {

        var value = this.getKeySet().processDownEvent(event);

        if (value.isUnknown() === true) {

            this.printText(value.getValue() + ' is not a recognized key!');
            this.paint();
            return;
        }

        if (value.furtherProcess() === false) {
            this.paint();
            return;
        }


        this.processKey(value);
        this.paint();
    };
    this.processUpEvent = function (event) {
        this.getKeySet().processUpEvent(event.keyCode);
        this.paint();
    };
    this.printVerbose = function (toPrint) {
        if (this.isVerbose() === true) {
            this.printText(toPrint);
        }

    };
    this.printText = function (toPrint) {
        this.getTerminal().addTextOutput(toPrint);
    };

    this.printErrorText = function (toPrint) {

        this.getTerminal().addErrorTextOutput('' + toPrint);

    };

    this.printAlertText = function (toPrint) {
        this.getTerminal().addAlertTextOutput(toPrint);
    };





    this.processCmd = function () {
        var input = this.getTerminal().getInput();
        input = input.trim();
        if (input.indexOf(this.getSystemKey()) === 0) {

            this.executeSystemCommand(input);
            this.getTerminal().clearInput();
            return;
        }
        try {
            this.executeModeCommand(input);
        } catch (err) {
            this.printErrorText(err);
        }
        this.getTerminal().clearInput();
    };
    this.processKey = function (key) {
        if (key.isBackspace() === true) {

            this.getTerminal().trimInput();
            return;
        }

        if (key.isUp() === true) {

            if (key.isShift() === true) {
                this.getTerminal().incrementInputIndex();
                this.getTerminal().setOldInput();
                return;
            }

            this.getTerminal().incrementVerticalOffset();
            return;
        }

        if (key.isDown() === true) {
            if (key.isShift() === true) {
                this.getTerminal().decrementInputIndex();
                this.getTerminal().setOldInput();
                return;
            }



            this.getTerminal().decrementVerticalOffset();
            return;
        }
        if (key.isLeft() === true) {
            this.getTerminal().incrementHorizontalOffset();
            return;
        }

        if (key.isRight() === true) {
            this.getTerminal().decrementHorizontalOffset();
            return;
        }


        if (key.isEnter() === true) {
            this.processCmd();
            this.getTerminal().setVerticalOffset(0);
            this.getTerminal().setHorizontalOffset(0);
            this.getTerminal().oldInputIndex = -1;
            return;
        }



        this.getTerminal().appendInput(key.getValue());
    };

    this.printTable = function (table) {

        var len = this.getTerminal().getTextColCount();
        var out = table.toArray(len);
        this.printArray(out);


    };


    this.printArray = function (toPrint) {


        for (var index = 0; index < toPrint.length; index++) {
            this.printText(toPrint[index] + '');
        }

    };

    this.downloadImageToLocal = function (fileName) {


        var data = this.getTerminal().getPNG();
        var anchorTag = document.createElement('a');
        anchorTag.href = data;
        anchorTag.target = '_blank';
        anchorTag.download = fileName;
        document.body.appendChild(anchorTag);
        anchorTag.click();
        document.body.removeChild(anchorTag);

    };





    this.downloadToLocal = function (data, fileName) {


//Where this code was copied from tag is lost, will replace once found.
//I believe that it came from https://stackoverflow.com/questions/3749231/
//download-file-using-javascript-jquery

        var file = new Blob(data, {
            type: 'text'
        });
        var fileURL = URL.createObjectURL(file);
// create an anchor and click on it.
        var anchorTag = document.createElement('a');
        anchorTag.href = fileURL;
        anchorTag.target = '_blank';
        anchorTag.download = fileName;
        document.body.appendChild(anchorTag);
        anchorTag.click();
        document.body.removeChild(anchorTag);
    };


    this.executeSystemCommand = function (input) {
        this.getTerminal().clearInput();
        if (input.length < 1) {
            this.printErrorText('No command was given!');
            return;
        }
        input = input.substring(1);
        var orig = [];
        var broken = genUtils.breakupString(input, ' ');
        for (var index in broken) {
            orig.push(broken[index]);
            broken[index] = broken[index].trim().toUpperCase();
        }

        if (broken.length < 1) {

            this.printErrorText('No command was given!');
            return;
        }

        if (broken[0] === 'HELP') {

            if (broken.length > 1) {


                for (var index = 1; index < broken.length; index++) {
                    var mod = this.getModes()[broken[index]];
                    if (genUtils.isNull(mod) === true) {

                        this.printErrorText(broken[index] + ' is not a listed module!');

                    } else
                    {
                        mod.printHelp();
                    }

                }

                return;


            }


            this.getMode().printHelp();



            return;
        }






        if (broken[0] === 'MODE')
        {
            if (broken.length > 1) {
                //this.printText('The mode is : ' + this.getMode());



                var mode = broken[1];
                try {
                    this.printVerbose('Setting mode to ' + mode + '.');
                    this.setMode(mode);
                    return;

                } catch (err) {
                    this.printText(err);
                }

            }
        }



        if (broken[0] === 'MODE' || broken[0] === 'MODES') {

            this.printText('Registered modes:');
            for (var mode in this.getModes()) {

                if (this.getModeName() === mode) {
                    this.printAlertText('   ' + mode + ' <- CURRENT');
                } else
                {
                    this.printText('   ' + mode);

                }


            }



            return;
        }















        if (broken[0] === 'SAVE') {


            if (broken.length !== 2) {

                this.printErrorText('A file name must be provided for the \n\
save function!');

                return;
            }

            var out = '';
            var output = this.getTerminal().getOutput();

            for (var index = 0; index < output.length; index++) {
                out = out + output[index].getValue() + '\n';
            }

            var fileName = broken[1];


            this.downloadToLocal([out], fileName);
            return;
        }




        if (broken[0] === 'IMAGE') {


            if (broken.length !== 2) {

                this.printErrorText('A file name must be provided for the \n\
save function!');

                return;
            }

            var out = '';
            var output = this.getTerminal().getOutput();

            for (var index = 0; index < output.length; index++) {
                out = out + output[index].getValue() + '\n';
            }

            var fileName = broken[1];

            this.downloadImageToLocal(fileName);

            return;
        }











        if (broken[0] === 'FONT')
        {



            this.getTerminal().getPalette().setNightColors();
            var font = '';

            for (var index = 1; index < broken.length; index++) {

                font = font + orig[index] + ' ';

            }
            this.getTerminal().getPalette().setFont(font);


            return;
        }

        if (broken[0] === 'DAY') {



            this.getTerminal().getPalette().setDayColors();




            return;
        }

        if (broken[0] === 'NIGHT') {



            this.getTerminal().getPalette().setNightColors();




            return;
        }







        if (broken[0] === 'CLEAR') {
            this.getTerminal().addSplash(true);
            if (broken[1] === 'ALL') {
                this.getTerminal().clearOutput();
            }


            return;
        }




        this.printErrorText('Command ' + broken[0] +
                ' is not a recognized command!');








    };
    var caller = this;
    window.addEventListener("keydown", function () {
        caller.processDownEvent(event);
    });
    window.addEventListener("keyup", function () {
        caller.processUpEvent(event);
    });
    this.paint();
};