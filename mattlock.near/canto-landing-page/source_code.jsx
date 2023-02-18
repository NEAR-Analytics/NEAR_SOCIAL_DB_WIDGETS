initState({
  showAbout: true,
});

const css = `
  .flex {
    display: flex;
    > div {
        margin: 32px 0;
      margin-right: 32px;
      width: 50%;
      border: 2px solid rgb(6, 252, 153);
    }
    > div:last-of-type {
      margin-right: 0;
    }
  }
  .btn {
      margin-bottom: 16px !important;
  }
`;

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}
`,
  });
}
const Theme = state.theme;

const sender = Ethers.send("eth_requestAccounts", [])[0];

return (
  <Theme>
    <h1>Welcome to Cantopia!</h1>

    {!sender && <h2>Please Connect Your Wallet First to Canto Mainnet!</h2>}

    <button
      class="btn btn success"
      onClick={() => {
        State.update({ showAbout: !state.showAbout });
      }}
    >
      {state.showAbout ? "Hide About" : "Show About"}
    </button>

    {state.showAbout && (
      <>
        <p>The homepage for Canto users and developers!</p>
        <ul>
          <li>
            Find and use the Core apps, DeFi apps, new NFT mints, marketplaces
          </li>
          <li>
            View the source code for the frontend the same way you view smart
            contract code on explorers, fork it, make changes, deploy your own
            version
          </li>
          <li>
            Components are also composable, you can load other devs components
            into your own, with version control to prevent malicious updates
          </li>
          <li>
            Devs can deploy frontends in seconds, never worry about hosting
            again
          </li>
          <li>
            {" "}
            Frontends can be managed via DAOs, just like protocols. Including
            the main components, which could be governed by CANTO holders
          </li>
        </ul>
        <p>Next steps for Cantopia</p>
        <ul>
          <li>We want all major apps to be available on Cantopia</li>
          <li>
            If we win the hackathon, we will distribute 100% of the CANTO out as
            bounties to get these apps built
          </li>
          <li>
            To make Cantopia fully trustless and impossible to take offline, we
            will distribute it as an Electron app for users to download
          </li>
        </ul>
      </>
    )}

    <h3>Featured Components (LIVE ON MAINNET)</h3>
    <div class="flex">
      <Widget src="mattlock.near/widget/cantoswap-component" />
      <Widget
        src="mattlock.near/widget/cantoswap-component"
        props={{
          contractName: "Canto Base Router",
          contractImg:
            "https://blog.mexc.com/wp-content/uploads/2022/11/canto_logo.png",
          contractAddress: "0xa252eEE9BDe830Ca4793F054B506587027825a8e",
          abiUrl:
            "https://gist.githubusercontent.com/mattlockyer/a9de9620116c546f85003010f6a3bec5/raw/e2e00d35baa20d67aaae1278182f44773f434b44/cantoBaseV1RouterAbi",
        }}
      />
    </div>
    <div class="flex">
      <div style={{ padding: 16 }}>
        <Widget src="whtt.near/widget/Draft-1" />
      </div>
    </div>

    <h3>Search Components, View Source and Edit Live!</h3>
    <Widget
      src="mattlock.near/widget/canto-component-search"
      props={{ limit: 4 }}
    />
  </Theme>
);
