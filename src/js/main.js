import * as PIXI from 'pixi.js'

let app = new PIXI.Application({
  width: 900,
  height: 700,
  backgroundColor: 0x111111,
  view: document.querySelector('#scene'),
})
app.game = {
  score: 0,
  // state: ;
}
// console.log('app.game.score', app)


function setup() {
  document.body.appendChild(app.view)
  addedTextScore ()
  app.ticker.add(delta => gameLoop(delta));
}
setup()

function gameLoop(delta){
  createPerson ()

  // moveDown(fallingSquare)
  // crashSquares(person, fallingSquare)
  generateNewObj()
}

function createPerson () {
  let Graphics = PIXI.Graphics
  const step = 5
  let person = new Graphics()
  person.beginFill(0xffffff)
  person.drawRect(0, 0, 70, 70)
  person.endFill()
  person.x = 10
  person.y = 500
  person.count = 0
  app.stage.addChild(person)
}



function addedTextScore () {

  const style = new PIXI.TextStyle({
    fill: '#ffffff',
    fontFamily: 'Georgia, serif',
  })
  let text = new PIXI.Text(`Score: ${app.game.score}`, style)
  text.x = 0
  text.y = 20
  // console.log(text)
  app.stage.addChild(text)
}


let intervalFallingObjs = changeIntervalFallingObjs()


class FallingObj {
  constructor () {
    this.width = 50
    this.height = 50
    this.x = (Math.random() * (app.view.width - this.width) + this.width).toFixed(0)
    this.y = -10
    this.color = `0x${Math.floor(Math.random() * 16777215).toString(16)}`
    this.id = generateUniqueId()
    this.speadY = 10
  }

  moveDown () {
    this.y += this.speadY
  }
  removeObj () {

  }


}

const newObj = new FallingObj()
console.log(newObj)


// app.stage.addChild(fallingSquare)

function moveDown (obj) {
  if (obj.y !== app.view.height) {
    obj.y += obj.speadY
  }
}
//
// setInterval(() => {
//   moveDown(fallingSquare)
// }, 100)

function movePerson () {
  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' && person.x > 0) {
      person.x -= step
    }
    if (event.key === 'ArrowRight' && (person.x + person.width) < app.screen.width) {
      person.x += step
    }
  })
}

movePerson()

function boundsObj (obj1, obj2) {
  let topLeft = obj1.x
  let topRight = obj1.x + obj1.width
  let bottomLeft = obj1.y
  let bottomRight = obj1.y + obj1.height

  let othTopLeft = obj2.x
  let othTopRight = obj2.x + (obj2.width)
  let othBottomLeft = obj2.y
  let othBottomRight = obj2.y + (obj2.height)

  let crash = true
  if ((bottomRight < othBottomLeft)
    || (bottomLeft > othBottomRight)
    || (topRight < othTopLeft)
    || (topLeft > othTopRight)) {
    crash = false
  }
  return crash
}

function crashSquares (person, fallingSquare) {
  if (boundsObj(person, fallingSquare)) {
    removeFallingSquares(fallingSquare)
    person.count += 1
    // console.log('score', person.count)
    changeScore(person.count)
  }
}

// setInterval(() => {
//   crashSquares(person, fallingSquare)
// }, 1000)

function removeFallingSquares (obj) {
  // obj.visible = false
  console.log('1', app.stage.children)
  app.stage.removeChild(obj)
}

function generateUniqueId () {
  let min = 1
  let max = 100
  let newId = (Math.random() * (max - min) + min).toFixed(0)
  return newId
}

function changeScore (count) {
  text.text = `Score: ${count}`
}

// create random new objects and change objects fall interval
function generateNewObj () {
  // let newFallingObj = new Graphics()
  // newFallingObj.beginFill(`0x${Math.floor(Math.random() * 16777215).toString(16)}`)
  // newFallingObj.drawRect(0, 0, 50, 50)
  // newFallingObj.endFill()
  //
  // let min = 0
  // let maxX = 900
  //
  // newFallingObj.x = (Math.random() * (maxX - min) + min).toFixed(0)
  // console.log(newFallingObj.x)
  // newFallingObj.y = min
  //
  // newFallingObj.id = generateUniqueId()
  // newFallingObj.speadY = 10
  // app.stage.addChild(newFallingObj)
  //
  // return newFallingObj
}

function changeIntervalFallingObjs () {
  // console.log('changeIntervalFallingObjs ()', 'person.count', person.count)
  let intervalFalling
  if (app.game.score <= 0 || app.game.score < 10) {
    intervalFalling = 3500
  } else {
    intervalFalling -= 100
  }
  return intervalFalling
}


// setInterval(() => {
//     generateNewObj()
//   }, intervalFallingObjs,
//   // }, 3500
// )

// make to move new objects

// function moveNewFallingObj (obj) {
//   if (obj.y !== app.view.height) {
//     obj.y += obj.speadY
//   }
// }
//
// setInterval(() => {
//   moveNewFallingObj(newFallingObj)
// }, 100)
