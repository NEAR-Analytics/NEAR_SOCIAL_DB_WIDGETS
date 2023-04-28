const accountId = context.accountId;
const _data = fetch(
  "https://api-v2-mainnet.paras.id/token-series?exclude_total_burn=true&lookup_token=true&__limit=30&__sort=updated_at::-1&is_verified=false&min_price=0&max_price=0"
);
const dataTokenSeries = _data.body.data;

let buy = (price, token_series_id) => {
  const gas = 200000000000000;
  const deposit = new Big(price + 11280000000000000000000).toFixed(0);

  Near.call(
    "x.paras.near",
    "nft_buy",
    {
      token_series_id: token_series_id,
      receiver_id: accountId,
    },
    gas,
    deposit
  );
};

const YoctoToNear = (amountYocto) =>
  new Big(amountYocto).div(new Big(10).pow(24)).toString();

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  min-height: 100vh;
  margin: 5%;
  justify-content: flex-start;
  flex-wrap: wrap;

  > div {
    flex: 0.5 0 20%;
  }
`;

const StyledCard = styled.div`
  background: #fff;
  margin: 1em;
  padding: 1rem;
  display: flex;
  flex-flow: column;
  border-radius: 0.5rem;
  transition: 300ms ease;
  box-shadow: 0px 0px 10px 0.5px #888888;

  h1 {
    margin-top: 0.5em;
    font-size: 1em;
  }

  img {
    width: 20em;
    height: 20em;
    border-radius: 0.2em;
  }

  p {
    max-width: 80%;
    line-height: 1.45em;
  }

  button {
    font-weight: bold;
  }

  &:hover {
    box-shadow: 0px 0px 10px 4px #888888;
    img {
      filter: grayscale(0) blur(0);
    }
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 4px 0 4px;
  `;

return (
  <div className="d-flex gap-4 flex-wrap">
    <div>
      <div className="d-flex gap-2" style={{ alignItems: "center" }}>
        <a href="https://paras.id/" target="_blank">
          <img
            src={`https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/bc798fbeb87c2fce1feb449b51ad37cb.png`}
            style={{ width: "35px", height: "35px" }}
          />
        </a>
        <h1>PARAS NFT MARKETPLACE </h1>
      </div>
      <p>
        Free Mint NFT Every Day | This is widget paras for near.social and made
        for free NFT only✨
      </p>
    </div>
    <Wrapper>
      {Array.from(
        _data.body.data.results.map((token, idx) => {
          const priceYocto = token.lowest_price || token.price;
          const priceNear = YoctoToNear(priceYocto);

          return (
            <div className="d-flex flex-column gap-1">
              <StyledCard {...props}>
                <a
                  href={`https://paras.id/token/x.paras.near::${token.token_series_id}`}
                  target="_blank"
                >
                  <img
                    src={`https://paras-cdn.imgix.net/${token.metadata.media}`}
                  />
                </a>

                <Content>
                  <div>
                    <h1>
                      {token.metadata.collection.length >= 20
                        ? token.metadata.collection.slice(0, 20) + "..."
                        : token.metadata.collection}{" "}
                      #{token.token_series_id}
                    </h1>
                    <p>Price {priceNear} N</p>
                  </div>
                  <div>
                    <button
                      disabled={!accountId}
                      onClick={() => {
                        if (!accountId) return;
                        buy(priceYocto, token.token_series_id);
                      }}
                    >
                      Claim
                    </button>
                  </div>
                </Content>
              </StyledCard>
            </div>
          );
        })
      )}
    </Wrapper>
  </div>
);
