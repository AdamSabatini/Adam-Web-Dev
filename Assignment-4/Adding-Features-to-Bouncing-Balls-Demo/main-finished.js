/*
  Name: Adam Sabatini
  File: main-finished.html
  Date: April 4, 2024
  Description: Add the following features to the bouncing balls demo.
  Add a user controlled evil circle that deletes the balls if it catches them. 
  Add a score counter to track the amount of balls left.
*/
// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// variables for ball count
const paragraph = document.querySelector("p");
let counter = 0;

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

//shape class
class Shape{
  constructor(x, y, velX, velY){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// evil circle class
class EvilCircle extends Shape{
  constructor(x,y){
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;
    // allow user to move the cicle using wasd
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    });
  }
  // draw method
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3; // width of outline
    ctx.strokeStyle = this.color; // white color for outline
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke(); // dont fill in circle
  }

  // check bounds method. make sure evil circle stays on screen
  checkBounds() {
    if (this.x + this.size >= width) {
      this.x -= this.size;
    }

    if (this.x - this.size <= 0) {
      this.x += this.size;
    }

    if (this.y + this.size >= height) {
      this.y -= this.size;
    }

    if (this.y - this.size <= 0) {
      this.y += this.size;
    }
  }

  // method to check if the evil circle has made contact with a ball.
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + ball.size) {
          ball.exists = false;
          // subtract from ball count once contact is made
          counter--;
          paragraph.textContent = "Ball Count: " + counter;
        }
      }
    }
  }
}

class Ball extends Shape{
  constructor(x, y, velX, velY, color, size) {
    super(x,y, velX, velY);
    this.exists = true; // tracks whether ball has or has not been deleted by the evil circle
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }  
}

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
  // set ball count to amount on screen
  counter++;
  paragraph.textContent = "Ball Count: " + counter;
}

// create an evil circle object
const evilCircle = new EvilCircle (0,0);

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if(ball.exists){ // check if ball exists
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  // call upon evil circle functions
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();
