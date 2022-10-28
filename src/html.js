// const goban = {
//         board: function () {
//                 return document.querySelector("#gobanCanvas");
//         },
//         visual: function () {
//                 return goban.board().getContext("2d");
//         },
//         width: 1920,
//         height: 1080,
// };

const mouse = {
    cartesian: {
        x: 0,
        y: 0,
    },
    isometric: {
        x: 0,
        y: 0,
    },
    updateHoverState: (e) => {                
        mouse.cartesian.x = e.clientX - Math.round(window.scrollX);
        mouse.cartesian.y = e.clientY - Math.round(window.scrollY);
        mouse.isometric = convertCartesianToIsometric(mouse.cartesian.x, mouse.cartesian.y);
        
        prevHoveredCoordinate = isometricUI.hoveredIntersection;
        
        let coords = mouse.findHoveredIntersection(mouse.isometric, 15);
        isometricUI.hoveredIntersection = jsBoard.intersectionKey[coords]
        stoneInterface.stoneKey = stoneInterface.stones[coords]
        
        newhoveredCoordinate = isometricUI.hoveredIntersection;
        
        if(isometricUI.hoveredIntersection == null) {
            return
        } else {
            mouse.maybeChangeHoverStoneDisplay();
        }
        
    },
    playStone: (e) => {
        let prevColor = currentColor;
        let sgfColor = prevColor === 'white' ? 'W' : 'B'
        if (isometricUI.hoveredIntersection === null) {
            return;
        } 
        
        if (stoneInterface.stoneKey === "empty") {
            isometricUI.hoveredIntersection.drawStone(stonedrawType, prevColor);
            isometricUI.hoveredIntersection.stone.state = "filled";
            let x = isometricUI.hoveredIntersection.position.x
            let y = isometricUI.hoveredIntersection.position.y
            sgf.push([sgfColor,[x, y]]);
            currentColor = prevColor === 'white' ? 'black' : 'white'
        }
    },
    setHoverLogic: function () {
        isometricUI.mouse.canvas().addEventListener("mousemove", mouse.updateHoverState)
    },
    setUserPlayingAStoneLogic: function () {
        isometricUI.mouse.canvas().addEventListener("mousedown", mouse.playStone);
    },
    maybeChangeHoverStoneDisplay: function(){
        if(isometricUI.hoveredIntersection === null){ return } else
        if(isometricUI.hoveredIntersection.stone.state === 'empty'){
            if (prevHoveredCoordinate != isometricUI.hoveredIntersection) {
                isometricUI.mouse.visual().save()
                isometricUI.mouse.visual().clearRect(0,0, isometricUI.board.width, isometricUI.board.height)
                isometricUI.mouse.visual().restore()
            }
            if (newhoveredCoordinate === undefined){
                return
            } else {
                newhoveredCoordinate.stoneHover(stonemouseHover, currentColor);
            }
        }
    },
    
    findHoveredIntersection: function(mouseCoordinates, intersection){
        
        // y is CoorAspect.height = 15
        let modulator = intersection.Height
        let modulatorHalf = modulator/2
        // mouseCoordinates = mouseCoordinates.isometric
        let mouseX = mouseCoordinates.x
        let mouseY = mouseCoordinates.y
        
        let modmouseX = mouseX % modulator
        let modmouseY = mouseY % modulator
        let nearestTileCoordinates = {
            x: null,
            y: null
        }
        
        if(modmouseX >= modulatorHalf){
            nearestTileCoordinates.x = (mouseX + (modulator - modmouseX))
        } else if (modmouseX <= modulatorHalf) {
            nearestTileCoordinates.x = (mouseX - modmouseX)
        }
        
        if(modmouseY >= modulatorHalf){
            nearestTileCoordinates.y = (mouseY + (modulator - modmouseY))
        } else if (modmouseY <= modulatorHalf) {
            nearestTileCoordinates.y = (mouseY - modmouseY)
        }
        
        // mapping of canvas coordinates to go board intersections
        let x = nearestTileCoordinates.x
        let y = nearestTileCoordinates.y     
        return [x, y];
    }
};



