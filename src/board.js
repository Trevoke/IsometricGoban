class Board {
  constructor() {
    this.boardState = []
    this.starPoints = [
      [3,3],[3,9],[3,15],
      [9,3],[9,9],[9,15],
      [15,3],[15,9],[15,15],
  ]
  this.starPointRadius = 3
  this.intersections = []
  this.intersectionKey = {}
  this.lastRow
  this.firstRow
  }

  initialize() {
    this.createInnerState();
    this.generateIntersections();
    this.initializeLabels();
    this.interestectionObjkeys();
    this.keyBoardmodifiers();
  }

  createInnerState() {
    let row = [];
    for (let x = 0; x < 19; x++) {
      row.push("x");
    }
    for (let y = 0; y < 19; y++) {
      this.boardState.push(row);
    }
  }

  generateIntersections() {
    this.boardState.forEach((row, i) => {
      row.forEach((Symbol, j) => {
        switch (Symbol) {
          case "x":
            this.intersections.push(
              new Intersection({
                position: {
                  x: j,
                  y: i,
                },
                aspectratio: {
                  width: 30,
                  height: 15,
                },
                canvas: {
                  position: {
                    x: j * 15 + 30,
                    y: i * 15 + 30
                  }
                }
              })
            );
        }
      });
    });
  }

  initializeLabels() {
    let changeLetters = [];
    for (let i = 0; i < this.intersections.length; i++) {
      this.intersections[i].label.letter = letters[18 - (i % 19)]
      this.intersections[i].label.number = numbers[i % 19]
      if (this.intersections[i].label.letter == "T") {
        changeLetters.push(this.intersections[i]);
      }
    }

    for (let i = 0; i < changeLetters.length; i++) {
      changeLetters[i].label.letter = letters[i % 19];
    }
  };

  interestectionObjkeys(){
    this.intersections.forEach(intersection => {
        let x = intersection.canvas.position.x
        let y = intersection.canvas.position.y
        this.intersectionKey[[x,y]] = intersection
      }
    )
  }

  keyBoardmodifiers(){
    this.lastRow = this.intersections[360].position.y
    this.firstRow = this.intersections[0].position.y
  }

}
