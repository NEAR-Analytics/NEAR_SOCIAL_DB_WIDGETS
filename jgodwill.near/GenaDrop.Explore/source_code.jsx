const ownerId = "minorityprogrammers.near"; // attribution
initState({
  inputCollectionSlug: "genadrop-contract.nftgen.near" || "nft.genadrop.near",
  collectionSlug: "genadrop-contract.nftgen.near" || "nft.genadrop.near",
  collectionData: {},
  searchTerm: "",
  nftData: [],
  filteredNFTData: [],
});
const fetchData = () => {
  State.update({ nftData: [] });

  let response = fetch("https://byz-multi-chain-01.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "x-api-key": "ChRbeKE.c94220449dbb45973a67a614b1f590be",
      "Content-Type": "application/json",
      "Hasura-Client-Name": "near-social",
    },
    body: JSON.stringify({
      query: `
        query MyQuery {
      near {
        collection(where: {slug: {_eq: "${state.collectionSlug}"}}) {
          slug
      cover_image
      description
      floor
      usd_volume
      volume
      title
      collection_size
      nft_metas {
        image
        name
        rarity
        ranking
        token_id
        nft_state {
          owner
          staked
          staked_owner
        }
        nft_state_lists(
          where: {listed: {_eq: true}}
          limit: 1
          order_by: {list_contract: {name: desc}}
        ) {
          list_price
          listed
          list_contract {
            name
          }
        }
      }
        }
      }
    }`,
    }),
  });

  if (response) {
    const data = response;
    const collectionData = data.body.data.near.collection[0];
    let nftData = collectionData.nft_metas;

    // Sort NFTs based on list price (lowest to highest) and list status
    nftData.sort((a, b) => {
      const aListed = a.nft_state_lists && a.nft_state_lists[0];
      const bListed = b.nft_state_lists && b.nft_state_lists[0];

      if (aListed && bListed) {
        return aListed.list_price - bListed.list_price;
      } else if (aListed) {
        return -1;
      } else if (bListed) {
        return 1;
      } else {
        return 0;
      }
    });

    console.log(collectionData, nftData);
    State.update({ collectionData, nftData });
  }
};
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

const getRarityColor = (rarity) => {
  if (rarity < 0.1) {
    return "#ee0000";
  } else if (rarity < 0.25) {
    return "#ff9900";
  } else if (rarity < 0.5) {
    return "#ffc300";
  } else {
    return "#61c700";
  }
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
  //  background-color: "#f0f0f0";
   background: #fff;
  // background: linear-gradient(180deg,#e4f1fb 0%, rgba(0,255,0,0) 180%);
  // background: -webkit-linear-gradient(180deg,#e4f1fb 0%, rgba(0,255,0,0) 180%);
  // background: -moz-linear-gradient(270deg,#e4f1fb 0%, rgba(0,255,0,0) 180%);
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
  <div className="container-fluid">
    <Hero className="w-100">
      <PageTitle>
        Find, Buy and Sell NEAR NFTs on <br />
        💧GenaDrop
      </PageTitle>
      <InputContainer>
        <input
          type="search"
          value={state.searchTerm}
          placeholder="Search NFTs"
          onChange={seachInputHandler}
        />
      </InputContainer>
    </Hero>
    {state.nftData.length > 0 ? (
      <NFTCards>
        {state.searchTerm === "" ? (
          state.nftData.map((nft) => (
            <a
              // href={`https://www.tradeport.xyz/near/collection/${state.collectionData.slug}/${nft.token_id}`}
              target="_blank"
              href={`https://social.near.page/u/${nft.nft_state.owner}`}
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NFTCard classNmae="card">
                <ImageCard>
                  <img
                    src={nft.image}
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
                        {nft.token_id}
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
                  {/*<p style={{ fontSize: "14px" }} className="px-2">
                    Collection: {nft.collection.slug}
                  </p>*/}
                  <hr />
                  <div className="px-2">
                    <div style={{ color: "#a4a9b6", fontSize: "1.1rem" }}>
                      Price
                    </div>
                    {nft.nft_state_lists && nft.nft_state_lists[0] && (
                      <PriceArea>
                        <h6>
                          {`${(
                            nft.nft_state_lists[0].list_price /
                            1000000000000000000000000
                          ).toFixed(2)}N`}
                        </h6>
                        <span>{` ($${(
                          (nft.nft_state_lists[0].list_price /
                            1000000000000000000000000) *
                          1.56
                        ).toFixed(2)})`}</span>
                      </PriceArea>
                    )}
                  </div>
                </NFTCardText>
              </NFTCard>
            </a>
          ))
        ) : state.filteredNFTData.length > 0 ? (
          state.filteredNFTData.map((nft) => (
            <a
              // href={`https://www.tradeport.xyz/near/collection/${state.collectionData.slug}/${nft.token_id}`}
              target="_blank"
              href={`https://social.near.page/u/${nft.nft_state.owner}`}
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NFTCard classNmae="card">
                <ImageCard>
                  <img
                    src={nft.image}
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
                        {nft.token_id}
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
                  {/*<p style={{ fontSize: "14px" }} className="px-2">
                    Collection: {nft.collection.slug}
                  </p>*/}
                  <hr />
                  <div className="px-2">
                    <div style={{ color: "#a4a9b6", fontSize: "1.1rem" }}>
                      Price
                    </div>
                    {nft.nft_state_lists && nft.nft_state_lists[0] && (
                      <PriceArea>
                        <h6>
                          {`${(
                            nft.nft_state_lists[0].list_price /
                            1000000000000000000000000
                          ).toFixed(2)}N`}
                        </h6>
                        <span>{` ($${(
                          (nft.nft_state_lists[0].list_price /
                            1000000000000000000000000) *
                          1.56
                        ).toFixed(2)})`}</span>
                      </PriceArea>
                    )}
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
    <h4 className="text-center mt-5">
      💧
      <a href="https://genadrop.io" target="_blank" rel="noopener noreferrer">
        GenaDrop
      </a>
      <Widget
        src="miraclx.near/widget/Attribution"
        props={{ authors: [ownerId], dep: true }}
      />
    </h4>
  </div>
);
