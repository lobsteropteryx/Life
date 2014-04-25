describe("Life", function() { 'use strict';

    describe("Object equality", function() {
       it("sucks", function() {
           expect({x: 0, y: 0} === {x: 0, y: 0}).toBeFalsy();
       });
    });

    describe("Computes next generation", function() {

        beforeEach(function() {
            LIFE._cellStates = [];
            LIFE._liveCells = [];
        });

       it("Returns no live cells, given no live cells", function() {
          expect(LIFE.getNextState()).toEqual([]);
       });

        it("Returns no live cells, given a single live cell", function() {
            LIFE.setAlive({x: 0, y: 0});
            expect(LIFE.getNextState()).toEqual([]);
        });

        it("Returns one live cell, given two live cells", function() {
            LIFE.setAlive({x: 0, y: 0});
            LIFE.setAlive(({x: 2, y: 0}));
            LIFE.setAlive({x: 2, y: 2});
            expect(LIFE.getNextState()).toEqual([{x: 1, y: 1}]);
        });
    });

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
               expect(LIFE.isAlive({x: 0, y: 0})).toEqual(true);
            });

            it("Returns dead for a dead cell", function() {
                LIFE._cellStates[0][0] = false;
                expect(LIFE.isAlive({x: 0, y: 0})).toEqual(false);
            });

           it("Returns dead for undefined x", function() {
                expect(LIFE.isAlive({x: 3, y: 0})).toEqual(false);
                expect(LIFE.isAlive({x: -1, y: 0})).toEqual(false);
            });

            it("Returns dead for undefined y", function() {
                expect(LIFE.isAlive({x: 0, y: 3})).toEqual(false);
                expect(LIFE.isAlive({x: 0, y: -1})).toEqual(false);
            });
        });

        describe("Setting cell state", function() {

            beforeEach(function() {
                LIFE._cellStates = [];
                LIFE._liveCells = [];
            });

            var expectSetsCellState = function(coordinate) {
                LIFE._liveCells = [];
                LIFE.setAlive(coordinate);
                expect(LIFE._cellStates[coordinate.x][coordinate.y]).toEqual(true);
                expect(LIFE._liveCells).toEqual([coordinate]);
            };

            it("Sets a cell to live", function() {
                expectSetsCellState({x: 0, y: 0});
                expectSetsCellState({x: 3, y: 0});
                expectSetsCellState({x: 0, y: 3});
            });

            it("Throws a RangeError for a negative coordinates", function () {
                expect(function () {LIFE.setAlive({x: -1, y: 0}); }).toThrow(new RangeError());
                expect(function () {LIFE.setAlive({x: 0, y: -1}); }).toThrow(new RangeError());
            });
        });

    });

    describe("Get Neighbors", function() {
        it("Returns 8 cells given a single cell", function() {
            expect(LIFE.getNeighbors({x: 1, y: 1}).length).toEqual(8);
        });

        it("Returns expected cells for 1, 1", function() {
            var expectedCells = [
               {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 0}, {x: 1, y: 2}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}
            ];
            expect(LIFE.getNeighbors({x: 1, y: 1})).toEqual(expectedCells);
        });

        it("Returns expected cells for 0, 0", function() {
            var expectedCells = [
                {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}
            ];
            expect(LIFE.getNeighbors({x: 0, y: 0})).toEqual(expectedCells);
        });

        it("Returns expected cells for 2, 2", function() {
            var expectedCells = [
                {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 2, y: 1}, {x: 2, y: 3}, {x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}
            ];
            expect(LIFE.getNeighbors({x: 2, y: 2})).toEqual(expectedCells);
        });
    });

    describe("Count Live Neighbors", function() {

        it("Returns 0 for all dead neighbors", function() {
            LIFE._cellStates = [
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ];
            expect(LIFE.countLiveNeighbors({x: 1, y: 1})).toEqual(0);
        });
        
        it("Returns 8 for all live neighbors", function() {
            LIFE._cellStates = [
                [true, true, true],
                [true, true, true],
                [true, true, true]
            ];
            expect(LIFE.countLiveNeighbors({x: 1, y: 1})).toEqual(8);
        });

        it("Returns 3 for all live neighbors and corner cell", function() {
            LIFE._cellStates = [
                [true, true, true],
                [true, true, true],
                [true, true, true]
            ];
            expect(LIFE.countLiveNeighbors({x: 0, y: 0})).toEqual(3);
        });

        it("Returns 0 when all neighbors are outside of the grid", function() {
            LIFE._cellStates = [
                [true, true, true],
                [true, true, true],
                [true, true, true]
            ];
            expect(LIFE.countLiveNeighbors({x: 99, y: 99})).toEqual(0);
        });

        it("Returns 3 for all live neighbors and one below bottom center", function() {
            LIFE._cellStates = [
                [true, true, true],
                [true, true, true],
                [true, true, true]
            ];
            expect(LIFE.countLiveNeighbors({x: 3, y: 1})).toEqual(3);
        });

        it("Returns 4 for a mix of live and dead and the center cell", function() {
            LIFE._cellStates = [
                [true, false, true],
                [false, true, false],
                [true, true, false]
            ];
            expect(LIFE.countLiveNeighbors({x: 1, y: 1})).toEqual(4);
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
            });

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

  