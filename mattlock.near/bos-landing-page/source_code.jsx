// const cssFont = fetch(
//   "https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700"
// ).body;
// const css = fetch(
//   "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
// ).body;

const fontUrl = `https://ipfs.io/ipfs/bafkreicrs3gh7f77yhpw4xiejx35cd56jcczuhvqbwkn77g2ztkrjejopa`;

const css = `
@font-face {
    font-family: "Pixter";
    src: url("${fontUrl}");
}

.header {
    position: relative;
    display: flex;
    overflow: hidden;
    width: 100%;
    filter: contrast(1.2);
    > div {
        padding: 32px;
        h1 {
        font-size: 3rem;
        }
        h2 {
            opacity: 0.7;
        }
        > div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
        }
    }
}

.header-left {
    background: linear-gradient(253.16deg, #4D1CB6 1.53%, #AC3A7F 86.25%);
    width: 55%;
    height: 440px;
  transform-origin: 100% 0;
  transform: skew(-10deg);
}

.header-right {
    margin-left: -100px;
    background: linear-gradient(255.45deg, #7D14AF 12.67%, #00D1FF 87.81%);
    width: calc(45% + 100px);
    height: 440px;
    text-align: right;
}

.noise {
    mix-blend-mode: soft-light;
    position: absolute;
    z-index: 1;
    opacity: 0.5;
  width: 100vw;
  height: 440px;
  background: url('https://s3-alpha-sig.figma.com/img/aa66/ca0f/536910691a243c017d29d4fe29b4da0a?Expires=1677456000&Signature=SCOYHroTrc--MSSaDWtzcsPvcoHQs9~lF2cwUv-4liY-MTa01xehz4dcVFgvyyqrN8oohEeIZ28SjtcVRFVquNupbyqMUe06cB84IN8T-tvZ7pJqsT96NB2rwpfZvTgcBioY0lRVU45~LGxBF6Mq-Cow-WjIwjU3UZUADEdhVQx85g1hK3OIpn4xP2QJmKor1raV4EdvS7dI0PzyzZg1b9h3EUgEACu15Bl~7d6HD6~a1mQVz6WLJOa4GlOpAnOs7fpG6d8vsWjA1BV6jkXHkra4F82EvKGOhXJp-Ti04S37Km5OQBxc6KOTB8MbOS-FOgeVENObE~7l-fuMZvLW1A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4');
 }

 .header-content-left {
     position: absolute;
     z-index: 2;
     height: 100%;
 }

 .main {
     padding: 32px;
     p {
         opacity: 0.7;
     }
 }
`;

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Pixter;
    background: black;
    color: white;
    ${css}
`,
  });
}
const Theme = state.theme;

return (
  <Theme>
    <div class="header">
      <div class="header-left"></div>
      <div class="header-content-left">
        <div>
          <div>
            <h1>What is BOS?</h1>
            <h2>&#60;Blockchain OS&#62;</h2>
          </div>
          <div>
            <h3>Read Docs -&#62;</h3>
          </div>
        </div>
      </div>
      <div class="header-right">
        <div>
          <div>
            <h1>$20k Bounty</h1>
            <h2>&#60;Hackathon&#62;</h2>
          </div>
          <div>
            <h3>Sign Up For Hackathon -&#62;</h3>
          </div>
        </div>
      </div>
      <div class="noise"></div>
      <div class="noise"></div>
    </div>

    <div class="main">
      <h3>dApps</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta
        laoreet augue. Donec et tellus purus. Aenean vitae magna felis. Nunc
        tincidunt mauris eget pellentesque facilisis. Sed sed fringilla turpis,
        eget venenatis lectus.
      </p>

      <div>
        <div className="mb-2">
          <Widget
            src="mob.near/widget/ComponentSearch"
            props={{
              limit: 10,
              term: "",
              filterTag: "ETHDenver2023",
              onChange: ({ result: components, term }) =>
                State.update({ components, term }),
            }}
          />
        </div>
        {state.components && state.components.length > 0 && (
          <div className="mb-2">
            {state.components.map((component, i) => (
              <div key={i}>
                <Widget
                  src="mob.near/widget/Editor.ComponentSearch.Item"
                  props={{
                    accountId: component.accountId,
                    widgetName: component.widgetName,
                    onEmbed: () => State.update({ components: null }),
                    onHide: () => State.update({ components: null }),
                    extraButtons: props.extraButtons,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </Theme>
);
