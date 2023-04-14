const accountId = props.accountId || context.accountId;
const marketId = "simple.market.mintbase1.near";
const AFFILIATE_ACCOUNT = props.affiliateAccount || "toolipse.near";

const data_sell = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "anon",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
      query MyQuery {
        mb_views_active_listings(limit: 700, order_by: {price: desc},where: {minter: {_eq: "toolipse.near"}, _and: {nft_contract_id: {_eq: "toolipse.mintbase1.near"}}}) {
            listed_by
            created_at
            price
            nft_contract_id
            token_id
            metadata_id
            title
            description
        }   
      }
`,
  }),
});
const data_show = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "anon",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
      query MyQuery {
        mb_views_nft_tokens(limit: 30, order_by: {last_transfer_timestamp: desc},where: {minter: {_eq: "toolipse.near"}, _and: {nft_contract_id: {_eq: "toolipse.mintbase1.near"}}}) {
            
            token_id
            metadata_id
            title
            description
            media
            nft_contract_id
            copies
        }   
      }
`,
  }),
});

const YoctoToNear = (amountYocto) =>
  new Big(amountYocto).div(new Big(10).pow(24)).toString();

let buy = (price, token_id, nft_contract_id) => {
  const gas = 200000000000000;
  const deposit = new Big(price).toFixed(0);

  Near.call(
    marketId,
    "buy",
    {
      nft_contract_id: nft_contract_id,
      token_id: token_id,
      referrer_id: AFFILIATE_ACCOUNT,
    },
    gas,
    deposit
  );
};

if (!data_sell.ok) {
  return "Loading";
}

if (!data_show.ok) {
  return "Loading";
}

const size_sell = "10em";
const size_show = "10em";

return data_sell !== null && data_show !== null ? (
  <>
    <h1>Artworks listed on @mintbase</h1>

    <div className="d-flex gap-4 flex-wrap">
      {data_sell.body.data?.mb_views_active_listings.map((listing, i) => {
        const priceYocto = listing.price.toLocaleString().replace(/,/g, "");
        const priceNear = YoctoToNear(priceYocto);

        return (
          <div className="d-flex flex-column gap-1">
            <a
              href={`https://mintbase.xyz/meta/${listing.metadata_id}/`}
              target="_blank"
            >
              <Widget
                src="toolipse.near/widget/NftImage_toolipse"
                props={{
                  nft: {
                    tokenId: listing.token_id,
                    contractId: listing.nft_contract_id,
                  },
                  style: {
                    width: size_sell,
                    height: size_sell,
                    objectFit: "contain",
                    minWidth: size_sell,
                    minHeight: size_sell,
                    maxWidth: size_sell,
                    maxHeight: size_sell,
                    overflowWrap: "break-word",
                  },
                  thumbnail: "",
                  className: "",
                  fallbackUrl:
                    "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
                }}
              />
            </a>
            <h6>{listing.title}</h6>
            <p> {listing.description}</p>
            <button
              disabled={!accountId}
              onClick={() => {
                if (!accountId) return;
                buy(priceYocto, listing.token_id, listing.nft_contract_id);
              }}
            >
              Buy for {priceNear} N
            </button>
          </div>
        );
      })}
    </div>
    <h1 className="align-text">Card presentation test</h1>
    <div className="row">
      {data_show.body.data?.mb_views_nft_tokens.map((tokens, i) => (
        <div
          key={tokens.token_id}
          className="card rounded-5 col-lg-3 margin-1 border-light mb-3"
        >
          <div align="center">
            <a
              href={`https://mintbase.xyz/meta/${tokens.metadata_id}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Widget
                src="toolipse.near/widget/NftImage_toolipse"
                props={{
                  nft: {
                    tokenId: tokens.token_id,
                    contractId: tokens.nft_contract_id,
                  },
                  style: {
                    width: size_show,
                    height: size_show,
                    objectFit: "contain",
                    minWidth: size_show,
                    minHeight: size_show,
                    maxWidth: size_show,
                    maxHeight: size_show,
                    overflowWrap: "break-word",
                  },
                  thumbnail: "",
                  className: "card-img-top",
                  fallbackUrl:
                    "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
                }}
              />
            </a>
          </div>
          <div class="card-body">
            <h6 class="card-title">{tokens.title}</h6>
            <p class="card-text">{tokens.description}</p>
          </div>
        </div>
      ))}
    </div>
  </>
) : (
  <p>loading...</p>
);
