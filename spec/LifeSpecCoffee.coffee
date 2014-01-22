describe "Coffeescript tests using jasmine-given", ->
  describe "Get Neighbors", ->
    neighbors=null
    Given -> neighbors = []
    When -> neighbors = LIFE.getNeighbors(1, 1)
    Then -> neighbors.length = 8

    expectedCells = null
    Given -> expectedCells = []
      When -> expectedCells = [
        [0,0], [0,1], [0,2],
        [1,0],        [1,2],
        [2,0], [2,1], [2,2]
      ]
      Then -> expect(LIFE.getNeighbors(1,1)).toEqual(expectedCells)

