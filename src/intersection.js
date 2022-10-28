class Intersection {
  constructor({
    position,    
    canvas = {
      position: {
        x: 0,
        y: 0
      }
    }
  }) {
    this.position = position
    this.aspectratio = {
      width: 30,
      height: 15
    }
    this.label = {
      letter: undefined,
      number: undefined
    }
    this.canvas = canvas
  }
}
