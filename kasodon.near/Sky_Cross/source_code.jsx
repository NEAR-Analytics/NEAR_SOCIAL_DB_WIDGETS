/* Created by duocelot and kasodon */
/* Sky Cross Project */

const accountId = props.accountId ?? context.accountId;
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const image = profile.image;

const fonty = fetch(
  "https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Press+Start+2P&display=swap"
).body;

if (!fonty) {
  return;
}

const Theme = styled.div`
* {
   font-family: 'Orbitron', sans-serif;
font-family: 'Press Start 2P', cursive;
}
  ${fonty}
`;

const App = styled.div`
  margin: 0;
  padding: 1rem;
  width: 100%;
  height: 80vh;
  background-color: #1E1E1E;
  background-image: url('https://ik.imagekit.io/duOCELOT/assets/bgthemev3?ik-sdk-version=javascript-1.4.3&updatedAt=1677258431670');
  background-size: cover;
  background-position: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Nav = styled.ul`
position: absolute;
  bottom: 3rem;
  height: 6rem;
  align-items: center !important;
  width: 47% !important;
  border-radius: 0px;
  backdrop-filter: blur(10px);
  background-color: rgba(9,5,19,.4);
  margin-bottom: 3rem !important;
  margin-top: 3rem !important;
  --bs-nav-pills-border-radius: 0.375rem;
  --bs-nav-pills-link-active-color: #f2f2f2;
  --bs-nav-pills-link-active-bg: #2D2672 !important;
`;

const NavLink = styled.button`
  font-size: 1.7rem !important;
  font-weight: 900 !important;
  color: #f2f2f2 !important;
  text-decoration: none !important;
  `;

const Stat = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44vw;
  height: 44vh;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  background-color: rgba(9, 5, 19, 0.5);
`;

const StatRow = styled.div`
  display: flex !important;
  justify-content: center !important;
  height: 100% !important;
`;

const PlayerIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .player-image {
   width: 300px;
   height: 300px;
   border-radius: 30px;
  }
`;

const PlayerIconImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 30px;
`;

const PlayerDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12rem 4rem;
`;

const PlayerStatPara = styled.p`
  font-size: 2rem;
  `;

const PlayerStatParaSpan = styled.span`
  color: #FFD852;
  `;

const PlayerActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
`;

const PlayerActionsFilledButton = styled.button`

  background: #2a2a2a;
  color: #FFD852;
  border: none;
  font-size: 1.2rem;
  padding: 1.2rem 3rem;
  border-radius: 12px;
`;

const PlayerActionsOutlineButton = styled.button`
  background: #2a2a2a;
  color: #FFD852;
  border: none;
  font-size: 1.2rem;
  padding: 1.2rem 3rem;
  border-radius: 12px;
`;

const KeysPara = styled.p`
position: absolute;
  bottom: 3rem;
  right: 3rem;
  height: 6rem;
  font-size: 1.4rem;
`;

const KeysParaSpan = styled.span`
  background-color: #FFD852;
  color: #121212;
  padding: .5rem 1rem;
  font-weight: 900;
  border-radius: 8px;
  margin-right: .2rem;
`;

const Leaderboard = styled.div`
  width: 100%;
`;

const LeaderboardScore = styled.div`
  width: 100%;
  margin-bottom: .7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #121212;
  font-size: 1.3rem;
  height: 5rem;
  padding: 2rem;
  border-radius: 12px;
`;

const Points = styled.p`
  color: #FFD852;
`;

const NoAuth = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: #1E1E1E;
  color: #FFD852;
`;

const NoAuthPara = styled.p`
font-size: 1.7rem;
color: #FFD852;
font-weight: 600;
text-transform: capitalize
`;

const scriptSrc = `
<head>
  <meta charset="utf-8">
  <script src="https://cdn.jsdelivr.net/gh/kasodon/Sky-cross@master/src/components/end.js">
</script>
</head>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#canvas1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width:  82vw;
  height: 82vh;
  z-index: 100;
  border: 4px solid white;
  border-radius: 20px;
  background: black;
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
    <img id="liveImage" src="https://ik.imagekit.io/duOCELOT/assets/apple.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677036870013" alt=""/>
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
                this.groundMargin = 10 * this.background.scaleFactor;
                this.player = new Player(this);
                this.projectile = new Projectile(this);
                this.input = new InputHandler(this);
                this.speed = 0.9;
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
                this.lives = 20;
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
                    if (Math.random() > 0.9) {
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
    </script>
`;

return (
  <Theme>
    {accountId ? (
      <App className="App">
        <Nav className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <NavLink
              className="nav-link"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Start
            </NavLink>
          </li>
          <li className="nav-item" role="presentation">
            <NavLink
              className="nav-link active"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Game
            </NavLink>
          </li>
          <li className="nav-item" role="presentation">
            <NavLink
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Score
            </NavLink>
          </li>
        </Nav>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabindex="0"
          >
            <Stat className="container-fluid stat">
              <StatRow className="row">
                <PlayerIcon className="player-icon col-4">
                  <Widget
                    src="kasodon.near/widget/ProfileImageDarkMode"
                    props={{
                      profile,
                      accountId,
                      imageClassName: "player-image",
                      thumbnail: false,
                    }}
                  />
                </PlayerIcon>
                <PlayerDetail className="player-detail col-8">
                  <div className="player-stat">
                    <PlayerStatPara>
                      <PlayerStatParaSpan>CAPTAIN:</PlayerStatParaSpan>
                      {accountId}
                    </PlayerStatPara>
                    <PlayerStatPara>
                      <PlayerStatParaSpan>Last Score:</PlayerStatParaSpan> 4221
                    </PlayerStatPara>
                  </div>
                </PlayerDetail>
              </StatRow>
            </Stat>{" "}
            <div>
              <div className="controls">
                <div className="keys">
                  <KeysPara className="mb-3">
                    <KeysParaSpan>S</KeysParaSpan> hold to shoot
                    <KeysParaSpan>⬆</KeysParaSpan>{" "}
                    <KeysParaSpan>⬇</KeysParaSpan>{" "}
                    <KeysParaSpan>⬅</KeysParaSpan>{" "}
                    <KeysParaSpan>➡</KeysParaSpan>{" "}
                  </KeysPara>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade show active"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabindex="0"
          >
            <iframe
              srcDoc={scriptSrc}
              style={{ height: "740px", width: "100%" }}
            />
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
            tabindex="0"
          >
            <Leaderboard className="leaderboard">
              <LeaderboardScore className="score">
                <p className="num">1</p>
                <p className="name">duocelot.near</p>
                <Points className="points">1234</Points>
              </LeaderboardScore>
              <LeaderboardScore className="score">
                <p className="num">1</p>
                <p className="name">Kasodon.near</p>
                <Points className="points">1234</Points>
              </LeaderboardScore>
              <LeaderboardScore className="score">
                <p className="num">1</p>
                <p className="name">duocelot.near</p>
                <Points className="points">1234</Points>
              </LeaderboardScore>
              <LeaderboardScore className="score">
                <p className="num">1</p>
                <p className="name">Kasodon.near</p>
                <Points className="points">1234</Points>
              </LeaderboardScore>
              <LeaderboardScore className="score">
                <p className="num">1</p>
                <p className="name">duocelot.near</p>
                <Points className="points">1234</Points>
              </LeaderboardScore>
              <LeaderboardScore className="score">
                <p className="num">1</p>
                <p className="name">Kasodon.near</p>
                <Points className="points">1234</Points>
              </LeaderboardScore>
              <LeaderboardScore className="score">
                <p className="num">1</p>
                <p className="name">duocelot.near</p>
                <Points className="points">1234</Points>
              </LeaderboardScore>
              <LeaderboardScore className="score">
                <p className="num">1</p>
                <p className="name">Kasodon.near</p>
                <Points className="points">1234</Points>
              </LeaderboardScore>
            </Leaderboard>
          </div>
        </div>
      </App>
    ) : (
      <NoAuth>
        <NoAuthPara>
          <div
            style={{
              width: "512px",
              height: "512px",
              backgroundSize: "100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "white",
              position: "flex",
              fontFamily: '"Press Start 2P", sans-serif',
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://ik.imagekit.io/duOCELOT/assets/noship?ik-sdk-version=javascript-1.4.3&updatedAt=1677226846709"
              alt="ERROR 001"
              style={{
                width: "340px",
                margin: "50px 40px 10px 80px",
                position: "flex",
              }}
            />
            <h2
              style={{
                fontFamily: "Press Start 2P",
                fontSize: "14px",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ERROR 001: NO NEAR WALLET CONNECTED.{" "}
            </h2>{" "}
            <h3
              style={{
                fontFamily: "Press Start 2P",
                fontSize: "12px",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              Please connect with your near wallet or create one for free
            </h3>
            <a
              href="https://shard.dog/go?url=https://near.social/#/duocelot.near/widget/Sky_Cross"
              style={{
                fontFamily: "Press Start 2P",
                fontSize: "14px",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              HERE
            </a>
          </div>
        </NoAuthPara>
      </NoAuth>
    )}
  </Theme>
);
