describe("Life", function() {

    describe("Getting and setting cell state", function() {

        beforeEach(function() {
            LIFE._cellStates = [
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ];
        });

        describe("Getting cell state", function() {

            it("Returns live for a live cell", function() {
               LIFE._cellStates[0][0] = true;
               expect(LIFE.getCellState({x: 0, y: 0})).toEqual(true);
            });

            it("Returns dead for a dead cell", function() {
                LIFE._cellStates[0][0] = false;
                expect(LIFE.getCellState({x: 0, y: 0})).toEqual(false);
            });

           it("Returns dead for undefined x", function() {
                expect(LIFE.getCellState({x: 3, y: 0})).toEqual(false);
                expect(LIFE.getCellState({x: -1, y: 0})).toEqual(false);
            });

            it("Returns dead for undefined y", function() {
                expect(LIFE.getCellState({x: 0, y: 3})).toEqual(false);
                expect(LIFE.getCellState({x: 0, y: -1})).toEqual(false);
            });
        });

        describe("Setting cell state", function() {

            var expectSetsCellState = function(coordinate, state) {
                LIFE.setCellState(coordinate, state);
                expect(LIFE._cellStates[coordinate.x][coordinate.y]).toEqual(state);
            };

            it("Sets a cell to dead", function() {
                expectSetsCellState({x: 0, y: 0}, false);
            });

            it("Sets a cell to live", function() {
                expectSetsCellState({x: 0, y: 0}, true);
            });

            it("Sets an undefined cell to dead", function() {
                expectSetsCellState({x: 3, y: 0}, true);
                expectSetsCellState({x: 0, y: 3}, true);
            });

            it("Throws a RangeError for a negative coordinates", function() {
                expect(function() {LIFE.setCellState({x: -1, y: 0}, false)}).toThrow(new RangeError);
                expect(function() {LIFE.setCellState({x: 0, y: -1}, false)}).toThrow(new RangeError);
            });
        });

    });

    describe("Get Neighbors", function() {
        it("Returns 8 cells given a single cell", function() {
            expect(LIFE.getNeighbors(1, 1).length).toEqual(8);
        });

        it("Returns expected cells for 1, 1", function() {
           var expectedCells = [
               [0,0], [0,1], [0,2], [1,0], [1,2], [2,0], [2,1], [2,2]
           ];
           expect(LIFE.getNeighbors(1, 1)).toEqual(expectedCells);
        });

        it("Returns expected cells for 0, 0", function() {
            var expectedCells = [
                [-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]
            ];
            expect(LIFE.getNeighbors(0, 0)).toEqual(expectedCells);
        });

        it("Returns expected cells for 2, 2", function() {
            var expectedCells = [
                [1,1], [1,2], [1,3], [2,1], [2,3], [3,1], [3,2], [3,3]
            ];
            expect(LIFE.getNeighbors(2, 2)).toEqual(expectedCells);
        });
    });

    describe("Count Live Neighbors", function() {
        describe("Center cell in a block of 9", function() {

            var grid = [
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ];

            it("Returns false for all dead neighbors", function() {
                expect(LIFE.countLiveNeighbors(1, 1, grid)).toEqual(0);
            });
        });
    });

    describe("Get next cell state", function() {
        var expectReturnsDead = function(currentState, numberOfLiveNeighbors) {
            return expect(LIFE.getNextCellState(currentState, numberOfLiveNeighbors)).toEqual(false);
        };

        var expectReturnsLive = function(currentState, numberOfLiveNeighbors) {
            return expect(LIFE.getNextCellState(currentState, numberOfLiveNeighbors)).toEqual(true);
        };

        describe("Current cell state is dead", function() {

            var currentState = false;

            it("returns dead given a totally dead matrix", function() {
                expectReturnsDead(currentState, 0);
            });

            it("returns dead given 2 live neighbors", function() {
                expectReturnsDead(currentState, 2);
            });

            it("returns dead given more than 3 live neighbors", function() {
                expectReturnsDead(currentState, 4);
            });

            it("returns live given exactly 3 live neighbors", function() {
               expectReturnsLive(currentState, 3);
            });
        });

        describe("Current cell state is alive", function() {

            var currentState = true;

            it("returns dead given all dead neighbors", function() {
                expectReturnsDead(currentState, 0);
            })

            it("returns dead given more than 3 live neighbors", function() {
                expectReturnsDead(currentState, 4);
            });

            it("returns dead given fewer than 2 live neighbors", function() {
                expectReturnsDead(currentState, 1);
            });

            it("returns live given 2 or 3 live neighbors", function() {
                expectReturnsLive(currentState, 2);
                expectReturnsLive(currentState, 3);
            });
        });
    });
});

  