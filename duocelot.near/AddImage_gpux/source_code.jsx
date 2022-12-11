const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to add a new image";
}

initState({
  img: {},
  prompt: "greg rutkowski galatic ((battle)) 4k anime manga japanese sunset",
  seed: null,
  rollImg:
    "https://ipfs.fleek.co/ipfs/bafybeih7tutznkvbuecy3nfmpwo7q5w7kzyqwdvlipjtcyqevnkpz2jf44",
  blur: 0,
});

function rollImage() {
  var seed = Math.trunc(Math.random() * 100000000);
  state.seed = seed;
  state.blur = 8;
  State.update(state);
}

var imgSrc =
  "https://ipfs.fleek.co/ipfs/bafybeih7tutznkvbuecy3nfmpwo7q5w7kzyqwdvlipjtcyqevnkpz2jf44";
if (state.seed) {
  imgSrc = `https://explorer.gpux.ai/api/inference/gpux/sd15?return_grid=true&seed=${state.seed}&image_count=1&steps=8&prompt=${state.prompt}`;
}

return (
  <div
    style={{
      width: "100%",
      background: "linear-gradient(to right, black, #3a0201, black)",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
    }}
  >
    <div className="mb-3">
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeihafj7gtw6jrwxb5xjyk22hy642hgwn2rjqguarkpvun5myovtb5i)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "162px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
      <div
        className="mb-3"
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiazlfekaws35jiqvesssae66xybdsutug7ab7moumr2t35vntbleu)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "81px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          value={state.prompt}
          style={{
            width: "512px",
            backgroundColor: "black",
            color: "white",
            fontFamily: '"Press Start 2P", sans-serif',
          }}
          onChange={(e) => {
            state.prompt = e.target.value;
            State.update(state);
          }}
        />
      </div>
      <div
        className="mb-3"
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeibzasxppb76w62uje25cioacxzh5olpf76jezydpiywno5ab2zmqy)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "81px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a className="btn btn-outline-primary" onClick={(e) => rollImage()}>
          🎲 Generate an Image
        </a>
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeihdd765olkr6w2d5p7tiv3cyjqae4eh3b3aokyezyksi65alswybu)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundImage:
              "url(https://ipfs.fleek.co/ipfs/bafybeiburel4azxripu5f6awh6azhitxbptqovppliyav6ilwndswk6yeq)",
            backgroundSize: "auto",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "512px",
            color: "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={imgSrc}
            onLoad={(e) => {
              state.blur = 0;
              State.update(state);
            }}
            style={{ filter: `blur(${state.blur}px)`, maxWidth: "512px" }}
          />
        </div>
      </div>
    </div>
  </div>
);
