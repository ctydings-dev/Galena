
/* global genUtils */

class TextTable {

    constructor(columns) {
        this.columns = columns;
        this.data = [];
        this.axis = '+';
        this.verticalBorder = '|';
        this.horizontalBorder = '-';

    }

    getAxis = function () {
        return this.axis;
    }
    getVerticalBorder = function () {
        return this.verticalBorder;
    }
    getHorizontalBorder = function () {
        return this.horizontalBorder;
    }

    getColumns = function () {
        return this.columns;
    }

    getColumn = function (index) {
        return this.getColumns()[index];
    }

    getData = function () {
        return this.data;
    }

    getRowCount = function () {

        return this.getData().length;
    }

    getColCount = function () {
        var ret = 0;
        for (var index = 0; index < this.getRowCount(); index++) {
            var value = this.getRow(index).length;
            if (value > ret) {
                ret = value;
            }
        }
        return ret;
    }

    getRow = function (index) {


        if (genUtils.isNull(this.getData()[index]) === true) {
            this.getData()[index] = [];
        }

        return this.getData()[index];
    }

    getCell = function (row, col) {

        var ret = this.getRow(row)[col];
        if (genUtils.isNull(ret) === true) {
            this.setCell(row, col, '');
            return this.getCell(row, col);
        }
        return ret;
    }

    setCell = function (row, col, value) {

        this.getRow(row)[col] = value;
    }

    getCellLength = function (row, col) {
        var value = this.getCell(row, col) + '';
        return value.length;
    }

    getLengthData = function () {

        var yEnd = this.getRowCount();
        var xEnd = this.getColCount();
        var ret = [];
        ret[0] = [];

        for (var col = 0; col < this.getColumns().length; col++) {

            ret[0][col] = this.getColumn(col).length;


        }
        for (var y = 0; y < yEnd; y++) {
            ret[y + 1] = [];
            for (var x = 0; x < xEnd; x++) {

                ret[y + 1][x] = this.getCellLength(y, x);
            }
        }

        return ret;
    }

    getColStats = function () {

        var lens = this.getLengthData();
        var ret = [];
        var grandMax = 0;
        for (var col = 0; col < lens[0].length; col++) {
            var max = 0;
            var total = 0
            for (var row = 0; row < lens.length; row++) {
                var value = lens[row][col];
                if (max < value) {
                    max = value;
                }
                total += value;
            }
            grandMax += max;
            ret[col] = {
                max: max,
                total: total
            };
        }
        var grandTotal = 0;
        for (var x = 0; x < ret.length; x++) {
            grandTotal += ret[x].max;
            var ratio = ret[x].max / grandMax;
            ret[x].ratio = ratio;
        }

        var stats = {
            cols: ret,
            total: grandTotal

        };
        return stats;
    }

    getColLengths = function (length) {

        length = length - this.getColCount() - 1;
        var lens = this.getColStats();
        var ret = [];
        if (lens.total <= length) {
            lens = lens.cols;
            for (var x = 0; x < lens.length; x++) {

                ret[x] = lens[x].max;

            }
            return ret;
        }


        for (var x = 0; x < lens.cols.length; x++) {

            ret[x] = lens.cols[x].ratio * length;
            ret[x] = Math.floor(ret[x]);
            if (ret[x] < 1) {
                ret[x] = 1;
            }

        }

        var col = 0;

        while (this.calcTotalHelper(ret) < length) {

            ret[col]++;
            col++;

            if (col >= ret.length) {
                col = 0;
            }
        }
        return ret;
    }

    calcTotalHelper = function (cols) {
        var ret = 0;
        for (var x = 0; x < cols.length; x++) {
            ret += cols[x];
        }
        return ret;

    }

    createFillerHelper = function (length, value) {
        var ret = value + '';
        while (ret.length < length) {

            ret = ret + value;


        }


        if (ret.length > length) {

            ret = ret.substring(0, length);

        }
        return ret;
    }

    createBlankHelper = function (length) {
        return this.createFillerHelper(length, '       ');
    }

    createHorizontalRow = function (lengths) {

        var ret = [];

        for (var col = 0; col < lengths.length; col++) {

            ret[col] = this.createFillerHelper(lengths[col], this.getHorizontalBorder());

        }



        return ret;
    }

    addCellToDataHelper = function (data, length, ret, col) {

        ret[col] = [];
        var counter = 0;
        while (data.length > length) {
            var sub = data.substring(0, length);
            data = data.substring(length);
            ret[col].push(sub);
            counter++;

        }

        if (data.length > 0) {

            while (data.length < length) {
                data = data + ' ';
            }

            counter++;
            ret[col].push(data);
        }
        return counter;


    }

    rowToText = function (data, lengths)
    {
        var ret = [];
        var max = 0;
        for (var col = 0; col < data.length; col++) {
            var len = this.addCellToDataHelper(data[col], lengths[col], ret, col);
            if (max < len) {
                max = len;
            }
        }

        for (var col = 0; col < ret.length; col++) {

            var blank = this.createBlankHelper(lengths[col]);
            while (ret[col].length < max) {
                ret[col].push(blank);
            }
        }
        return ret;
    }

    addRowData = function (data, toAdd) {
        var height = toAdd[0].length;
        var start = data.length;

        for (var row = 0; row < height; row++) {
            data[row + start] = [];

            for (var col = 0; col < toAdd.length; col++) {
                data[row + start][col] = toAdd[col][row];

            }


        }


        return data;
    }

    toArray = function (length) {
        var lens = this.getColLengths(length);


        var parsed = [];
        parsed.push(this.createHorizontalRow(lens));
        var titleLen = 1;
        for (var row = -1; row < this.getRowCount(); row++) {

            var toParse = this.getColumns();
            if (row >= 0) {
                toParse = this.getRow(row);
            }
            var toAdd = this.rowToText(toParse, lens);

            this.addRowData(parsed, toAdd);
            if (row === -1) {
                titleLen = toAdd[0].length;
            }

        }
        var ret = [];

        var axis = this.getAxis();
        var delim = this.getVerticalBorder();
        ret.push(this.rowToString(parsed[0], this.getAxis()));



        for (var row = 1; row < parsed.length; row++) {

            ret.push(this.rowToString(parsed[row], delim));
            if (row === titleLen) {

                ret.push(this.rowToString(parsed[0], this.getAxis()));

            }



        }



        ret.push(this.rowToString(parsed[0], this.getAxis()));
        return ret;


    }

    rowToString = function (data, delimiter) {

        var ret = delimiter;

        for (var x = 0; x < data.length; x++) {
            ret = ret + data[x] + delimiter;



        }
        return ret;
    }

    dataToString = function (data) {
        var ret = [];
        ret.push(this.rowToString(data[0]), this.getAxis());
        for (var col = 1; col < data.length; col++) {
            ret.push(this.rowToString(data[col]), this.getVerticalBorder());
        }
        return ret;
    }

}

