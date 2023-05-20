const accountId = props.accountId || context.accountId;
const onChange = props.onChange;
const compressImages = props.compressImages || false; // TODO: default to false
const size = "100%";

if (!accountId) {
  return <></>;
}

State.init({
  tokens: [],
  totalTokens: 0,
  limit: 50,
  offset: 0,
});

const fetchData = (offset) => {
  asyncFetch("https://graph.mintbase.xyz", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: JSON.stringify({
      query: `
        query v2_omnisite_GetOwnedTokens($accountId: String, $limit: Int = 50, $offset: Int = 0) {
          tokens: mb_views_nft_owned_tokens(where: {owner: {_eq: $accountId}}, limit: $limit, offset: $offset) {
            tokenId: token_id
            contractId: nft_contract_id
            media
          }
          totalOwnedTokens: mb_views_nft_owned_tokens_aggregate(where: {owner: {_eq: $accountId}}) {
            aggregate {
              count
            }
          }
        }
  `,
      variables: {
        accountId: accountId,
        limit: state.limit,
        offset: offset,
      },
    }),
  }).then((res) => {
    state.tokens = [...state.tokens, ...res?.body?.data?.tokens] || [];
    state.totalTokens = res?.body?.data?.totalOwnedTokens?.aggregate?.count;
    state.offset = offset;

    State.update();
  });
};

if (state.tokens.length === 0) {
  fetchData(0);

  return <>Loading...</>;
}

return (
  <div
    style={{
      height: "300px",
      overflow: "auto",
    }}
  >
    <InfiniteScroll
      className="d-flex flex-wrap gap-2 justify-content-center"
      pageStart={0}
      initialLoad={false}
      hasMore={state.tokens.length < state.totalTokens}
      loadMore={() => {
        fetchData(state.offset + state.limit);
      }}
      useWindow={false}
    >
      {state.tokens.map((nft, index) => (
        <div
          key={`${nft.contractId}-${nft.tokenId}-${index}`}
          role="button"
          style={{ width: "15%", aspectRatio: "1/1" }}
          onClick={() => {
            onChange({
              contractId: nft.contractId,
              tokenId: nft.tokenId,
            });
          }}
        >
          <Widget
            src="mob.near/widget/NftImage"
            props={{
              nft: { tokenId: nft.tokenId, contractId: nft.contractId },
              style: {
                width: size,
                height: size,
                objectFit: "cover",
                minWidth: size,
                minHeight: size,
                maxWidth: size,
                maxHeight: size,
                overflowWrap: "break-word",
              },
              thumbnail: compressImages ? "thumbnail" : "",
              className: "",
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
              alt: `NFT ${nft.contractId} ${nft.tokenId}`,
            }}
          />
        </div>
      ))}
    </InfiniteScroll>
  </div>
);
