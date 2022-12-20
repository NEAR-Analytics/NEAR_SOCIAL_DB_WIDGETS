let autoplay = props.autoplay ?? 1;
let width = props.width ?? "75vw";
let height = props.height ?? "75vh";
let controls = props.controls ?? true;
let videoId = props.videoId ?? "dQw4w9WgXcQ";

State.init({ videoId });

let iframe = Object.fromEntries(
  Object.entries(styled.i``).filter(([k]) => k)
).withComponent("iframe");

function embed() {
  return (
    <iframe
      allow="autoplay"
      style={{ width, height }}
      src={`https://www.youtube.com/embed/${
        state.videoId
      }?enablejsapi=1&autoplay=${Number(autoplay)}&controls=${
        controls ? "1" : "0"
      }`}
    ></iframe>
  );
}

if (props.dep) return embed();

return (
  <>
    <div class="input-group mb-3">
      <span class="input-group-text" id="videoId-label">
        YouTube Video id:
      </span>
      <input
        type="text"
        class="form-control"
        aria-describedby="videoId-label"
        value={state.videoId}
      />
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
          onClick={() => (state.view = "preview")}
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
          onClick={() => (state.view = "code")}
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
        <Widget
          src="miraclx.near/widget/YouTubeVideo"
          props={{
            dep: false,
            videoId: state.videoId,
            autoplay,
            width,
            height,
            controls,
          }}
        />
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
    props={{ videoId: "${state.videoId}", autoplay: ${autoplay}, width: "${width}", height: "${height}", controls: ${controls} }}
/>
`}
        />
      </div>
    </div>
  </>
);
