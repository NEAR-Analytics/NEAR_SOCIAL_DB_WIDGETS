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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style={{
            width: "1em",
            height: "1em",
            "vertical-align": "-0.125em",
          }}
        >
          <path
            fill="white"
            d="M174.5 498.8C73.1 464.7 0 368.9 0 256C0 114.6 114.6 0 256 0S512 114.6 512 256c0 112.9-73.1 208.7-174.5 242.8C346.7 484 352 466.6 352 448V401.1c24.3-17.5 43.6-41.6 55.4-69.6c5-11.8-7-22.5-19.3-18.7c-39.7 12.2-84.5 19-131.8 19s-92.1-6.8-131.8-19c-12.3-3.8-24.3 6.9-19.3 18.7c11.7 27.8 30.8 51.7 54.8 69.2V448c0 18.6 5.3 36 14.5 50.8zm20.7-265.2c5.3 7.1 15.3 8.5 22.4 3.2s8.5-15.3 3.2-22.4c-30.4-40.5-91.2-40.5-121.6 0c-5.3 7.1-3.9 17.1 3.2 22.4s17.1 3.9 22.4-3.2c17.6-23.5 52.8-23.5 70.4 0zM336 272c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64zM320 402.6V448c0 35.3-28.7 64-64 64s-64-28.7-64-64V402.6c0-14.7 11.9-26.6 26.6-26.6h2c11.3 0 21.1 7.9 23.6 18.9c2.8 12.6 20.8 12.6 23.6 0c2.5-11.1 12.3-18.9 23.6-18.9h2c14.7 0 26.6 11.9 26.6 26.6zM336 232c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z"
          />
        </svg>
      </CommitButton>

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
