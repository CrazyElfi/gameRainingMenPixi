import * as PIXI from 'pixi.js'

const app = new PIXI.Application({
  width: 900,
  height: 700,
  backgroundColor: 0x111111,
  view: document.querySelector('#scene'),
})
document.body.appendChild(app.view)

console.log('ghgj', app.view.height)

let Graphics = PIXI.Graphics
const step = 5
let person = new Graphics()
person.beginFill(0xffffff)
person.drawRect(0, 0, 70, 70)
person.endFill()
person.x = 0
person.y = 500
person.count = 0
app.stage.addChild(person)

let score = person.count;

const style = new PIXI.TextStyle({
  fill: "#ffffff",
  fontFamily: "Georgia, serif"
});
let text = new PIXI.Text(`Score: ${score}`, style);
text.x = 0;
text.y = 20;
console.log(text)


let fallingSquare = new Graphics()
fallingSquare.beginFill(0xB23AD4)
fallingSquare.drawRect(0, 0, 50, 50)
fallingSquare.endFill()
fallingSquare.x = 0
fallingSquare.y = 0
fallingSquare.id = generateUniqueId()
fallingSquare.speadY = 10


app.stage.addChild(fallingSquare)
app.stage.addChild(text)

function moveDown (obj) {
  if (obj.y !== app.view.height) {
    obj.y += obj.speadY
  }
}

setInterval(() => {
  moveDown(fallingSquare)
}, 100)

function movePerson () {
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 37) {
      person.x -= step
    }
    if (event.keyCode === 39) {
      person.x += step
    }
    // if(person.x === 0 || person.x === app.view.width) {
    //   console.log('no way')
    //   return;
    // }
  })

}
movePerson()

function boundsObj (obj1, obj2) {
  let topLeft = obj1.x;
  let topRight = obj1.x + obj1.width;
  let bottomLeft = obj1.y;
  let bottomRight = obj1.y +obj1.height;

  let othTopLeft = obj2.x;
  let othTopRight = obj2.x + (obj2.width);
  let othBottomLeft = obj2.y;
  let othBottomRight = obj2.y + (obj2.height);

  let crash = true;
  if ((bottomRight < othBottomLeft)
    || (bottomLeft > othBottomRight)
    || (topRight < othTopLeft)
    || (topLeft > othTopRight)) {
    crash = false;
  }
  return crash;
}

function crashSquares (person, fallingSquare) {
    if (boundsObj(person, fallingSquare)) {
      removeFallingSquares(fallingSquare)
      person.count += 1
      console.log('score', person.count)
      changeScore (person.count)
    }
}

setInterval(() => {crashSquares (person, fallingSquare)}, 1000)

function removeFallingSquares (obj) {
  obj.visible = false;
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
