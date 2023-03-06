return (
  <div>
    <h1>
      <b>Suinetwork Build without boundaries</b>
    </h1>
  </div>
);
const data = Social.keys(`*/post/meme`, "final", { return_type: "History" });

if (!data) {
  return "Loading";
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allMemes = accounts
    .map((account) => {
      const accountId = account[0];
      const blockHeights = account[1].post.meme;
      return blockHeights.map((blockHeight) => ({
        accountId,
        blockHeight,
      }));
    })
    .flat();

  allMemes.sort((a, b) => b.blockHeight - a.blockHeight);
  return allMemes;
};

const memeToWidget = ({ accountId, blockHeight }) => {
  return (
    <div style={{ minHeight: "200px" }}>
      <a
        href={`#/mob.near/widget/Meme?accountId=${accountId}&blockHeight=${blockHeight}`}
        class="text-decoration-none"
      >
        <Widget src="mob.near/widget/Meme" props={{ accountId, blockHeight }} />
      </a>
    </div>
  );
};

State.init({
  allMemes: processData(data),
  widgets: [],
});

const makeMoreMemes = () => {
  const newMemes = state.allMemes
    .slice(state.widgets.length, state.widgets.length + 10)
    .map(memeToWidget);
  newMemes.forEach((meme) => state.widgets.push(meme));
  State.update();
};

return (
  <div className="px-2 mx-auto">
    <InfiniteScroll
      loadMore={makeMoreMemes}
      hasMore={state.widgets.length < state.allMemes.length}
    >
      {state.widgets}
    </InfiniteScroll>
  </div>
);
State.init({ img: null });

const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid;
    State.update({ img: { cid } });
  });
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ img: { uploading: true, cid: null } });
    uploadFileUpdateState(files[0]);
  }
};

return (
  <div className="d-inline-block">
    {state.img ? (
      <img
        class="rounded w-100 h-100"
        style={{ objectFit: "cover" }}
        src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
        alt="upload preview"
      />
    ) : (
      ""
    )}
    <Files
      multiple={false}
      accepts={["image/*"]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={filesOnChange}
    >
      {state.img?.uploading ? <> Uploading </> : "Upload an Image"}
    </Files>
  </div>
);
