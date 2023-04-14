const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to add a new image";
}

initState({
  meme: { title: "", description: "" },
  img: {},
  rollImg: "https://via.placeholder.com/512x512",
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
  state.rollImg =
    "https://explorer.gpux.ai/api/inference/gpux/sd15?return_grid=true&image_count=2&steps=10&prompt=an illustration of a samurai battle sunshine, oriental watercolor themed, sun rising ";
}

return (
  <div className="row mb-3">
    <div
      style={{
        backgroundImage: "url(https://example.com/background-image.jpg)",
        backgroundSize: "auto 80px",
        backgroundPosition: "center",
        height: "80px",
        backgroundColor: "#333",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      image space
    </div>
    <div>
      <h4>Add an image</h4>
    </div>
    <div className="mb-2">
      Image:
      <br />
      <IpfsImageUpload image={state.img} />
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
    <div className="mb-2">
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
    <hr />{" "}
    <div
      style={{
        backgroundImage: "url(https://example.com/background-image.jpg)",
        backgroundSize: "auto 524px",
        backgroundPosition: "center",
        height: "524px",
        backgroundColor: "#eee",
        color: "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img id="rollImg" src={state.rollImg} style={{ filter: "blur(0px)" }} />
    </div>
    {(hasMeme || !props.noPrevMeme) && (
      <Widget
        src="duocelot.near/widget/meme"
        props={{ meme: hasMeme ? meme : undefined }}
      />
    )}
  </div>
);
