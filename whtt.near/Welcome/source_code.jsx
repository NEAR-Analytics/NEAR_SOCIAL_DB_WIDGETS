const H3 = styled.h3`
  color: rgb(6, 252, 153);
  font-family: Silkscreen;
  margin-bottom: 40px;
  margin-top: 30px;
`;

const App = styled.div`
  border: 1px solid rgb(6, 252, 153);
  border-radius: 3px;
  width: 130px;
  height: 120px;
`;

const Icon = styled.div`
  :hover {
    color: rgb(6, 252, 153);
    text-decoration: none;
    border: 1px solid rgb(6, 252, 153);
    border-radius: 3px;
  }
  margin: auto;
  text-align: center;
`;

const A = styled.a`
  :hover {
    color: rgb(6, 252, 153);
    text-decoration: none;
  }
  color: rgb(6, 252, 153);
`;

return (
  <>
    <div className="tab-content row p-0" id="pills-tabContent">
      <H3>Core</H3>
    </div>
    <div className="tab-content row p-0" id="pills-tabContent">
      <div
        className="tab-pane show active d-lg-block col-lg-1"
        id="pills-feed"
        role="tabpanel"
        aria-labelledby="pills-feed-tab"
      >
        <Icon>
          <A href="#/mattlock.near/widget/canto-base-swap">
            <img
              style={{ marginBottom: 10 }}
              width="50"
              src="https://cloudflare-ipfs.com/ipfs/bafybeig3pod36jvjrwqxswaooirmyhay4g65txkciie3olxbvivb336hlm/swap%282%29.png"
            />
            <h5>Swap</h5>
          </A>
        </Icon>
      </div>
      <div
        className="tab-pane show active d-lg-block col-lg-1"
        id="pills-feed"
        role="tabpanel"
        aria-labelledby="pills-feed-tab"
      >
        <Icon>
          <A href="#/mattlock.near/widget/canto-base-swap">
            <img
              style={{ marginBottom: 10 }}
              width="50"
              src="https://cloudflare-ipfs.com/ipfs/bafybeidqx23x4wfegl6vzn4do4jauzyzlz6bcujqgcd627dx7tk3gwg2ru/arch.png"
            />
            <h5>Bridge</h5>
          </A>
        </Icon>
      </div>
      <div
        className="tab-pane show active d-lg-block col-lg-1"
        id="pills-feed"
        role="tabpanel"
        aria-labelledby="pills-feed-tab"
      >
        <Icon>
          <A href="#/mattlock.near/widget/canto-base-swap">
            <img
              style={{ marginBottom: 10 }}
              width="50"
              src="https://cloudflare-ipfs.com/ipfs/bafybeiecjjcz45aujxeikqvajwtbxvkdj7ldilrhg62b6p7aaheed2d3yq/money-flow%282%29.png"
            />
            <h5>LP</h5>
          </A>
        </Icon>
      </div>
      <div
        className="tab-pane show active d-lg-block col-lg-1"
        id="pills-feed"
        role="tabpanel"
        aria-labelledby="pills-feed-tab"
      >
        <Icon>
          <A href="#/mattlock.near/widget/canto-base-swap">
            <img
              style={{ marginBottom: 10 }}
              width="50"
              src="https://cloudflare-ipfs.com/ipfs/bafybeiakzg2dkk7s2635yukaokaosyk4xroamicnnnavst4igsfljkhgrq/give-money.png"
            />
            <h5>Lending</h5>
          </A>
        </Icon>
      </div>
      <div
        className="tab-pane show active d-lg-block col-lg-1"
        id="pills-feed"
        role="tabpanel"
        aria-labelledby="pills-feed-tab"
      >
        <Icon>
          <A href="#/mattlock.near/widget/canto-base-swap">
            <img
              style={{ marginBottom: 10 }}
              width="50"
              src="https://cloudflare-ipfs.com/ipfs/bafybeid3sdlkthb6efaat2awaxf2tcxppnn2qdcrivaauxo4cyk4n3iex4/stake.png"
            />
            <h5>Stake</h5>
          </A>
        </Icon>
      </div>
      <div
        className="tab-pane show active d-lg-block col-lg-1"
        id="pills-feed"
        role="tabpanel"
        aria-labelledby="pills-feed-tab"
      >
        <Icon>
          <A href="#/mattlock.near/widget/canto-base-swap">
            <img
              style={{ marginBottom: 10 }}
              width="50"
              src="https://cloudflare-ipfs.com/ipfs/bafybeibom6hvfab4ojeibklrhfsvjv3ywuohn5tscftcfivsfda5kh6wnm/voting-box.png"
            />
            <h5>Govern</h5>
          </A>
        </Icon>
      </div>
      <div
        className="tab-pane d-lg-block col-lg-4"
        id="pills-explore"
        role="tabpanel"
        aria-labelledby="pills-explore-tab"
      ></div>
    </div>
    <div
      style={{ marginTop: 70 }}
      className="tab-content row p-0"
      id="pills-tabContent"
    >
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
      <div style={{ marginTop: 70 }}>
        <Widget src="whtt.near/widget/Editor.ComponentSearch" />
      </div>
    </div>
  </>
);
