let autoplay = props.autoplay ?? 1;

let iframe = Object.fromEntries(
  Object.entries(styled.p``).filter(([k]) => k)
).withComponent("iframe");

let svg = Object.fromEntries(
  Object.entries(styled.p``).filter(([k]) => k)
).withComponent("svg");
let path = Object.fromEntries(
  Object.entries(styled.p``).filter(([k]) => k)
).withComponent("path");

return (
  <>
    <Widget src="miraclx.near/widget/FontAwesome?dep=1" />

    <div class="container text-center">
      <iframe
        allow="autoplay"
        style={{ width: "75vw", height: "75vh" }}
        src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=${Number(
          autoplay
        )}&controls=0&enablejsapi=1`}
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
        I just got rickrolled!
      </CommitButton>
      <i class="fa-solid fa-face-grin-tongue-wink"></i>

      <button class="btn btn-outline-secondary" title="Copy Share Link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style={{ width: "1em", height: "1em", "vertical-align": "-0.125em" }}
        >
          <path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
        </svg>
      </button>

      <button class="btn btn-outline-secondary" title="Copy Share Link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style={{ width: "1em", height: "1em", "vertical-align": "-0.125em" }}
        >
          <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z" />
        </svg>
      </button>

      <br />
      <br />

      <Widget src="miraclx.near/widget/Web6LeaderBoard" />
    </div>
  </>
);
