var LIFE = (function() { 'use strict';
    return {

        _cellStates: [],

        getNextState: function(currentState) {

            var liveCellsWithNeighbors = [];
            var x = [];
            var i;
            var cell;

            for(i = 0; i < currentState.length; i++){
                cell = currentState[i];
                liveCellsWithNeighbors.push(cell);
                liveCellsWithNeighbors.push.apply(liveCellsWithNeighbors, this.getNeighbors(cell));
            }

            for (i = 0; i < liveCellsWithNeighbors.length; i++) {
                cell = liveCellsWithNeighbors[i];
                var currentCellState = this.getNextCellState(cell);
                var liveNeighbors = this.countLiveNeighbors(cell);
                if (this.getNextCellState(currentCellState, liveNeighbors)) {
                    x.push(cell);
                }
            }
            return x;
        },

        isAlive: function(coordinates) {

            if (this._cellStates[coordinates.x] === undefined ||
                this._cellStates[coordinates.x][coordinates.y] === undefined) {
                return false;
            }
            return this._cellStates[coordinates.x][coordinates.y];
        },

        setAlive: function(coordinates) {

            if (coordinates.x < 0 || coordinates.y < 0) {
                throw new RangeError();
            }

            if (this._cellStates[coordinates.x] === undefined) {
                this._cellStates[coordinates.x] = [];
            }

            this._cellStates[coordinates.x][coordinates.y] = true;
        },

        getNeighbors: function(coordinates) {
            var neighbors = [], i, j;
            for (i = coordinates.x - 1; i <= coordinates.x + 1; i++) {
                for (j = coordinates.y - 1; j <= coordinates.y + 1; j++) {
                    if (!((i === coordinates.x) && (j === coordinates.y))) {
                        neighbors.push({x: i, y: j});
                    }
                }
            }
            return neighbors;
        },

        countLiveNeighbors: function(coordinates) {
            var neighbors, i, numberOfLiveNeighbors;
            numberOfLiveNeighbors = 0;
            neighbors = this.getNeighbors(coordinates);

            for (i = 0; i < neighbors.length; i++) {
                if (this.isAlive(neighbors[i])) {
                    numberOfLiveNeighbors += 1;
                }
            }
            return numberOfLiveNeighbors;
        },

        getNextCellState: function(currentCellState, numberOfLivingNeighbors) {
            if (
                (currentCellState === false && numberOfLivingNeighbors === 3) ||
                (currentCellState === true && (numberOfLivingNeighbors === 2 || numberOfLivingNeighbors === 3))
                ) {
                return true;
            }
            return false;
        }
    };
}());

