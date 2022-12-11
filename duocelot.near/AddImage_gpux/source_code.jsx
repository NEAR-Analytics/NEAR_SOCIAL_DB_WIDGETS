const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to add a new image";
}

initState({
  meme: { title: "", description: "" },
  img: {},
  prompt: "greg rutkowski galatic ((battle)) 4k anime manga japanese sunset",
  seed: null,
  rollImg:
    "https://ipfs.fleek.co/ipfs/bafybeih7tutznkvbuecy3nfmpwo7q5w7kzyqwdvlipjtcyqevnkpz2jf44",
  blur: 0,
});

const meme = {
  title: state.meme.title,
  description: state.meme.description,
  image: {},
};

if (state.img.cid) {
  meme.image.ipfs_cid = state.img.cid;
}

const hasMeme = meme.image.ipfs_cid || meme.title;

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
  <div style={{ background: "linear-gradient(to bottom, violet, black)" }}>
    <div className="row mb-3">
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeihafj7gtw6jrwxb5xjyk22hy642hgwn2rjqguarkpvun5myovtb5i)",
          backgroundSize: "904px 162px",
          backgroundPosition: "center",
          height: "162px",
          backgroundColor: "#333",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
      <div
        className="mb-2"
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiazlfekaws35jiqvesssae66xybdsutug7ab7moumr2t35vntbleu)",
          backgroundSize: "auto 81px",
          backgroundPosition: "center",
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
      {meme.image.ipfs_cid && (
        <div className="mb-2">
          Title <span className="text-secondary">(optional)</span>
          <input type="text" value={state.meme.title} />
        </div>
      )}
      {state.meme.title && (
        <div className="mb-2">
          Description <span className="text-secondary">(optional)</span>
          <input type="text" value={state.meme.description} />
        </div>
      )}
      <div
        className="mb-2"
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeibzasxppb76w62uje25cioacxzh5olpf76jezydpiywno5ab2zmqy)",
          backgroundSize: "auto 80px",
          backgroundPosition: "center",
          height: "80px",
          backgroundColor: "yellow",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hasMeme ? (
          <CommitButton data={{ post: { meme } }}>Post image</CommitButton>
        ) : (
          !props.noPrevMeme && (
            <a className="btn btn-outline-primary" onClick={(e) => rollImage()}>
              🎲 Generate an Image
            </a>
          )
        )}
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeihdd765olkr6w2d5p7tiv3cyjqae4eh3b3aokyezyksi65alswybu)",
          backgroundSize: "904px 526px",
          backgroundPosition: "center",
          height: "524px",
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
);
