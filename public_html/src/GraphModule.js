class GraphModule extends BaseModule {

    constructor(source) {
        super('GRAPH');
    }

    activate = function (caller) {
        this.db = caller.getModes()['SQL'];
        if (genUtils.isNull(this.db) === true) {

            throw 'No data source detected!';
        }


        this.introText = 'Graph Mode is using an SQL database.';
    }

    getDatabase = function () {
        return this.db;
    }

    execute = function (cmd) {

        if (cmd.trim().toUpperCase().indexOf('GRAPH') === 0) {

            var parser = new CommandParser();
            var parsed = parser.parse(cmd);
            parsed.setSQL(this.getDatabase());
            // parsed.setSource(this.getSource());
            parsed.execute(this);


            return;
        }

        //   this.getSQL().execute(cmd);

        //   throw 'Invalid Command!';



        var x = [0, 1, 2, 3, 4, 5];
        var y = [];
        for (var index in x)
        {
            var toAdd = Math.random() * 10;
            y.push(toAdd);

        }
        var width = this.getCaller().getTerminal().getArea().getWidth() - 20;
        var height = 125;
        var grapher = this.createSingleLineGrapher(x, y, width, height);
        this.createGraphObject(width, height, grapher);
    }

    convertValue = function (value, start, range, length, padding, mirror) {









        value -= start;
        length = length - padding * 2;
        var ratio = length / range;
        var ret = value * ratio;
        if (ret < 0) {
            ret = 0;
        }

        if (ret > length) {
            ret = length;
        }

        if (mirror === true) {
            length = length + padding;

            ret = length - ret + padding;


            return ret;
        }





        ret += padding;
        return ret;
    }

    convertPoint = function (x, y, xRange, yRange, xStart, yStart, width, height, xPadding, yPadding) {

        x = this.convertValue(x, xStart, xRange, width, xPadding);
        y = this.convertValue(y, yStart, yRange, height, yPadding, true);
        return {x: x, y: y};
    }

    createSingleLineGrapher = function (xData, yData, width, height, ranges, padding, colors) {

        if (xData.length !== yData.length) {

            throw 'X/Y Data Length Disconnect!';
        }


        var xMax = xData[0];
        var xMin = xMax;
        var yMax = yData[0];
        var yMin = yMax;
        for (var x = 0; x < xData.length; x++) {

            if (Number.isNaN(xData[x]) === true || Number.isNaN(yData[x]) === true)
            {
                throw 'Graph Data Must Be A Number!';
            }

            var xValue = xData[x];
            var yValue = yData[x];
            if (xValue > xMax) {
                xMax = xValue;
            }
            if (xValue < xMin) {
                xMin = xValue;
            }

            if (yValue > yMax)
            {
                yMax = yValue;
            }

            if (yValue < yMin) {
                yMin = yValue;
            }
        }

        if (genUtils.isNull(ranges) === false) {

            if (genUtils.isNull(ranges.x) === false) {

                if (genUtis.isNull(ranges.x.max) === false) {
                    xMax = ranges.x.max;
                }
                if (genUtis.isNull(ranges.x.min) === false) {
                    xMin = ranges.x.min;
                }

            }

            if (genUtils.isNull(ranges.y) === false) {

                if (genUtis.isNull(ranges.y.max) === false) {
                    yMax = ranges.y.max;
                }
                if (genUtis.isNull(ranges.y.min) === false) {
                    yMin = ranges.y.min;
                }

            }
        }

        var defPadding = 5;
        if (genUtils.isNull(padding) === true) {
            padding = {

                x: defPadding,
                y: defPadding

            };
        }

        if (genUtils.isNull(padding.x) === true) {
            padding.x = defPadding;
        }


        if (genUtils.isNull(padding.y) === true) {
            padding.y = defPadding;
        }












        var line = '#FF33CC';
        var background = '#FFFFFF';
        var border = '#000000'
        if (genUtils.isNull(colors) === false) {

            if (genUtils.isNull(colors.line) === false) {
                line = colors.line;
            }
            if (genUtils.isnUll(colors.background) === false) {
                background = colors.background;
            }
            if (genUtils.isnUll(colors.background) === false) {
                border = colors.border;
            }

        }




        var ret = {

            raw: {
                x: xData,
                y: yData,
                padding: padding,
                min: {x: xMin, y: yMin},
                max: {x: xMax, y: yMax},
                width: width,
                height: height,
                caller: this


            },
            getData: function () {
                return this.data;
            },
            calculate: function () {

                var xRange = this.raw.max.x - this.raw.min.x;
                var yRange = this.raw.max.y - this.raw.min.y;
                var parsed = [];
                parsed.x = [];
                parsed.y = []
                for (var index = 0; index < xData.length; index++) {
                    var x = xData[index];
                    var y = yData[index];
                    var toAdd = this.raw.caller.convertPoint(x, y, xRange, yRange,
                            this.raw.min.x, this.raw.min.y, this.raw.width,
                            this.raw.height, this.raw.padding.x,
                            this.raw.padding.y);
                    //parsed.push(toAdd);
                    parsed.x.push(toAdd.x);
                    parsed.y.push(toAdd.y);
                }

                this.data = parsed;
            },
            colors: {
                line: line,
                background: background,
                border: border,
            },
            graph: function (drawer, parent, area, caller) {

                drawer.drawBackground(this.colors.background, this.colors.border);
                drawer.drawLine(this.data.x, this.data.y, this.colors.line);
            }
        };
        ret.calculate();
        return ret;
    }

    createGraphObject = function (width, height, grapher) {
        var terminal = this.getCaller().getTerminal();
        var gross = height;
        height = gross / terminal.getPalette().getFontHeight() * 1;
        height = Math.ceil(height) + 1;
        //gross = height * this.getPalette().getFrontHeight();
        var toAdd = {

            height: height,
            getValue: function () {
                return 'GRAPH_OBJECT-' + this.getHeight() + 'ROWS_HIGHT';
            },
            gross: gross,
            getHeight: function () {
                return height;
            },
            getGrossHeight: function () {
                return this.gross;
            },
            width: width,
            getWidth: function () {
                return this.width;
            },
            grapher: grapher,
            getGrapher: function () {
                return this.grapher;
            },
            createDrawHelper: function (context, xPos, yPos, width, height) {
                var border = 2;
                width -= border;
                height -= border;
                var ret = {
                    xStart: xPos,
                    yStart: yPos,
                    ctx: context,
                    width: width,
                    height: height,
                    border: 2,
                    setFillStyle: function (color) {
                        this.ctx.fillStyle = color;
                    },
                    setStrokeStyle: function (color) {

                        this.ctx.strokeStyle = color;
                    },

                    fillRect: function (x, y, width, height) {

                        this.ctx.fillRect(x + this.xStart + this.border, y + this.yStart + this.border, width, height);
                    },
                    convertPoint: function (x, y) {

                        return {
                            x: x + this.xStart,
                            y: y + this.yStart
                        }

                    },
                    drawBackground: function (background, border) {


                        this.setFillStyle(border);
                        this.fillRect(0, 0, this.width + this.border * 1, this.height + this.border * 1);
                        this.setFillStyle(background);
                        this.fillRect(this.border, this.border, this.width - this.border, this.height - this.border);
                    },
                    drawLine: function (xPoints, yPoints, color) {

                        this.setStrokeStyle(color);
                        this.ctx.beginPath();
                        var point = this.convertPoint(xPoints[0], yPoints[0]);
                        this.ctx.moveTo(point.x, point.y);
                        for (var index = 0; index < xPoints.length; index++) {
                            point = this.convertPoint(xPoints[index], yPoints[index]);
                            this.ctx.lineTo(point.x, point.y);
                        }


                        this.ctx.stroke();
                    }





                };
                return ret;
            },
            draw: function (xPos, yPos, area, caller, cursorPos) {
                var ctx = area.getContext();
                var helper = this.createDrawHelper(ctx, xPos, yPos, this.getWidth(), this.getGrossHeight());
                this.getGrapher().graph(helper, this, area, caller);
            }


        };
        this.getCaller().getTerminal().addOutput(toAdd);
    }

}