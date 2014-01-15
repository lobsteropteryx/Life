describe("Life", function() {

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
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];

            it("Returns 0 for all dead neighbors", function() {
                expect(LIFE.countLiveNeighbors(1, 1, grid)).toEqual(0);
            });
        });
    });

    describe("Get next cell state", function() {
        var expectReturnsDead = function(currentState, numberOfLiveNeighbors) {
            return expect(LIFE.getNextCellState(currentState, numberOfLiveNeighbors)).toEqual(0);
        };

        var expectReturnsLive = function(currentState, numberOfLiveNeighbors) {
            return expect(LIFE.getNextCellState(currentState, numberOfLiveNeighbors)).toEqual(1);
        };

        describe("Current cell state is dead", function() {

            var currentState = 0;

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

            var currentState = 1;

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

  