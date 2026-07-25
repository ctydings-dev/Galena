class GraphicalModule extends BaseModule {

    constructor(name) {
        super(name);
    }

    activate(caller) {
    }

    getDatabase() {
        return this.db;
    }

    execute(cmd) {
        var width = this.getWidth();
        var height = this.getHeight();
        var drawer = this.createDrawer();
        this.createGraphObject(width, height, drawer);
    }

    getWidth() {

        return this.getCaller().getTerminal().getArea().getWidth() - 20;
    }

    getHeight() {

        throw 0;
    }
    createDrawer() {
        var ret = {
            caller: this,
            getCaller: function () {
                return this.caller;
            },
            contains: function (x, y, event) {
                if (x < 0) {
                    return false;
                }
                if (y < 0) {
                    return false;
                }
                if (x > this.getCaller().getWidth()) {
                    return false;
                }

                if (y > this.getCaller().getHeight()) {
                    return false;
                }
                return true;

            },
            fireMouseEvent: function (x, y, event) {
                return false;
            }
        };
        return ret;
    }

    createGraphObject(width, height, drawer) {
        var terminal = this.getCaller().getTerminal();
        var gross = height;
        height = gross / terminal.getPalette().getFontHeight() * 1;
        height = Math.ceil(height) + 1;

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
            drawer: drawer,
            getDrawer: function () {
                return this.drawer;
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
                        };
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
                this.getDrawer().draw(helper);
            },

            contains: function (x, y, event) {

                return this.getDrawer().contains(x, y, event);
            },

            fireMouseEvent: function (x, y, event) {
                this.getDrawer().fireMouseEvent(x, y, event);
            }

        };
        this.getCaller().getTerminal().addOutput(toAdd);
    }

}