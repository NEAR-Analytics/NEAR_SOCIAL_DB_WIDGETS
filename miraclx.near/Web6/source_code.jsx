let iframe = Object.fromEntries(
  Object.entries(styled.p``).filter(([k]) => k)
).withComponent("iframe");

return (
  <>
    <div class="container text-center">
      <iframe
        width="100%"
        height="500"
        allow="autoplay"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=0&enablejsapi=1"
      ></iframe>

      <hr />

      <CommitButton
        onClick={() => {
          State.update({
            lastRRTime: Date.now(),
          });
        }}
        onCommit={() => {
          State.update({
            lastMoo: null,
          });
        }}
        onCancel={() => {
          State.update({
            lastMoo: null,
          });
        }}
        data={() => ({
          index: {
            web6: JSON.stringify({
              key: "web6-idx",
              value: Date.now(),
            }),
          },
        })}
      >
        I just got rickrolled! 🤡
      </CommitButton>

      <button class="btn btn-outline-secondary" title="Copy Share Link">
        🔗
      </button>

      <br />
      <br />

      <Widget src="miraclx.near/widget/Web6LeaderBoard" />
    </div>
  </>
);
