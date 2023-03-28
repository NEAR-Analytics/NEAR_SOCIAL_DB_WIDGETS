const accountId = props.accountId || context.accountId;
const marketId = "simple.market.mintbase1.near";
const AFFILIATE_ACCOUNT = props.affiliateAccount || "jass.near";

const data = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
      query MyQuery {
        mb_views_active_listings(limit: 100, order_by: {created_at: desc}, where: {market_id: {_eq: "simple.market.mintbase1.near"}, , nft_contract_id: {_eq: "daorecords.mintbase1.near"}}) {
            listed_by
            created_at
            price
            nft_contract_id
            token_id
            metadata_id
            reference_blob(path: "animation_url")
        }
      }
`,
  }),
});

// const data = fetch("https://graph.mintbase.xyz", {
//   method: "POST",
//   headers: {
//     "mb-api-key": "omni-site",
//     "Content-Type": "application/json",
//     "x-hasura-role": "anonymous",
//   },
//   body: JSON.stringify({
//     query: `
//       query MyQuery {
//         mb_views_nft_tokens(
//           limit: 10
//           distinct_on: metadata_id
//           where: {nft_contract_id: {_eq: "daorecords.mintbase1.near"}, reference_blob: {_has_key: "animation_url"}}
//           ) {
//             nft_contract_id
//             token_id
//             metadata_id
//             reference_blob(path: "animation_url")
//           }
//         }
//         `,
//   }),
// });

// const YoctoToNear = (amountYocto) =>
//   new Big(amountYocto).div(new Big(10).pow(24)).toString();

// let buy = (price, token_id, nft_contract_id) => {
//   const gas = 200000000000000;
//   const deposit = new Big(price).toFixed(0);

//   Near.call(
//     marketId,
//     "buy",
//     {
//       nft_contract_id: nft_contract_id,
//       token_id: token_id,
//       referrer_id: AFFILIATE_ACCOUNT,
//     },
//     gas,
//     deposit
//   );
// };

if (!data.ok) {
  return "Loading";
}

const size = "10em";
let audioElem = new Audio();
function playAudio() {
  audioElem.play();
}

function pauseAudio() {
  audioElem.pause();
}

return data !== null ? (
  <>
    <h1>Muti Marketplace</h1>
    <p>Buying from this widget will redirect 1.25% of the sale to Jaswinder.</p>
    <div className="d-flex gap-4 flex-wrap">
      {data.body.data?.mb_views_active_listings.map((listing, i) => {
        //const priceYocto = listing.price.toLocaleString().replace(/,/g, "");
        //const priceNear = YoctoToNear(priceYocto);
        audioElem.src = listing.reference_blob;

        return audioElem.src !== "https://near.social/null" ? (
          <div className="d-flex flex-column gap-1">
            <a
              href={`https://mintbase.xyz/meta/${listing.metadata_id}/`}
              target="_blank"
            >
              <Widget
                src="mob.near/widget/NftImage"
                props={{
                  nft: {
                    tokenId: listing.token_id,
                    contractId: listing.nft_contract_id,
                  },
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
                  thumbnail: "thumbnail",
                  className: "",
                  fallbackUrl:
                    "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
                }}
              />
            </a>
            {audioElem.src}
            <button onClick={playAudio}>Play</button>
            <button onClick={pauseAudio}>Pause</button>
          </div>
        ) : (
          <p>Audio not there</p>
        );
      })}
    </div>
  </>
) : (
  <p>loading...</p>
);
