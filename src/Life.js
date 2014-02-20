var LIFE = {

    _cellStates: [],

    getCellState: function(coordinates) {

        if (typeof this._cellStates[coordinates.x] === 'undefined' ||
            typeof this._cellStates[coordinates.x][coordinates.y] === 'undefined') {
            return false;
        }
        return this._cellStates[coordinates.x][coordinates.y];
    },

    setCellState: function(coordinates, state) {

        if (coordinates.x < 0 || coordinates.y < 0) {
            throw new RangeError;
        }

        if (typeof this._cellStates[coordinates.x] === 'undefined') {
            this._cellStates[coordinates.x] = [];
        }

        this._cellStates[coordinates.x][coordinates.y] = state;
    },

    getNeighbors: function(x, y) {
        var neighbors = [];
        for (var i = x - 1; i <= x + 1; i++) {
            for (var j = y - 1; j <= y + 1; j++) {
                if (!((i === x) && (j === y))) {
                    neighbors.push([i, j]);
                }
            }
        }
        return neighbors;
    },

    countLiveNeighbors: function(x, y, grid) {
        return 0;
    },

    getNextCellState: function(currentCellState, numberOfLivingNeighbors) {
        if (
            (currentCellState === false && numberOfLivingNeighbors === 3) ||
            (currentCellState === true && (numberOfLivingNeighbors === 2 || numberOfLivingNeighbors === 3))
            ) {
            return true;
        } else {
            return false;
        }
    }
};