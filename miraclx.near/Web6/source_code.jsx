let autoplay = props.autoplay ?? 1;

let iframe = Object.fromEntries(
  Object.entries(styled.p``).filter(([k]) => k)
).withComponent("iframe");

return (
  <>
    <Widget src="miraclx.near/widget/FontAwesome" props={{ dep: true }} />

    <div class="text-center">
      <a href="https://near.social/#/miraclx.near/widget/Web6">
        <h1 class="display-1" style={{ "margin-bottom": "0.1rem" }}>
          <i class="fa-solid fa-globe text-secondary"></i>
        </h1>
      </a>
      <h4 class="text-secondary">Web6</h4>
      <h6>
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ authors: ["miraclx.near", "logunov.near", "esaminu.near"] }}
        />
      </h6>
    </div>

    <div class="container text-center">
      <Widget
        src="miraclx.near/widget/YouTubeVideo"
        props={{
          videoId: "dQw4w9WgXcQ",
          width: "75vw",
          height: "75vh",
          autoplay,
          controls: false,
          dep: true,
        }}
      />

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
              key: "web6-event",
              value: Date.now(),
            }),
          },
        })}
      >
        I just got rickrolled! <i class="fa-solid fa-face-grin-tongue-wink"></i>
      </CommitButton>

      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>Copy Share Link</Tooltip>}
      >
        <button class="btn btn-outline-secondary">
          <i class="fa-solid fa-up-right-from-square"></i>
        </button>
      </OverlayTrigger>

      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>What is this?</Tooltip>}
      >
        <button class="btn btn-outline-secondary" title="What is this?">
          <i class="fa-solid fa-circle-question"></i>
        </button>
      </OverlayTrigger>

      <br />
      <br />

      <Widget src="miraclx.near/widget/Web6LeaderBoard" />
    </div>
  </>
);
