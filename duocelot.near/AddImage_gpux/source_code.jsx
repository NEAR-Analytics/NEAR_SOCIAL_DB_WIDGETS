const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to add a new image";
}

initState({
  meme: { title: "", description: "" },
  img: {},
  rollImg: "https://via.placeholder.com/512x512",
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
  state.rollImg = `https://explorer.gpux.ai/api/inference/gpux/sd15?return_grid=true&seed=${seed}&image_count=1&steps=8&prompt=greg rutkowski galatic ((battle)) 4k anime manga japanese sunset`;
  state.blur = 8;
  State.update(state);
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
    <div
      style={{
        backgroundImage: "url(https://example.com/background-image.jpg)",
        backgroundSize: "auto 80px",
        backgroundPosition: "center",
        height: "80px",
        backgroundColor: "blue",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h4>Add an image</h4>
    </div>

    <div
      className="mb-2"
      style={{
        backgroundImage: "url(https://example.com/background-image.jpg)",
        backgroundSize: "auto 80px",
        backgroundPosition: "center",
        height: "80px",
        backgroundColor: "red",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
    <div
      className="mb-2"
      style={{
        backgroundImage: "url(https://example.com/background-image.jpg)",
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
        backgroundImage: "url(https://example.com/background-image.jpg)",
        backgroundSize: "auto 524px",
        backgroundPosition: "center",
        height: "524px",
        background: "linear-gradient(to bottom, #040404, #232323)",
        color: "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        id="rollImg"
        src={state.rollImg}
        onLoad={(e) => {
          state.blur = 0;
          State.update(state);
        }}
        style={{ filter: `blur(${state.blur}px)`, maxWidth: "512px" }}
      />
    </div>
  </div>
);
