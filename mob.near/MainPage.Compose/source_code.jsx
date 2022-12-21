if (!context.accountId) {
  return "";
}

State.init({
  image: {},
  text: "",
});

const content = (state.text || state.image.cid) && {
  type: "md",
  text: state.text,
  image: state.image.cid ? { ipfs_cid: state.image.cid } : undefined,
};

const onChange = (text) => {
  State.update({
    text,
  });
};

return (
  <>
    <div className="text-bg-light rounded-4">
      <div className="p-2">
        <textarea
          className="form-control border-0 text-bg-light w-100"
          value={state.text || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="What's happening?"
        />
      </div>
      <div className="d-flex flex-row p-2 border-top">
        <div className="flex-grow-1">
          <IpfsImageUpload
            image={state.image}
            className="btn btn-outline-secondary border-0 rounded-3"
          />
        </div>
        <div>
          <CommitButton
            disabled={!content}
            className="btn btn-dark rounded-3"
            data={{
              post: {
                main: JSON.stringify(content),
              },
              index: {
                post: JSON.stringify({
                  key: "main",
                  value: {
                    type: "md",
                  },
                }),
              },
            }}
            onCommit={() =>
              State.update({
                image: {},
                text: "",
              })
            }
          >
            Post
          </CommitButton>
        </div>
      </div>
    </div>
    {content && (
      <div className="mt-3">
        <Widget
          src="mob.near/widget/MainPage.Post"
          props={{
            accountId: context.accountId,
            content,
            blockHeight: "now",
          }}
        />
      </div>
    )}
  </>
);
