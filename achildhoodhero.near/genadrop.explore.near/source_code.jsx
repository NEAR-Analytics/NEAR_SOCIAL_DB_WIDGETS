initState({
  inputCollectionSlug: "genadrop-contract.nftgen.near",
  collectionSlug: "genadrop-contract.nftgen.near",
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
  font-size: 5vw; 
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
   background: #e4f1fb;
  background: linear-gradient(180deg,#e4f1fb 0%, rgba(0,255,0,0) 80%);
  background: -webkit-linear-gradient(180deg,#e4f1fb 0%, rgba(0,255,0,0) 80%);
  background: -moz-linear-gradient(270deg,#e4f1fb 0%, rgba(0,255,0,0) 80%);
   border-radius: 10px;
   border: 1.41429px solid rgba(28,27,28,.1);
   box-shadow: 5.65714px 5.65714px 11.3143px rgba(28,27,28,.04);
   padding: 8px;
   text-align: center;
   background-color:#fff;
   max-width: 350px;
   margin: 0 auto;
   &:hover &>div>img{
     transform:scale(1.05);
   }
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
  width: 100%;
  border-radius: 0.5rem;
  overflow:hidden;
  margin-bottom: 1rem;
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

return (
  <>
    <Hero className="w-100">
      <PageTitle>💧 GenaDrop NEAR NFTs</PageTitle>
      <InputContainer>
        <input
          type="search"
          value={state.searchTerm}
          placeholder="Search NFTs"
          onChange={seachInputHandler}
        />
      </InputContainer>
    </Hero>
    {/*{state.collectionData && (
      <Main>
        <Stats>
          <div>
            <p>USD Volume:</p>
            <p>{Math.round(state.collectionData.usd_volume)}</p>
          </div>
          <div>
            <p>Volume:</p>
            <p>
              {Math.round(
                state.collectionData.volume / 1000000000000000000000000
              )}{" "}
              N
            </p>
          </div>
          <div>
            <p>Collection Size:</p>
            <p>{state.collectionData.collection_size}</p>
          </div>
        </Stats>
      </Main>
    )}*/}
    {state.nftData.length > 0 && (
      <NFTCards>
        {state.searchTerm === ""
          ? state.nftData.map((nft) => (
              <a
                href={`https://www.tradeport.xyz/near/collection/${state.collectionData.slug}/${nft.token_id}`}
                target="_blank"
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
                  <h3
                    style={{
                      fontSize: "18px",
                      margin: "0 0 10px",
                      wordBreak: "break-all",
                    }}
                  >
                    {nft.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#3f51b5",
                        borderRadius: "20px",
                        color: "#fff",
                        display: "inline-block",
                        fontSize: "12px",
                        fontWeight: "bold",
                        padding: "3px 8px",
                      }}
                    >
                      Rank: {Math.round(nft.ranking)}
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                    Token ID: {nft.token_id}
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    Collection: {nft.collection.slug}
                  </p>
                  {nft.nft_state_lists && nft.nft_state_lists[0] && (
                    <p style={{ fontSize: "14px" }}>
                      Price:{" "}
                      {nft.nft_state_lists[0].list_price /
                        1000000000000000000000000}
                      {"N "}
                      {nft.nft_state_lists[0].list_contract.name}
                    </p>
                  )}
                  {nft.nft_state && (
                    <p style={{ fontSize: "14px" }}>
                      Owner:
                      {nft.nft_state.owner.length > 20
                        ? nft.nft_state.owner.slice(0, 20) + "..."
                        : nft.nft_state.owner}
                    </p>
                  )}
                </NFTCard>
              </a>
            ))
          : state.filteredNFTData.map((nft) => (
              <a
                href={`https://www.tradeport.xyz/near/collection/${state.collectionData.slug}/${nft.token_id}`}
                target="_blank"
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
                  <h3
                    style={{
                      fontSize: "18px",
                      margin: "0 0 10px",
                      wordBreak: "break-all",
                    }}
                  >
                    {nft.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#3f51b5",
                        borderRadius: "20px",
                        color: "#fff",
                        display: "inline-block",
                        fontSize: "12px",
                        fontWeight: "bold",
                        padding: "3px 8px",
                      }}
                    >
                      Rank: {Math.round(nft.ranking)}
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                    Token ID: {nft.token_id}
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    Collection: {nft.collection.slug}
                  </p>
                  {nft.nft_state_lists && nft.nft_state_lists[0] && (
                    <p style={{ fontSize: "14px" }}>
                      Price:{" "}
                      {nft.nft_state_lists[0].list_price /
                        1000000000000000000000000}
                      {"N "}
                      {nft.nft_state_lists[0].list_contract.name}
                    </p>
                  )}
                  {nft.nft_state && (
                    <p style={{ fontSize: "14px" }}>
                      Owner:
                      {nft.nft_state.owner.length > 20
                        ? nft.nft_state.owner.slice(0, 20) + "..."
                        : nft.nft_state.owner}
                    </p>
                  )}
                </NFTCard>
              </a>
            ))}
      </NFTCards>
    )}
  </>
);
