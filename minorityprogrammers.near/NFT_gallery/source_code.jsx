initState({
  collectionData: {},
  searchTerm: "",
  nftData: [],
  filteredNFTData: [],
  chainRate: "",
  chain: "near",
  conversion: 0,
});

function fetchData() {
  State.update({ nftData: [] });

  const response = fetch("https://api.indexer.xyz/graphql", {
    method: "POST",
    headers: {
      "x-api-key": "Krqwh4b.bae381951d6050d351945c0c750f1510",
      "x-api-user": "Banyan",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query MyQuery {
  ${state.chain}{
    crypto_rates(where: {fiat: {_eq: "USD"}}) {
      crypto
      rate
    }
    nfts(order_by: {rarity: asc}) {
      id
      name
      media_url
      ranking
      rarity
      token_id
      listings {
        price
      }
    }
  }
}`,
    }),
  });

  response === []
    ? ""
    : State.update({
        nftData: response.body.data[state.chain].nfts,
        chainRate: response.body.data[state.chain].crypto_rates[4].rate,
      });

  const priceConvert = (chain) => {
    switch (chain) {
      case "stacks":
        return State.update({ conversion: 10000000000 });
      case "sui":
        return State.update({ conversion: 10000000000 });
      case "near":
        return State.update({ conversion: 1000000000000000000000000 });
      case "aptos":
        return State.update({ conversion: 100000000 });
      default:
        return 0;
    }
  };
  priceConvert(state.chain);
}

fetchData();
const updateInputCollectionSlug = (e) => {
  State.update({ inputCollectionSlug: e.target.value });
};

const handleFetchButtonClick = () => {
  State.update({ collectionSlug: state.inputCollectionSlug });
  fetchData();
};

const updateCollectionSlug = (e) => {
  State.update({ collectionSlug: e.target.value });
};

const seachInputHandler = (e) => {
  const value = e.target.value.toLowerCase();
  console.log(value);
  const searched = state.nftData.filter((nft) =>
    nft.name.toLowerCase().includes(value)
  );
  State.update({
    searchTerm: value,
    filteredNFTData: searched,
  });
};

const isPriceValid = typeof nft.listings[0]?.price === "number";

const handleDropdownChange = (event) => {
  State.update({ chain: event.target.value });
};

const Stats = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: "100%";
      max-width: 800px;
      gap: 20px;
  `;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  `;

const PageTitle = styled.h1`
  text-align:center;
  font-size: 4vw; 
  font-weight: bold; 
  margin-bottom: 20px; 
  color: #0f1d40;
  `;

const NFTCard = styled.div`
   display: flex;
   flex-flow: column nowrap;
   -ms-flex-flow:column nowrap;
   align-items:center;
   background: #fff;
   border-radius: 10px;
   border: 1.41429px solid rgba(28,27,28,.2);
   box-shadow: 5.65714px 5.65714px 11.3143px rgba(28,27,28,.04);
   padding: 8px 0px;
   background-color:#fff;
   max-width: 350px;
   margin: 0 auto;
   &:hover &>div>img{
     transform:scale(1.05);
   }
   button{
   padding: .75em 2em;
   border-radius: .7em;
   color: var(--main-color);
   border: 1px solid transparent;
   transition: all .3s;
   cursor: pointer;
    color: #fff;
    background: #0d99ff;
    &:hover{
        color: #0d99ff;
        background:#fff;
    }
  @media screen and (max-width: 540px){ 
    padding: .5em 2em;    
    }
    }
  `;

const NFTCardText = styled.div`
  width: 100%;
  // padding: 0px 1rem;
  `;

const NFTCards = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  background: #e4f1fb;
  background: linear-gradient(180deg,#e4f1fb 0%, rgba(0,255,0,0) 3%);
  background: -webkit-linear-gradient(180deg,#e4f1fb 0%, rgba(0,255,0,0) 3%);
  background: -moz-linear-gradient(270deg,#e4f1fb 0%, rgba(0,255,0,0) 3%);
  padding: 20px 3rem 1rem 3rem;
  width:100%;
`;

const ImageCard = styled.div`
  height:250px;
  width: 96%;
  border-radius: 0.5rem;
  overflow:hidden;
  margin-bottom: .4rem;
  &>img{
  object-fit: cover;
  transition: all 0.3s ease-in-out;
  }
  &>img:hover{
    transform:scale(1.05);
  }
`;
const InputContainer = styled.div`
    width:80%;
    max-width: 700px;
    display: flex;
    align-items: center;
    justify-content:center;
    margin: 1rem auto 1rem auto;
    &>input{
        outline: none;
    }
    &>input:hover, &>input:focus{
      border: 1px solid #0d99ff;
      box-shadow: none;
    }
`;

const Hero = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-image: url(https://www.genadrop.com/static/media/banner-marketplace.e5c03bb6.svg);
  background-size: cover;
  background-repeat: no-repeat;
  background-positiion: center;
  width: 100%;
  padding: 2rem;
`;

const RankCard = styled.span`
  background-color: rgba(28,27,28,.06);
  border-radius: .5rem;
  color: #000;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  padding: 8px;
`;

const PriceArea = styled.div`
  display: flex;
  align-items: center;
  color: #0d99ff;
  &>*{
  margin: 0px;
  padding: 0px;
  }
  &>h6{
    font-weight: 700;
    font-size: 1.2rem;
  }
  &>span{
  font-size: 1.2rem;
  margin: 0px;
  }
`;

return (
  <>
    <Hero className="w-100">
      <PageTitle>
        View NFTs on <br />
        💧GenaDrop
      </PageTitle>
      <InputContainer>
        <input
          type="search"
          value={state.searchTerm}
          placeholder="Search NFTs"
          onChange={seachInputHandler}
        />{" "}
        <select value={chain} onChange={handleDropdownChange}>
          <option value="near">Near</option>
          <option value="aptos">Aptos</option>
          <option value="sui">Sui</option>
          <option value="stacks">Stacks</option>
        </select>
      </InputContainer>
    </Hero>
    {state.nftData.length > 0 ? (
      <NFTCards>
        {state.searchTerm === "" ? (
          state.nftData.map((nft) => (
            <a
              href={`#/mob.near/widget/MyPage?accountId=${nft.nft_state.owner}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NFTCard classNmae="card">
                <ImageCard>
                  <img
                    src={nft.media_url}
                    alt={nft.name}
                    width="100%"
                    height="100%"
                    className="rounded-3"
                  />
                </ImageCard>
                <NFTCardText>
                  <hr />
                  <div className="d-flex my-4 justify-content-between w-100 px-2">
                    <RankCard>Rank: {nft.ranking}</RankCard>
                  </div>
                  <div className="px-2">
                    <div style={{ color: "#a4a9b6" }}>Name</div>
                    <h3
                      style={{
                        fontSize: "16px",
                        margin: "0 0 10px",
                        wordBreak: "break-all",
                      }}
                    >
                      {nft.name}
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div>
                      <div style={{ color: "#a4a9b6" }}>Token ID</div>
                      <p
                        style={{
                          fontSize: "14px",
                          marginBottom: "5px",
                          color: "#0d99ff",
                        }}
                      >
                        {nft.token_id.length > 30
                          ? `${nft.token_id.slice(0, 30)}...`
                          : nft.token_id}
                      </p>
                    </div>
                    {nft.nft_state && (
                      <div>
                        <div style={{ color: "#a4a9b6" }}>Owner</div>
                        <p style={{ fontSize: "14px" }}>
                          {nft.nft_state.owner.length > 12
                            ? nft.nft_state.owner.slice(0, 12) + "..."
                            : nft.nft_state.owner}
                        </p>
                      </div>
                    )}
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div className="px-2">
                      <div style={{ color: "#a4a9b6", fontSize: "1.1rem" }}>
                        Price
                      </div>
                      {nft.listings &&
                      nft.listings[0] &&
                      typeof nft.listings[0].price === "number" ? (
                        <PriceArea>
                          <h6>{`${
                            nft.listings[0].price.toFixed(2) / state.conversion
                          }${state.chain}`}</h6>
                          <span>{` ($${(
                            (nft.listings[0].price / state.conversion) *
                            state.chainRate
                          ).toFixed(2)})`}</span>
                          <button> Buy -- put nft details page here </button>
                        </PriceArea>
                      ) : (
                        <div>Not for Sale</div>
                      )}
                    </div>
                  </div>
                </NFTCardText>
              </NFTCard>
            </a>
          ))
        ) : state.filteredNFTData.length > 0 ? (
          state.filteredNFTData.map((nft) => (
            <a
              href={`#/mob.near/widget/MyPage?accountId=${nft.nft_state.owner}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NFTCard classNmae="card">
                <ImageCard>
                  <img
                    src={nft.media_url}
                    alt={nft.name}
                    width="100%"
                    height="100%"
                    className="rounded-3"
                  />
                </ImageCard>
                <NFTCardText>
                  <hr />
                  <div className="d-flex my-4 justify-content-between w-100 px-2">
                    <RankCard>Rank: {Math.round(nft.ranking)}</RankCard>
                    <div>{nft.nft_state_lists[0].list_contract.name}</div>
                  </div>
                  <div className="px-2">
                    <div style={{ color: "#a4a9b6" }}>Name</div>
                    <h3
                      style={{
                        fontSize: "16px",
                        margin: "0 0 10px",
                        wordBreak: "break-all",
                      }}
                    >
                      {nft.name}
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div>
                      <div style={{ color: "#a4a9b6" }}>Token ID</div>
                      <p
                        style={{
                          fontSize: "14px",
                          marginBottom: "5px",
                          color: "#0d99ff",
                        }}
                      >
                        {nft.token_id.length > 30
                          ? `${nft.token_id.slice(0, 30)}...`
                          : nft.token_id}
                      </p>
                    </div>
                    {nft.nft_state && (
                      <div>
                        <div style={{ color: "#a4a9b6" }}>Owner</div>
                        <p style={{ fontSize: "14px" }}>
                          {nft.nft_state.owner.length > 12
                            ? nft.nft_state.owner.slice(0, 12) + "..."
                            : nft.nft_state.owner}
                        </p>
                      </div>
                    )}
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div className="px-2">
                      <div style={{ color: "#a4a9b6", fontSize: "1.1rem" }}>
                        Price
                      </div>
                      {nft.listings &&
                      nft.listings[0] &&
                      typeof nft.listings[0].price === "number" ? (
                        <PriceArea>
                          <h6>{`${
                            nft.listings[0].price.toFixed(2) / 100000000
                          }APT`}</h6>
                          <span>{` ($${(
                            (nft.listings[0].price / 100000000) *
                            state.chainRate
                          ).toFixed(2)})`}</span>
                        </PriceArea>
                      ) : (
                        <div>Not for Sale</div>
                      )}
                    </div>
                  </div>
                </NFTCardText>
              </NFTCard>
            </a>
          ))
        ) : (
          <div>No results found for "{state.searchTerm}".</div>
        )}
      </NFTCards>
    ) : (
      <div>No NFTs available.</div>
    )}
    <Widget src="jgodwill.near/widget/GenaDrop.Footer" />
  </>
);
