// Project 1: Vanilla JavaScript sprite animation techniques:

// let playerState = 'sit'
// const dropdown = document.getElementById('animations')
// dropdown?.addEventListener('change', (ev) => {
//   if (ev.target instanceof HTMLSelectElement) {
//     playerState = ev.target.value
//   }
// })

// const canvas = <HTMLCanvasElement>document.getElementById('canvas1')
// const ctx = canvas.getContext('2d')!

// const CANVAS_WIDTH = (canvas.width = 600)
// const CANVAS_HEIGHT = (canvas.height = 600)

// const playerImage = new Image()
// playerImage.src = '../src/assets/shadow_dog.png'
// const spriteWidth = 575
// const spriteHeight = 523

// // let frameX = 0
// // let frameY = 4
// let gameFrame = 0
// const staggerFrames = 5

// const spriteAnimation: any = []

// const animationStates = [
//   {
//     name: 'idle',
//     frames: 7,
//   },
//   {
//     name: 'jump',
//     frames: 7,
//   },
//   {
//     name: 'fall',
//     frames: 9,
//   },
//   {
//     name: 'run',
//     frames: 9,
//   },
//   {
//     name: 'dizzy',
//     frames: 11,
//   },
//   {
//     name: 'sit',
//     frames: 5,
//   },
//   {
//     name: 'roll',
//     frames: 7,
//   },
//   {
//     name: 'bite',
//     frames: 7,
//   },
//   {
//     name: 'ko',
//     frames: 7,
//   },
//   {
//     name: 'getHit',
//     frames: 4,
//   },
// ]

// animationStates.forEach((state, idx) => {
//   let frames: { loc: { x: number; y: number }[] } = {
//     loc: [],
//   }

//   for (let j = 0; j < state.frames; j++) {
//     let positionX = j * spriteWidth
//     let positionY = idx * spriteHeight
//     frames.loc.push({ x: positionX, y: positionY })
//   }

//   spriteAnimation[state.name] = frames
// })

// function animate() {
//   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
//   let position =
//     Math.floor(gameFrame / staggerFrames) %
//     spriteAnimation[playerState].loc.length
//   let frameX = spriteWidth * position
//   let frameY = spriteAnimation[playerState].loc[position].y
//   //   ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh) // Reference
//   ctx.drawImage(
//     playerImage,
//     frameX,
//     frameY,
//     spriteWidth,
//     spriteHeight,
//     0,
//     0,
//     spriteWidth,
//     spriteHeight
//   )

//   if (gameFrame % staggerFrames === 0) {
//     if (frameX < 6) frameX++
//     else frameX = 0
//   }

//   gameFrame++
//   requestAnimationFrame(animate)
// }
// animate()

// *****************************************************************************
//  Project 2: Parallax backgrounds with JavaScript

const canvas = <HTMLCanvasElement>document.getElementById('canvas1')
const ctx = canvas.getContext('2d')!
const CANVAS_WIDTH = (canvas.width = 800)
const CANVAS_HEIGHT = (canvas.height = 700)
let gameSpeed = 10
// let gameFrame = 0

const backgroundLayer1 = new Image()
backgroundLayer1.src = '../src/assets/backgroundlayers/layer-1.png'
const backgroundLayer2 = new Image()
backgroundLayer2.src = '../src/assets/backgroundlayers/layer-2.png'
const backgroundLayer3 = new Image()
backgroundLayer3.src = '../src/assets/backgroundlayers/layer-3.png'
const backgroundLayer4 = new Image()
backgroundLayer4.src = '../src/assets/backgroundlayers/layer-4.png'
const backgroundLayer5 = new Image()
backgroundLayer5.src = '../src/assets/backgroundlayers/layer-5.png'

class Layer {
  x: number
  y: number
  width: number
  height: number
  //   x2: number
  image: HTMLImageElement
  speedModifier: number
  speed: number
  constructor(image: HTMLImageElement, speedModifier: number) {
    this.x = 0
    this.y = 0
    this.width = 2400
    this.height = 700
    // this.x2 = this.width
    this.image = image
    this.speedModifier = speedModifier
    this.speed = gameSpeed * this.speedModifier
  }
  update() {
    this.speed = gameSpeed * this.speedModifier
    if (this.x <= -this.width) {
      this.x = 0
    }
    this.x = this.x - this.speed
    // this.x = (gameFrame * this.speed) % this.width
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }
}

const layer1 = new Layer(backgroundLayer1, 0.2)
const layer2 = new Layer(backgroundLayer2, 0.4)
const layer3 = new Layer(backgroundLayer3, 0.6)
const layer4 = new Layer(backgroundLayer4, 0.8)
const layer5 = new Layer(backgroundLayer5, 1)

const gameObject = [layer1, layer2, layer3, layer4, layer5]

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  gameObject.forEach((obj) => {
    obj.update()
    obj.draw()
  })
  requestAnimationFrame(animate)
  //   gameFrame--
}

animate()
