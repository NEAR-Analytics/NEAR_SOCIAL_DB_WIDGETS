const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

const erc721Abi = fetch(
  "https://gist.githubusercontent.com/leon-do/e1e9271c44f326068d36baa2755143ff/raw/59ba9232b55a37acd38d98f3a937237d63fcf66a/abi.json"
);
const ercs = JSON.parse(erc721Abi.body);
console.log(ercs);
const erc721 = ercs.erc721;
console.log(erc721);

const buffContract = "0x1e988ba4692e52Bc50b375bcC8585b95c48AaD77";

// const buff = new ethers.Contract(
//   buffContract,
//   erc721Abi.body,
//   Ethers.provider().getSigner()
// );

// console.log(buff);

initState({
  uri: "",
  metadata: "",
  image: "",
});
const getBuff = () => {
  const buff = new ethers.Contract(
    buffContract,
    erc721,
    Ethers.provider().getSigner()
  );
  // console.log(buff);
  const token = buff.tokenURI(4699).then((value) => {
    // console.log(value);
    State.update({ uri: value });
    console.log(state.uri);
    // State.update({ senderBalance: value });
  });

  const metadata = fetch(state.uri);
  console.log(metadata.body.image);
  console.log("Nice");
  State.update({ image: metadata.body.image });
};

getBuff();

// const iface = new ethers.utils.Interface(erc721Abi.erc721);

// NEAR Stuff

const accountId = context.accountId;

const initialData = Social.getr(`${accountId}/flappybos`);

const initialScore = !initialData ? 0 : Number(initialData.flappybos.score);

const srcData = `

<style>
html,
body {
  height: 100%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}

</style>

<script src="https://cdn.jsdelivr.net/npm/kaboom@2000.2.10/dist/kaboom.js"></script>
<script>

window.addEventListener("load", (event) => {
  init()
});
</script>
<script>
const init = () => {
kaboom()

loadSprite("bean", "${state.image}")
loadSound("score", "https://kaboomjs.com/sounds/score.mp3")
loadSound("wooosh", "https://kaboomjs.com/sounds/wooosh.mp3")
loadSound("hit", "https://kaboomjs.com/sounds/hit.mp3")

scene("game", () => {

	const PIPE_OPEN = 35000
	const PIPE_MIN = 60
	const JUMP_FORCE = 1000
	const SPEED = 32000
	const CEILING = -60

	gravity(4000)

	const bean = add([
		sprite("bean"),
		pos(width() / 4, 0),
		area(),
		body(),
	])

	bean.onUpdate(() => {
		if (bean.pos.y >= height() || bean.pos.y <= CEILING) {
			go("lose", score)
		}
	})

	onKeyPress("space", () => {
		bean.jump(JUMP_FORCE)
		play("wooosh")
	})

	onClick(() => {
		bean.jump(JUMP_FORCE)
		play("wooosh")
	})

	onTouchStart(() => {
		bean.jump(JUMP_FORCE)
		play("wooosh")
	})

	function spawnPipe() {
		const h1 = rand(PIPE_MIN, height() - PIPE_MIN - PIPE_OPEN)
		const h2 = height() - h1 - PIPE_OPEN

		add([
			pos(width(), 0),
			rect(64, h1),
			color(0, 127, 255),
			outline(4),
			area(),
			move(LEFT, SPEED),
			cleanup(),
			"pipe",
		])

		add([
			pos(width(), h1 + PIPE_OPEN),
			rect(64, h2),
			color(0, 127, 255),
			outline(4),
			area(),
			move(LEFT, SPEED),
			cleanup(),
			"pipe",
			{ passed: false, },
		])

	}

	bean.onCollide("pipe", () => {
		go("lose", score)
		play("hit")
		addKaboom(bean.pos)
	})

	onUpdate("pipe", (p) => {
		if (p.pos.x + p.width <= bean.pos.x && p.passed === false) {
			addScore()
			p.passed = true
		}
	})

	loop(1, () => {
		spawnPipe()
	})

	let score = 0

	const scoreLabel = add([
		text(score),
		origin("center"),
		pos(width() / 2, 80),
		fixed(),
	])

	/*
	const highScoreLabel = add([
		text("hi score:", {
			size: 20
		}),
		origin("center"),
		pos(width() / 10, 80),
		fixed(),
	])
	*/

	function addScore() {
		score++
		scoreLabel.text = score
		play("score")
	}

})

scene("lose", (score) => {

	add([
		sprite("bean"),
		pos(width() / 2, height() / 2 - 108),
		scale(3),
		origin("center"),
	])

	add([
		text(score),
		pos(width() / 2, height() / 2 + 108),
		scale(3),
		origin("center"),
	])

	onKeyPress("space", () => go("game"))
	onClick(() => go("game"))
	onTouchStart(() => go("game"))

	window.top.postMessage({ score: score }, "*")
})

go("game")
}
</script>
`;

return (
  <>
    <iframe
      srcDoc={srcData}
      onMessage={(data) => {
        State.update({ ...data });

        const newScore = Number(data.score);

        if (newScore > initialScore) {
          Social.set({
            flappybos: {
              ...data,
            },
          });
        }
      }}
      style={{
        height: "80vh",
        width: "100%",
      }}
    />
  </>
);
