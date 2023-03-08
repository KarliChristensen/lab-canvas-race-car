window.onload = () => {
  const canvas = document.getElementById(`canvas`);
  const ctx = canvas.getContext(`2d`);
  canvas.width = 500;
  canvas.height = 700;
    
  class Game {
    constructor(width, height) {
      //this.collision();
      this.width = width;
      this.height = height;
      this.token = new Token(this);
      this.input = new Input();
      this.obstacles = new Obstacles(this);
      this.score = 0;
    }
    update() {
      this.token.update(this.input.keys);
      this.obstacles.update();
    }
    draw(context) {
      this.token.draw(context);
      this.obstacles.draw(context);
    }
  }
  class Token {
    constructor(game) {
      this.game = game;
      this.width = 158;
      this.height = 319;
      this.x = 250;
      this.y = this.game.height - this.height;
      this.image = document.getElementById(`token`);
    }
    update(input) {
      if (input.includes(`ArrowRight`)) this.x++;
      else if (input.includes(`ArrowLeft`)) this.x--;
      else if (input.includes(`ArrowUp`)) this.y--;
      else if (input.includes(`ArrowDown`)) this.y++;
    }
    draw(context) {
      context.drawImage(
        this.image,
        this.x,
        this.y,
        this.width / 2.5,
        this.height / 2.5
      );
    }
    /*collision(){
      this.game.obstaclesArr.forEach(obstacle => {
        if (obstacle.x < this.x + this.width && 
            obstacle.x + obstacle.y > this.x &&
            obstacle.y < this.y + this.height &&
            obstacle.y + obstacleHeight > this.y
            ){
              break
            } else {
          };
      });
    };*/
  };
  class Input {
    constructor() {
      this.keys = [];
      window.addEventListener(`keydown`, (e) => {
        if (
          (e.key === `ArrowRight` ||
            e.key === `ArrowLeft` ||
            e.key === `ArrowUp` ||
            e.key === `ArrowDown`) &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        }
        console.log(e.key, this.keys);
      });
      window.addEventListener(`keyup`, (e) => {
        if (
          e.key === `ArrowRight` ||
          e.key === `ArrowLeft` ||
          e.key === `ArrowUp` ||
          e.key === `ArrowDown`
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
        console.log(e.key, this.keys);
      });
    }
  }
  class Obstacles {
    constructor(game) {
      this.game = game;
      this.obstaclesArr = [];
      this.obstacleWidth = 100;
      this.obstacleHeight = 20;
      this.obstacleSpeed = 1;

      for (let i = 0; i < 5; i++) {
        const x = Math.random() * (this.game.width - this.obstacleWidth);
        const y = -this.obstacleHeight - i * 100;
        this.obstaclesArr.push({ x, y });
      }
    }

    update() {
      for (let i = 0; i < this.obstaclesArr.length; i++) {
        this.obstaclesArr[i].y += this.obstacleSpeed;

        if (this.obstaclesArr[i].y >= this.game.height) {
          this.obstaclesArr[i].y = -this.obstacleHeight;
          this.obstaclesArr[i].x =
            Math.random() * (this.game.width - this.obstacleWidth);
        }
      }
    }

    draw(context) {
      context.fillStyle = "red";
      for (let i = 0; i < this.obstaclesArr.length; i++) {
        context.fillRect(
          this.obstaclesArr[i].x,
          this.obstaclesArr[i].y,
          this.obstacleWidth,
          this.obstacleHeight
        );
      }
    }
  }
  const game = new Game(canvas.width, canvas.height);
  console.log(game);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
};