State.init({
  videoId: props.videoId ?? "dQw4w9WgXcQ",
  controls: props.controls ?? true,
  height: props.height ?? "75vh",
  width: props.width ?? "75vw",
  autoplay: props.autoplay ?? true,
  view: "preview",
});

let iframe = Object.fromEntries(
  Object.entries(styled.i``).filter(([k]) => k)
).withComponent("iframe");

function embed() {
  return (
    <iframe
      allow="autoplay"
      style={{ width: state.width, height: state.width }}
      src={`https://www.youtube.com/embed/${
        state.videoId
      }?enablejsapi=1&autoplay=${Number(state.autoplay)}&controls=${Number(
        state.controls
      )}`}
    ></iframe>
  );
}

if (props.dep) return embed();

function updateVideoId(url) {
  const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  let videoId = undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
  State.update({ videoId });
}

let form = Object.fromEntries(
  Object.entries(styled.i``).filter(([k]) => k)
).withComponent("form");

return (
  <>
    <Widget src="miraclx.near/widget/FontAwesome" props={{ dep: true }} />
    <div class="input-group mb-3">
      <span
        class="input-group-text"
        id="videoId-label"
        style={{ color: "red" }}
      >
        <i class="fa-brands fa-youtube"></i>
      </span>
      <input
        type="text"
        class="form-control border-danger"
        aria-describedby="videoId-label"
        placeholder="YouTube Video ID (ex: dQw4w9WgXcQ)"
        value={state.videoId}
        onChange={(e) => updateVideoId(e.target.value)}
      />
    </div>
    <div class="row">
      <div class="col">
        <form>
          <div class="form-check form-check-inline form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="autoplayCheckbox"
              checked={state.autoplay}
              onChange={(e) => State.update({ autoplay: !state.autoplay })}
            />
            <label class="form-check-label" for="autoplayCheckbox">
              Autoplay
            </label>
          </div>
          <div class="form-check form-check-inline form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="controlsCheckbox"
              checked={state.controls}
              onChange={(e) => State.update({ controls: !state.controls })}
            />
            <label class="form-check-label" for="controlsCheckbox">
              Controls
            </label>
          </div>
        </form>
      </div>
      <div class="col">
        <div class="input-group">
          <span class="input-group-text" id="widthLabel">
            <i class="fa-solid fa-left-right"></i>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Width"
            aria-label="Width"
            aria-describedby="widthLabel"
            value={state.width}
          />
          <span class="input-group-text" id="heightLabel">
            <i class="fa-solid fa-up-down"></i>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Height"
            aria-label="Height"
            aria-describedby="heightLabel"
            value={state.height}
          />
        </div>
      </div>
    </div>

    <hr />
    <ul class="nav nav-pills justify-content-center" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link text-dark active"
          id="preview-tab"
          data-bs-toggle="tab"
          data-bs-target="#preview"
          type="button"
          role="tab"
          aria-controls="preview"
          aria-selected={state.view == "preview"}
          onChange={() => State.update({ view: "preview" })}
        >
          Preview
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link text-dark"
          id="code-tab"
          data-bs-toggle="tab"
          data-bs-target="#code"
          type="button"
          role="tab"
          aria-controls="code"
          aria-selected={state.view == "code"}
          onClick={() => State.update({ view: "code" })}
        >
          Code
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="preview"
        role="tabpanel"
        aria-labelledby="preview-tab"
      >
        <br />
        {state.view === "preview" ? embed() : <></>}
      </div>
      <div
        class="tab-pane fade"
        id="code"
        role="tabpanel"
        aria-labelledby="code-tab"
      >
        <Markdown
          text={`\`\`\`jsx
<Widget
    src="miraclx.near/widget/YouTubeVideo"
    props={{
      videoId: "${state.videoId}",
      width: "${state.width}", height: "${state.height}",
      autoplay: ${state.autoplay}, controls: ${state.controls}
    }}
/>
`}
        />
      </div>
    </div>
  </>
);
