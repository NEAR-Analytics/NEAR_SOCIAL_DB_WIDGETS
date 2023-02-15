const H3 = styled.h3`
  color: rgb(6, 252, 153);
  font-family: Silkscreen;
  margin-bottom: 10px;
  margin-top: 30px;
`;

const App = styled.div`
    border: 1px solid rgb(6, 252, 153);
    border-radius: 3px;
    width: 130px;
    height: 120px;
`;

const A = styled.a`
  color: rgb(6, 252, 153);
`;

return (
  <>
    <div className="tab-content row p-0" id="pills-tabContent">
      <H3>Core</H3>
    </div>
    <div className="tab-content row p-0" id="pills-tabContent">
      <div
        className="tab-pane show active d-lg-block col-lg-8"
        id="pills-feed"
        role="tabpanel"
        aria-labelledby="pills-feed-tab"
      >
        <A href="#/mattlock.near/widget/canto-base-swap">
          <App>
            <img
              width="120"
              src="https://cloudflare-ipfs.com/ipfs/bafybeic45juylr7zsivlkkldg5bwaajdx3biclpog3fzr6eknbvidn6rve/Screen%20Shot%202023-02-14%20at%203.44.32%20PM.png"
            />
          </App>
          <h5>Swap</h5>
        </A>
      </div>
      <div
        className="tab-pane d-lg-block col-lg-4"
        id="pills-explore"
        role="tabpanel"
        aria-labelledby="pills-explore-tab"
      ></div>
    </div>
    <div className="tab-content row p-0" id="pills-tabContent">
      <div
        className="tab-pane d-lg-block col-lg-4"
        id="pills-explore"
        role="tabpanel"
        aria-labelledby="pills-explore-tab"
      >
        <H3>DeFi</H3>
        <div
          className="tab-pane show active d-lg-block col-lg-8"
          id="pills-feed"
          role="tabpanel"
          aria-labelledby="pills-feed-tab"
        >
          <A href="#/mattlock.near/widget/canto-base-swap">
            <App>
              <img
                width="120"
                src="https://cloudflare-ipfs.com/ipfs/bafybeic45juylr7zsivlkkldg5bwaajdx3biclpog3fzr6eknbvidn6rve/Screen%20Shot%202023-02-14%20at%203.44.32%20PM.png"
              />
            </App>
            <h5>cantoswap</h5>
          </A>
        </div>
      </div>
      <div
        className="tab-pane d-lg-block col-lg-4"
        id="pills-explore"
        role="tabpanel"
        aria-labelledby="pills-explore-tab"
      >
        <H3>Live NFT Mints</H3>
        <div
          className="tab-pane show active d-lg-block col-lg-8"
          id="pills-feed"
          role="tabpanel"
          aria-labelledby="pills-feed-tab"
        >
          <A href="#/mattlock.near/widget/canto-base-swap">
            <App>
              <img
                width="120"
                src="https://cloudflare-ipfs.com/ipfs/bafybeic45juylr7zsivlkkldg5bwaajdx3biclpog3fzr6eknbvidn6rve/Screen%20Shot%202023-02-14%20at%203.44.32%20PM.png"
              />
            </App>
            <h5>cantoswap</h5>
          </A>
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <Widget src="whtt.near/widget/Editor.ComponentSearch" />
      </div>
    </div>
  </>
);
