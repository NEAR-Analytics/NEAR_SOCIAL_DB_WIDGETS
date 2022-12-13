const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to add a new image";
}

initState({
  img: {},
  prompt:
    "a landscape mythical, clouds, sunset, sunrays, flare, 8k photorealistic, watercolor, cinematic lighting, HD, high details, atmospheric",
  seed: null,
  rollImg:
    "https://ipfs.fleek.co/ipfs/bafybeifigam7f4j64d5r4hhwxjzkutrdvg6uzz3mumf56byfigelaq4uki",
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
            "url(https://ipfs.fleek.co/ipfs/bafybeiexyyaohnej54mu7u4lbtrgiu3b42mk5b57lo5d5yndbtcm7z43ni)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "162px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://ipfs.fleek.co/ipfs/bafybeihjvub4e3yqyazxr62dxpbohji45wnx7hp7gadxjbiet2nrgkhapy"
          alt="VG Logo"
        />
      </div>

      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiffwmpcednhwtbzuo5bn7j2hu3vdbo3sdi3r4mknzynjcklco3vee)",
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
        <div style={{ width: "auto" }}>
          <input
            type="text"
            value={state.prompt}
            style={{
              width: "auto",
              backgroundColor: "black",
              color: "white",
              fontFamily: '"Press Start 2P", sans-serif',
              border: "1px solid #3a0201",
            }}
            onChange={(e) => {
              state.prompt = e.target.value;
              State.update(state);
            }}
          />
        </div>
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeighshx342jt65t4nuisdpko3tar747kyzb2g6ud64pwuiwhxcvs7u)",
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
        <div>
          <input
            type="range"
            min={0}
            max={25}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              width: "100px",
              backgroundColor: "black",
              color: "white",
              fontFamily: '"Press Start 2P", sans-serif',
              margin: "10px 10px 10px 10px",
              border: "1px solid #3a0201",
            }}
          />
          <a>{value}</a>
        </div>
        <a
          className="btn btn-outline-primary"
          onClick={(e) => rollImage()}
          style={{
            width: "200px",
            backgroundColor: "black",
            color: "white",
            fontFamily: '"Press Start 2P", sans-serif',
            margin: "20px 20px 20px 20px",
            border: "1px solid #3a0201",
          }}
        >
          Generate
        </a>
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiefpyc2h5b5drmuovzezx2u2gmbapzym3ckow5qmszl5ygudqvbam)",
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
          src="https://ipfs.fleek.co/ipfs/bafybeiburel4azxripu5f6awh6azhitxbptqovppliyav6ilwndswk6yeq"
          style={{ position: "absolute", zIndex: 1 }}
        />
        <img
          src={imgSrc}
          onLoad={(e) => {
            state.blur = 0;
            State.update(state);
          }}
          style={{
            filter: `blur(${state.blur}px)`,
            position: "relative",
            zIndex: 0,
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
