var LIFE = {

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
            (currentCellState === 0 && numberOfLivingNeighbors === 3) ||
            (currentCellState === 1 && (numberOfLivingNeighbors === 2 || numberOfLivingNeighbors === 3))
            ) {
            return 1;
        } else {
            return 0;
        }
    }
};