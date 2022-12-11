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
  width: "auto",
});

function rollImage() {
  var seed = Math.trunc(Math.random() * 100000000);
  state.seed = seed;
  state.blur = 3;
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
      height: "100%",
      background: "linear-gradient(to right, black, #3a0201, black)",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
    }}
  >
    <div>
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
            width: "480px",
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
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiapzstltgyd6pyibvlgkg62wdsuqvbp2wqbwuqxmjhazxm7tgh2ee)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "15px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
      <div
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
        <a
          className="btn btn-outline-primary"
          onClick={(e) => rollImage()}
          style={{
            width: "480px",
            backgroundColor: "black",
            color: "white",
            fontFamily: '"Press Start 2P", sans-serif',
          }}
        >
          Generate
        </a>
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiaye7rrdceoz44waxyn5ozulhopx6pbq7d4336cn6nenjwxuftsbe)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "8px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeihdd765olkr6w2d5p7tiv3cyjqae4eh3b3aokyezyksi65alswybu)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "526px",
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
          style={{
            filter: `blur(${state.blur}px)`,
            boxShadow: "0px 10px 10px 20px rgba(0,0,0,0.55)",
          }}
        />
      </div>
    </div>
    <div
      style={{
        backgroundImage:
          "url(https://ipfs.fleek.co/ipfs/bafybeihm5fiwy6dos2f4hiz67yaan3jafkndw5zkh23mb5rnue7qu6rh2y)",
        backgroundSize: "auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "123px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></div>
    <div
      style={{
        backgroundImage:
          "url(https://ipfs.fleek.co/ipfs/bafybeiamgwdx5uhhbgt7usn2wjxybn2b265mubicdj7bkyawgzjrmb22l4)",
        backgroundSize: "auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "523px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></div>
  </div>
);
