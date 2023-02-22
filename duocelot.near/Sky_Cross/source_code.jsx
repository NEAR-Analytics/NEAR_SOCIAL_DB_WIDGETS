/* Created by duocelot and kasodon */
/* Sky Cross Project */

const App = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const scriptSrc = `
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#canvas1 {
  width:  100vw;
  height: 100vh;
  margin: 0;
  z-index: 100;
  border: none;
  border-radius: 20px;
  background: grey;
}
img {
  display: none;
}
</style>
<canvas id="canvas1"></canvas>
          <img id="playerImage" src="https://ik.imagekit.io/onyedika/skycross/player_BIG_mq9uKo5ll.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939877107" alt="" />
    <img id="layer1Image" src="https://ik.imagekit.io/onyedika/skycross/1_JZI4rwmIY9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939858101" alt="" />
    <img id="layer2Image" src="https://ik.imagekit.io/onyedika/skycross/2_nnjLeWkZZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676993058655" alt="" />
    <img id="layer3Image" src="https://ik.imagekit.io/onyedika/skycross/3_bfIr7gkw-1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939859797" alt="" />
    <img id="layer4Image" src="https://ik.imagekit.io/onyedika/skycross/4_Gx3192487.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939859766" alt="" />
    <img id="layer5Image" src="https://ik.imagekit.io/onyedika/skycross/7_-0OacUA6m.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676993162515" alt="" />
    <img id="flyImage" src="https://ik.imagekit.io/onyedika/skycross/bomb_iG_K37qGR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939859611" alt=""/>
    <img id="plantImage" src="https://ik.imagekit.io/duOCELOT/assets/cherry.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677029658824" alt=""/>
    <img id="spiderImage" src="https://ik.imagekit.io/onyedika/skycross/enemy_spider_big_n3r4HKyjV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939861559" alt=""/>
    <img id="spiderBigImage" src="https://ik.imagekit.io/onyedika/skycross/enemy_spider_big_n3r4HKyjV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939861559" alt=""/>
    <img id="fireTexture" src="https://ik.imagekit.io/onyedika/skycross/fire_bwpPPyGYv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939863595" alt=""/>
    <img id="boomImage" src="https://ik.imagekit.io/duOCELOT/assets/blast.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677030038390" alt=""/>
    <img id="liveImage" src="https://ik.imagekit.io/onyedika/skycross/apple_GS0a8l34K.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939858074" alt=""/>
    <img id="fireBallImage" src="https://ik.imagekit.io/onyedika/skycross/projectile_8OBktN6_A.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939866264" alt=""/>
    <img id="blastImage" src="https://ik.imagekit.io/onyedika/skycross/blast_ilksOODqF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939858435" alt=""/>
    <img id="fruityImage" src="https://ik.imagekit.io/onyedika/skycross/fruity_nBAzOrsrS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939862429" alt=""/>
    <script type="module">
    window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  class Game {
            constructor(width, height) {
                this.width = width;
                this.height = height;
            }
            start() {
                this.background = new Background(this);
                this.groundMargin = 20 * this.background.scaleFactor;
                this.player = new Player(this);
                this.projectile = new Projectile(this);
                this.input = new InputHandler(this);
                this.speed = 0.5;
                this.maxSpeed = 3;
                this.enemies = [];
                this.particles = [];
                this.maxParticles = 1130;
                this.collisions = [];
                this.floatingMessages = [];
                this.enemyTimer = 0;
                this.enemyInterval = 1000 + Math.random() * 2.1;
                this.debug = false;
                this.score = 0;
                this.fontFamily = "Press Start 2P', cursive"
                this.fontColor = "black";
                this.ui = new UI(this);
                this.time = 0;
                this.maxTime = 100000000;
                this.lives = 5;
                this.gameOver = false;
                this.player.currentState = this.player.states[0];
                this.player.currentState.enter();
              
            }
            draw(context) {
                this.background.draw(context);
                this.player.draw(context);
                this.enemies.forEach((e) => {
                    e.draw(context);
                });
                // handle particles
                this.particles.forEach((p) => {
                    p.draw(context);
                });
                // handle collisions
                this.collisions.forEach((c) => {
                    c.draw(context);
                });
                // handle floating messages
                this.floatingMessages.forEach((m, index) => {
                    m.draw(context);
                });
                this.ui.draw(context);
            }
            update(delta) {
                this.time += delta;
                if (this.time > this.maxTime) {
                    this.gameOver = true;
                }
                this.background.update();
                this.player.update(this.input.keys, delta);
                // this.projectile.update();
                // handle enemies
                if (this.enemyTimer > this.enemyInterval) {
                    this.addEnemy();
                    this.enemyTimer = 0;
                } else {
                    this.enemyTimer += delta;
                }
                this.enemies.forEach((e) => {
                    e.update(delta);
                });
                this.enemies = this.enemies.filter((e) => !e.markForDeletion);
                // handle particles
                this.particles.forEach((p) => {
                    p.update();
                });
                if (this.particles.length > this.maxParticles) {
                    this.particles = this.particles.slice(0, this.maxParticles);
                }
                this.particles = this.particles.filter((p) => !p.markForDeletion);
                // handle collisions
                this.collisions.forEach((c) => {
                    c.update(delta);
                });
                this.collisions = this.collisions.filter((c) => !c.markForDeletion);
                // handle floating messages
                this.floatingMessages.forEach((m) => {
                    m.update();
                });
                this.floatingMessages = this.floatingMessages.filter((m) => !m.markForDeletion);
            }
            addEnemy() {
                if (this.speed >= 1.9 && Math.random() < 0.05) {
                    if (Math.random() < 0.5) {
                        this.enemies.push(new GroundEnemy(this));
                    } else {
                        this.enemies.push(new ClimbingEnemy(this));
                    }
                } else if (this.speed > 0.6) {
                    this.enemies.push(new FlyingEnemy(this));
                }

                const random = Math.random();
                const flyingEnemyProbability = 0.1 + 0.05 * (this.time / 1000);
                const groundEnemyProbability = 0.03 + 0.02 * (this.time / 1000);
                const climbingEnemyProbability = 0.03 + 0.02 * (this.time / 1000);
              
                if (random < flyingEnemyProbability) {
                  this.enemies.push(new FlyingEnemy(this));
                } else if (random < flyingEnemyProbability + groundEnemyProbability && this.speed > 1.5) {
                  this.enemies.push(new GroundEnemy(this));
                } else if (random < flyingEnemyProbability + groundEnemyProbability + climbingEnemyProbability && this.speed > 1.2) {
                  this.enemies.push(new ClimbingEnemy(this));
                }
              }
              
            
        }
        const game = new Game(canvas.width, canvas.height);
        game.start();

        function restartGame() {
            game.start();
            animate(0);
        }

        let lastTime = 0;

        function animate(timestamp) {
            const delta = timestamp - lastTime;
            lastTime = timestamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.update(delta);
            game.draw(ctx);
            if (!game.gameOver) {
                requestAnimationFrame(animate);
            }
        }
        animate(0);

        window.addEventListener("keydown", (e) => {
            if (e.key === "r" && game.gameOver) {
                restartGame();
            }
        });
    });
    class Layer {
        constructor(game, width, height, speedModifier, image) {
            this.game = game;
            this.width = width;
            this.height = height;
            this.speedModifier = speedModifier;
            this.image = image;
            this.x = 0;
            this.y = 0;
        }
        update() {
            if (this.x < -this.width) this.x = 0;
            else this.x -= this.game.speed * this.speedModifier;
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }

    class Background {
        constructor(game) {
            this.game = game;
            this.imageWidth = 1152;
            this.imageHeight = 500;
            this.scaleFactor = this.game.height / this.imageHeight;
            this.width = this.imageWidth * this.scaleFactor;
            this.height = this.imageHeight * this.scaleFactor;
            this.layer5Image = layer5Image;
            this.layer4Image = layer4Image;
            this.layer3Image = layer3Image;
            this.layer2Image = layer2Image;
            this.layer1Image = layer1Image;
            this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1Image);
            this.layer2 = new Layer(this.game, this.width, this.height, 0.007, this.layer2Image);
            this.layer3 = new Layer(this.game, this.width, this.height, 0.02, this.layer3Image);
            this.layer4 = new Layer(this.game, this.width, this.height, 0.063, this.layer4Image);
            this.layer5 = new Layer(this.game, this.width, this.height, 0.2, this.layer5Image);
            this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
        }
        update() {
            this.backgroundLayers.forEach((b) => {
                b.update();
            });
        }
        draw(context) {
            this.backgroundLayers.forEach((b) => {
                b.draw(context);
            });
        }
    }

    class Enemy {
        constructor() {
            this.frameX = 0;
            this.frameY = 0;
            this.fps = 20;
            this.frameInterval = 1000 / this.fps;
            this.frameTimer = 0;
            this.markForDeletion = false;
        }
        update(deltaTime) {
            // movement
            this.x -= this.speedX + this.game.speed;
            this.y += this.speedY;
            if (this.frameTimer > this.frameInterval) {
                this.frameTimer = 0;
                if (this.frameX < this.maxFrame) this.frameX++;
                else this.frameX = 0;
            } else this.frameTimer += deltaTime;
            // check off screen
            if (this.x + this.width < 0) this.markForDeletion = true;
        }
        draw(context) {
            if (this.game.debug) {
                context.strokeRect(this.x, this.y, this.width, this.height);
            }
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }

    class FlyingEnemy extends Enemy {
        constructor(game) {
            super();
            this.game = game;
            this.width = 100;
            this.height = 90;
            this.x = this.game.width + Math.random() * this.game.width * 0.05;
            this.y = Math.random() * this.game.height * 1.3;
            this.speedX = Math.random() + 0.0001;
            this.speedY = 0;
            this.maxFrame = 4;
            this.image = flyImage;
            this.angle = 0;
            this.va = Math.random() * 0.0001 + 0.0001; // velocity angle
            this.type = 'flying-enemy';
        }
        update(deltaTime) {
            super.update(deltaTime);
            this.angle += this.va;
            this.y += Math.sin(this.angle);
        }
    }

    class GroundEnemy extends Enemy {
        constructor(game) {
            super();
            this.game = game;
            this.width = 100;
            this.height = 100;
            this.x = this.game.width + Math.random() * this.game.width * 0.05;
            this.y = Math.random() * this.game.height * 1.3;
            this.speedX = -5;
            this.speedY = 0;
            this.maxFrame = 1;
            this.image = plantImage;
            this.type = 'ground-enemy';
        }
    }
    class ClimbingEnemy extends Enemy {
        constructor(game) {
            super();
            this.game = game;
            this.width = 375;
            this.height = 306;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height * 0.5;
            this.image = spiderBigImage;
            this.speedX = -3;
            this.speedY = Math.random() > 0.2 ? 1 : -1;
            this.maxFrame = 3;
            this.type = 'climbing-enemy';
        }
        update(deltaTime) {
            super.update(deltaTime);
            if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
            if (this.y < -this.height) this.markForDeletion = true;
        }

    }

    class InputHandler {
        constructor(game) {
            this.keys = [];
            this.shootInterval = null;
            window.addEventListener("keydown", (e) => {
                if (this.keys.indexOf(e.key) === -1 && ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "Enter", "Space", "r", "R", "s", "S"].includes(e.key)) {
                    this.keys.push(e.key);
                    if (e.key === "s" || e.key === "S") {
                        this.startShootInterval(game);
                    }
                } else if (e.key === "d") {
                    game.debug = !game.debug;
                }
            });
            window.addEventListener("keyup", (e) => {
                if (this.keys.indexOf(e.key) !== -1) {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                    if (e.key === "s" || e.key === "S") {
                        this.stopShootInterval();
                    }
                }
            });
        }
    
        startShootInterval(game) {
            if (!this.shootInterval) {
                this.shootInterval = setInterval(() => {
                    if (this.keys.includes("s") || this.keys.includes("S")) {
                        game.player.setState(states.SHOOTING, 2);
                        game.player.setState(states.RUNNING, 2);

                    }
                }, 290 + Math.floor(Math.random() * 20)); // Adjust the delay between shots here (in milliseconds)
            }
        }
    
        stopShootInterval() {
            clearInterval(this.shootInterval);
            this.shootInterval = null;
        }
    }
    

    class Player {
        constructor(game) {
            this.game = game;
            this.width = 302;
            this.height = 261;
            this.x = this.game.width / 6;
            this.y = this.game.height / 3;
            this.vy = 0;
            this.projectiles = [];
            this.image = playerImage;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 5;
            this.fps = 20;
            this.frameInterval = 1000 / this.fps;
            this.frameTimer = 0;
            this.speed = 0;
            this.maxSpeed = 4.2;
            this.weight = 1;
            this.states = [new Sitting(game), new Running(game), new Jumping(game), new Falling(game), new Rolling(game), new Diving(game), new Hit(game), new Shooting(game), ];
            this.currentState = null;
        }
        update(inputKeys, delta) {
            this.checkCollisions();
            this.currentState.handleInput(inputKeys);


            // horizontal movement
            if (inputKeys.includes("ArrowRight") && this.currentState !== this.states[6]) {
                this.x += this.maxSpeed + 0.001;
            } else if (inputKeys.includes("ArrowLeft") && this.currentState !== this.states[6]) {
                this.x -= this.maxSpeed + 0.001;
            }
            // else if (inputKeys.includes("s") && this.currentState !== this.states[6]) {	
            //   this.projectiles.forEach((projectile) => {	
            //     projectile.update();	
            //   });	
            //   this.projectiles = this.projectiles.filter(	
            //     (projectile) => !projectile.markedForDeletion	
            //   );	
            // } 
            else this.speed = 0;

            // horizontal boundaries
            if (this.x < 0) this.x = 0;
            if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

            // vertical movement
            if (inputKeys.includes("ArrowUp") && this.currentState !== this.states[6]) {
                this.y -= this.maxSpeed + 0.001;
            } else if (inputKeys.includes("ArrowDown") && this.currentState !== this.states[6]) {
                this.y += this.maxSpeed + 0.001;
            }
         
            else this.speed = 0;

            // vertical boundaries
            if (this.y < 0) this.y = 0;
            if (this.y > this.game.height - this.height - this.game.groundMargin) {
                this.y = this.game.height - this.height - this.game.groundMargin;
            }

            // sprite animation
            if (this.frameTimer > this.frameInterval) {
                this.frameTimer = 0;
                if (this.frameX < this.maxFrame) this.frameX++;
                else this.frameX = 0;
            } else {
                this.frameTimer += delta;
            }
        }

        draw(context) {
            if (this.game.debug) {
                context.strokeRect(this.x, this.y, this.width, this.height);
            }
            this.projectiles.forEach((projectile) => {
                projectile.draw(context);
            });
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    
        onGround() {
        //    return this.y >= this.game.height - this.height - this.game.groundMargin;
        }
        setState(stateIndex, speed) {
            this.currentState = this.states[stateIndex];
            this.game.speed = this.game.maxSpeed * speed;
            this.currentState.enter();
        }
        checkCollisions() {
            this.game.enemies.forEach((enemy) => {
                if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y && enemy.type === 'climbing-enemy') {
                    enemy.markForDeletion = true;
                    this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                    if (this.currentState === this.states[0] || this.currentState === this.states[1] || this.currentState === this.states[2] || this.currentState === this.states[3] || this.currentState === this.states[4] || this.currentState === this.states[5] || this.currentState === this.states[6] || this.currentState === this.states[7]) {
                        this.game.score++;
                        this.game.floatingMessages.push(new FloatingMessage("+1", enemy.x, enemy.y, 150, 50));
                    } else {
                        this.game.lives--;
                        if (this.game.lives === 0) {
                            this.game.gameOver = true;
                        }
                        this.setState(6, 0);
                    }
                } else if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y && enemy.type === 'flying-enemy') {
                    enemy.markForDeletion = true;
                    this.game.collisions.push(new CollisionBlastAnimation(this.game, enemy.x + enemy.width * 0.3, enemy.y + enemy.height * 0.3));
                    if (this.currentState === this.states[0] || this.currentState === this.states[1] || this.currentState === this.states[2] || this.currentState === this.states[3] || this.currentState === this.states[4] || this.currentState === this.states[5] || this.currentState === this.states[6] || this.currentState === this.states[7]) {
                        if (this.game.score > 0) {
                            this.game.score--;
                        }
                        this.game.lives--;
                        this.game.floatingMessages.push(new FloatingMessage("-1 ☠️", enemy.x, enemy.y, 150, 50));
                        if (this.game.lives === 0) {
                            this.game.gameOver = true;
                        }
                    } else {
                        this.game.lives--;
                        if (this.game.lives === 0) {
                            this.game.gameOver = true;
                        }
                        this.setState(6, 0);
                    }
                } else if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y && enemy.type === 'ground-enemy') {
                    enemy.markForDeletion = true;
                    this.game.collisions.push(new CollisionFruityAnimation(this.game, enemy.x + enemy.width * 0.3, enemy.y + enemy.height * 0.3));
                    if (this.currentState === this.states[0] || this.currentState === this.states[1] || this.currentState === this.states[2] || this.currentState === this.states[3] || this.currentState === this.states[4] || this.currentState === this.states[5] || this.currentState === this.states[6] || this.currentState === this.states[7]) {
                        this.game.lives++;
                        this.game.floatingMessages.push(new FloatingMessage("+1 🍎", enemy.x, enemy.y, 140, 50));
                        if (this.game.lives === 0) {
                            this.game.gameOver = true;
                        }
                    } else {
                        this.game.lives--;
                        if (this.game.lives === 0) {
                            this.game.gameOver = true;
                        }
                        this.setState(6, 0);
                    }
                }
            });
        }
    }

    const states = {
        SITTING: 0,
        RUNNING: 1,
        JUMPING: 2,
        FALLING: 3,
        ROLLING: 4,
        DIVING: 5,
        HIT: 6,
        SHOOTING: 7,
    };

    class State {
        constructor(state, game) {
            this.state = state;
            this.game = game;
        }
    }

    class Sitting extends State {
        constructor(game) {
            super("SITTING", game);
        }
        enter() {
            this.game.player.frameX = 0;
            this.game.player.frameY = 1;
            this.game.player.maxFrame = 6;
        }
        handleInput(inputKeys) {
            this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.17, this.game.player.y + this.game.player.height));
            this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));

            if (inputKeys.includes("ArrowLeft")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowRight")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowUp")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowDown")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("Enter")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("s") && inputKeys.includes("S")) {
                this.game.player.setState(states.SHOOTING, 2);
            }
        }
    }

    class Running extends State {
        constructor(game) {
            super("RUNNING", game);
        }
        enter() {
            this.game.player.frameX = 0;
            this.game.player.maxFrame = 6;
            this.game.player.frameY = 0;
        }
        handleInput(inputKeys) {
            this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.05, this.game.player.y + this.game.player.height));
            this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));

            if (inputKeys.includes("ArrowDown")) this.game.player.setState(states.RUNNING, 2);
            else if (inputKeys.includes("ArrowLeft")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowRight")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowUp")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("Enter")) {
                this.game.player.setState(states.ROLLING, 2);
            } else if (inputKeys.includes("s") && inputKeys.includes("S")) {
                this.game.player.setState(states.SHOOTING, 2);
            }
        }
    }

    class Jumping extends State {
        constructor(game) {
            super("JUMPING", game);
        }
        enter() {
            this.game.player.frameX = 0;
            this.game.player.frameY = 1;
            this.game.player.maxFrame = 6;
            if (this.game.player.onGround()) this.game.player.vy = -27;
        }
        handleInput(inputKeys) {
            this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.17, this.game.player.y + this.game.player.height));
            this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));

            if (inputKeys.includes("Enter")) {
                this.game.player.setState(states.ROLLING, 2);
            } else if (inputKeys.includes("ArrowLeft")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowRight")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowUp")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowDown")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("s") && inputKeys.includes("S")) {
                this.game.player.setState(states.SHOOTING, 2);
            }
        }
    }

    class Falling extends State {
        constructor(game) {
            super("FALLING", game);
        }
        enter() {
            this.game.player.frameX = 0;
            this.game.player.frameY = 2;
            this.game.player.maxFrame = 6;
        }
        handleInput(inputKeys) {
            this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.17, this.game.player.y + this.game.player.height));
            this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));

         if (inputKeys.includes("ArrowLeft")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowRight")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowUp")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowDown")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("s") && inputKeys.includes("S")) {
                this.game.player.setState(states.SHOOTING, 2);
            }
        }
    }

    class Rolling extends State {
        constructor(game) {
            super("ROLLING", game);
        }
        enter() {
            this.game.player.frameX = 0;
            this.game.player.frameY = 6;
            this.game.player.maxFrame = 6;
        }
        handleInput(inputKeys) {
            this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.17, this.game.player.y + this.game.player.height));
            this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
            if (!inputKeys.includes("Enter")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (!inputKeys.includes("Enter")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("Enter") && inputKeys.includes("ArrowUp")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowDown")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("s") && inputKeys.includes("S")) {
                this.game.player.setState(states.SHOOTING, 2);
            } else if (inputKeys.includes("ArrowLeft")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowRight")) {
                this.game.player.setState(states.RUNNING, 2);
            }
        }
    }

    class Diving extends State {
        constructor(game) {
            super("DIVING", game);
        }
        enter() {
            this.game.player.frameX = 0;
            this.game.player.frameY = 6;
            this.game.player.maxFrame = 6;
            this.game.player.vy = 5;
        }
        handleInput(inputKeys) {
            this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.17, this.game.player.y + this.game.player.height));
            this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
            if (inputKeys.includes("Enter")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("s") && inputKeys.includes("S")) {
                this.game.player.setState(states.SHOOTING, 2);
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowLeft")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowRight")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowUp")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowDown")) {
                this.game.player.setState(states.RUNNING, 2);
            }
        }
    }

    class Hit extends State {
        constructor(game) {
            super("HIT", game);
        }
        enter() {
            this.game.player.frameX = 0;
            this.game.player.frameY = 4;
            this.game.player.maxFrame = 10;
        }
        handleInput(inputKeys) {
            this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.17, this.game.player.y + this.game.player.height));
            this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
            this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
            if (inputKeys.includes("s") && inputKeys.includes("S")) {
                this.game.player.setState(states.SHOOTING, 2);
                this.game.player.setState(states.RUNNING, 2);
            }
        }
    }

    class Shooting extends State {
        constructor(game) {
            super("SHOOTING", game);
            this.lastFireTime = 0;
        }
        enter() {
            this.game.player.frameX = 5;
            this.game.player.frameY = 1;
            this.game.player.maxFrame = 1;
            this.game.particles.unshift(new Projectile(this.game, this.game.player.x + this.game.player.width * 0.55, this.game.player.y + this.game.player.height * 0.5));
            // this.game.projectile.vy = -27;
        }
        handleInput(inputKeys) {
            this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.17, this.game.player.y + this.game.player.height));
            this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
            this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
            if (inputKeys.includes("ArrowLeft")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowRight")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowUp")) {
                this.game.player.setState(states.RUNNING, 2);
            } else if (inputKeys.includes("ArrowDown")) {
                this.game.player.setState(states.RUNNING, 2);
            }
        }
    }

    class Particle {
        constructor(game) {
            this.game = game;
            this.markForDeletion = false;
        }
        update() {
            this.x -= this.speedX + this.game.speed;
            this.y -= this.speedY;
            this.size *= 0.95;
            if (this.size < 0.5) this.markForDeletion = true;
        }

    }
class ParticleEffect {
  constructor(x, y, img, numParticles) {
    this.x = x;
    this.y = y;
    this.numParticles = numParticles;
    this.particles = [];
    this.finished = false;

    // Use the specified image or animation for the particle effect
    this.img = img;
    this.frameIndex = 0;
    this.frameCount = img.frames ? img.frames.length : 1;
  }

  update() {
    // Update the position of each particle
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        i--;
      }
    }
    if (this.particles.length === 0) {
      this.finished = true;
    }

    // Update the animation frame for the particle effect
    if (this.img.frames) {
      this.frameIndex++;
      if (this.frameIndex >= this.frameCount) {
        this.frameIndex = 0;
      }
    }
  }

  draw(ctx) {
    // Draw each particle
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      let alpha = p.life / this.maxLife;
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
    }

    // Draw the particle effect using the specified image or animation
    if (this.img.frames) {
      let frame = this.img.frames[this.frameIndex];
      ctx.drawImage(
        this.img.img,
        frame.x,
        frame.y,
        frame.w,
        frame.h,
        this.x,
        this.y,
        frame.w,
        frame.h
      );
    } else {
      ctx.drawImage(this.img.img, this.x, this.y);
    }
  }

  createParticle() {
    // Create a new particle with a random velocity and lifespan
    let angle = Math.random() * Math.PI * 2;
    let speed = Math.random() * 3 + 1;
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;
    let life = Math.floor(Math.random() * 30) + 30;
    this.particles.push({ x: this.x, y: this.y, vx, vy, life });
  }

  explode() {
    // Create a burst of particles
    for (let i = 0; i < this.numParticles; i++) {
      this.createParticle();
    }
  }
}
    class Projectile extends Particle {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.x = x;
            this.y = y;
            this.vy = 0;
            this.width = 20;
            this.height = 20;
            this.speed = 7;
            this.image = fireBallImage;
            this.states = this.game.player.states;
            this.currentState = this.game.player.currentState;
            this.type = 'projectile-particle';
            this.prevPositions = [];

            
        }

        draw(context) {
            
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        update() {
            this.prevPositions.push({ x: this.x, y: this.y });
if (this.prevPositions.length > 20) {
    this.prevPositions.shift();
}
            // super.update();
            this.checkCollisions();
            this.x += this.speed;
            // if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
        }

        checkCollisions() {
            this.game.enemies.forEach((enemy) => {
                if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y) {
                    enemy.markForDeletion = true;
                    this.game.particles.forEach((p) => {
                        if (p.type === 'projectile-particle' && enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y) {
                            p.markForDeletion = true;
                        }
                    })
                    this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                    if (this.currentState === this.states[0] || this.currentState === this.states[1] || this.currentState === this.states[2] || this.currentState === this.states[3] || this.currentState === this.states[4] || this.currentState === this.states[5] || this.currentState === this.states[6] || this.currentState === this.states[7]) {
                        this.game.score++;
                        this.game.floatingMessages.push(new FloatingMessage("+1 🍎", enemy.x, enemy.y, 150, 50));
                    } else {
                        this.game.lives--;
                        if (this.game.lives === 0) {
                            this.game.gameOver = true;
                        }
                        this.setState(6, 0);
                    }
                }
            });
        }
    }

    class Dust extends Particle {
        constructor(game, x, y) {
            super(game);
            this.size = Math.random() * 10.2 + 10;
            this.x = x + 40;
            this.y = y - 50;
            this.speedX = Math.random() * 0.2;
            this.speedY = Math.random() * 2.2;
            this.color = "rgba(255,255,255,0.3)";
            this.type = 'dust-particle';
        }
        draw(context) {
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fillStyle = this.color;
            context.fill();
        }
    }

    class Splash extends Particle {
        constructor(game, x, y) {
            super(game);
            this.size = Math.random() * 100 + 100;
            this.x = x - this.size * 0.4;
            this.y = y - this.size * 0.5;
            this.speedX = Math.random() * 6 - 4;
            this.speedY = Math.random() * 4 + 1;
            this.gravity = 0;
            this.image = fireTexture;
            this.type = 'splash-particle';
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.size, this.size);
        }
        update() {
            super.update();
            this.gravity += 0.1;
            this.y += this.gravity;
        }
    }

    class Fire extends Particle {
        constructor(game, x, y) {
            super(game);
            this.image = fireTexture;
            this.size = Math.random() * 10 + 50;
            this.x = x - 50;
            this.y = y;
            this.speedX = 1;
            this.speedY = 1;
            this.angle = 0;
            this.va = Math.random() * 0.02 - 0.1;
            this.type = 'fire-particle';
        }
        draw(context) {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle * 5);
            context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
            context.restore();
        }
        update() {
            super.update();
            this.angle += this.va;
            this.x += Math.sin(this.angle);
        }
    }

    class FloatingMessage {
        constructor(value, x, y, targetX, targetY) {
            this.value = value;
            this.x = x;
            this.y = y;
            this.targetX = targetX;
            this.targetY = targetY;
            this.timer = 0;
            this.markForDeletion = false;
        }
        update() {
            this.x += (this.targetX - this.x) * 0.03;
            this.y += (this.targetY - this.y) * 0.03;
            this.timer++;
            if (this.timer > 100) {
                this.markForDeletion = true;
            }
        }
        draw(context) {
            context.font = "40px " + this.fontFamily;
            context.fillStyle = "white";
            context.fillText(this.value, this.x, this.y);
            context.fillStyle = "black";
            context.fillText(this.value, this.x - 2, this.y - 2);
        }
    }

    class CollisionAnimation {
        constructor(game, x, y) {
            this.game = game;
            this.image = boomImage;
            this.x = x;
            this.y = y;
            this.spriteWidth = 158;
            this.spriteHeight = 158;
            this.sizeModifier = Math.random() + 0.5;
            this.width = this.spriteWidth * this.sizeModifier;
            this.height = this.spriteHeight * this.sizeModifier;
            this.x = x - this.width * 0.5;
            this.y = y - this.height * 0.5;
            this.frameX = 0;
            this.maxFrame = 4;
            this.markForDeletion = false;
            this.fps = Math.random() * 10 + 5;
            this.frameInterval = 1000 / this.fps;
            this.frameTimer = 0;
        }
        draw(context) {
            context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        update(delta) {
            this.x -= this.game.speed;
            if (this.frameTimer > this.frameInterval) {
                this.frameX++;
                if (this.frameX > this.maxFrame) this.markForDeletion = true;
                this.frameTimer = 0;
            } else this.frameTimer += delta;
        }
    }

    class CollisionBlastAnimation {
        constructor(game, x, y) {
            this.game = game;
            this.image = blastImage;
            this.x = x;
            this.y = y;
            this.spriteWidth = 158;
            this.spriteHeight = 158;
            this.sizeModifier = Math.random() + 0.5;
            this.width = this.spriteWidth * this.sizeModifier;
            this.height = this.spriteHeight * this.sizeModifier;
            this.x = x - this.width * 0.5;
            this.y = y - this.height * 0.5;
            this.frameX = 0;
            this.maxFrame = 9;
            this.markForDeletion = false;
            this.fps = Math.random() * 10 + 5;
            this.frameInterval = 1000 / this.fps;
            this.frameTimer = 0;
        }
        draw(context) {
            context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        update(delta) {
            this.x -= this.game.speed;
            if (this.frameTimer > this.frameInterval) {
                this.frameX++;
                if (this.frameX > this.maxFrame) this.markForDeletion = true;
                this.frameTimer = 0;
            } else this.frameTimer += delta;
        }
    }

    class CollisionFruityAnimation {
        constructor(game, x, y) {
            this.game = game;
            this.image = fruityImage;
            this.x = x;
            this.y = y;
            this.spriteWidth = 158;
            this.spriteHeight = 158;
            this.sizeModifier = Math.random() + 0.5;
            this.width = this.spriteWidth * this.sizeModifier;
            this.height = this.spriteHeight * this.sizeModifier;
            this.x = x - this.width * 0.5;
            this.y = y - this.height * 0.5;
            this.frameX = 0;
            this.maxFrame = 9;
            this.markForDeletion = false;
            this.fps = Math.random() * 10 + 5;
            this.frameInterval = 1000 / this.fps;
            this.frameTimer = 0;
        }
        draw(context) {
            context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        update(delta) {
            this.x -= this.game.speed;
            if (this.frameTimer > this.frameInterval) {
                this.frameX++;
                if (this.frameX > this.maxFrame) this.markForDeletion = true;
                this.frameTimer = 0;
            } else this.frameTimer += delta;
        }
    }

    class UI {
        constructor(game) {
            this.game = game;
            this.fontSize = 30;
            this.fontFamily = "Press Start 2P', cursive";
            this.livesImage = liveImage;
        }
        draw(context) {
            

 // Draw gray rectangle at bottom of canvas
 context.fillStyle = "#5f5f5f";
 context.fillRect(0, this.game.height - this.game.height / 7, this.game.width, this.game.height / 7);

    
      // Calculate dimensions and positions of black and white boxes
      const blackBoxHeight = this.game.height / 6;
      const whiteBoxHeight = this.game.height / 6.5;
      const whiteBoxWidth = whiteBoxHeight;
      const blackBoxWidth = blackBoxHeight;

      const blackBoxX = 70;
      const blackBoxY = this.game.height - this.game.height / 5 + (this.game.height / 5 - blackBoxHeight) / 2;

      // Draw black box
      context.fillStyle = "#000";
      context.fillRect(blackBoxX, blackBoxY, blackBoxWidth, blackBoxHeight);

      // Calculate dimensions and positions of white box
      const whiteBoxX = blackBoxX + (blackBoxWidth - whiteBoxWidth) / 2;
      const whiteBoxY = blackBoxY + (blackBoxHeight - whiteBoxHeight) / 2;

      // Draw white box
      context.fillStyle = "#fff";
      context.fillRect(whiteBoxX, whiteBoxY, whiteBoxWidth, whiteBoxHeight);

      // Set text styles
      context.font = this.fontSize + this.fontFamily;
      context.textAlign = "left";
      context.fillStyle = this.game.fontColor;

      // Draw score and time
      context.fillText("Score: " + this.game.score, this.game.width - 200, this.game.height - 80);
      context.fillText("Time: " + Math.floor(this.game.time * 0.001), this.game.width - 200, this.game.height - 50);

      // Draw lives
      for (let i = 0; i < this.game.lives; i++) {
          context.drawImage(this.livesImage, this.game.width - 200 + 25 * i, this.game.height - 35, 25, 25);
      }      
            // Draw game over text
            if (this.game.gameOver) {
                context.fillStyle = "rgba(34, 3, 44, 0.5)";
                context.fillRect(0, 0, this.game.width, this.game.height);
                context.textAlign = "center";
                context.font = this.fontSize + this.fontFamily;


                if (this.game.score > 500) {
                    context.fillText("MISSION ACCOMPLISHED", this.game.width * 0.5, this.game.height * 0.5 - 20);
                    context.font = this.fontSize + this.fontFamily;
                    context.fillText("YOU ARRIVED SAFETY", this.game.width * 0.5, this.game.height * 0.5 + 20);
                    context.fillText("PRESS R TO PLAY AGAIN", this.game.width * 0.5, this.game.height * 0.5 + 30);
                } else {
                    context.fillText("MISSION FAILED", this.game.width * 0.5, this.game.height * 0.5 - 20);
                    context.font = this.fontSize + this.fontFamily;
                    context.fillText("YOU COULDN'T COMPLETE THE JOURNEY", this.game.width * 0.5, this.game.height * 0.5 + 5);
                    context.fillText("PRESS R TO PLAY AGAIN", this.game.width * 0.5, this.game.height * 0.5 + 30);
                }
            }       
        }
      }
    </script>
`;

return (
  <div>
    <iframe srcDoc={scriptSrc} style={{ height: "800px", width: "100%" }} />
  </div>
);
