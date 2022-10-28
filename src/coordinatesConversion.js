let inverseMatrixFunction = function () {
    // calculate the inverse transformation
  
    // first get the cross product of x axis and y axis
    crossx = matrix[0] * matrix[3] - matrix[1] * matrix[2];
  
    // now get the inverted axis
    inverseMatrix[0] = matrix[3] / crossx;
    inverseMatrix[1] = -matrix[1] / crossx;
    inverseMatrix[2] = -matrix[2] / crossx;
    inverseMatrix[3] = matrix[0] / crossx;
    //inverseMatrix[4] = matrix[4];
    //inverseMatrix[5] = matrix[5];
  };
  
  let convertCartesianToIsometric = function (x, y) {
    let xx, yy, result;
    xx = x - matrix[4]; // remove the translation
    yy = y - matrix[5]; // by subtracting the origin
    // return the mousePosition {x:?,y:?} by multiplying xx,yy by the inverse matrix
    return {
      x: xx * inverseMatrix[0] + yy * inverseMatrix[2],
      y: xx * inverseMatrix[1] + yy * inverseMatrix[3],
    };
  };
  