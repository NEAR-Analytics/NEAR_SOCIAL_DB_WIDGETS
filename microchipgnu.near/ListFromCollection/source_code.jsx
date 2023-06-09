const accountId = context?.accountId;
const marketAddress = "simple.market.mintbase1.near";

const LISTING_DEPOSIT_IN_NEAR_PER_TOKEN = 10000000000000000000000;
const size = "3em";

State.init({
  tokens: {},
  price: 0,
});

const _data = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
        query MyQuery ($accountId: String){
            mb_views_nft_owned_tokens(limit: 100, where: {listing_kind: {_is_null: true}, owner: {_eq: $accountId}}) {
                token_id
                nft_contract_id
            }
        }
`,
    variables: {
      accountId: accountId,
    },
  }),
});

const data = _data.body.data.mb_views_nft_owned_tokens;

const addToListCart = (token_id, nft_contract_id) => {
  const key = `${token_id}::${nft_contract_id}`;

  const _tokens = {
    ...state.tokens,
    [key]: {
      tokenId: token_id,
      nftContractId: nft_contract_id,
    },
  };

  State.update({
    tokens: _tokens,
  });
};

const removeFromCart = (token_id, nft_contract_id) => {
  const key = `${token_id}::${nft_contract_id}`;

  delete state.tokens[key];

  State.update({
    tokens: state.tokens,
  });
};

const clear = () => {
  State.update({
    tokens: {},
    price: 0,
  });
};

const numTokensSelected = Object.keys(state.tokens).length;

const YoctoToNear = (amountYocto) =>
  new Big(amountYocto).div(new Big(10).pow(24)).toString();

const listMarket = () => {
  const gas = 200000000000000;

  const storageDeposit = new Big(
    LISTING_DEPOSIT_IN_NEAR_PER_TOKEN * numTokensSelected
  ).toFixed(0);

  const _price = Number(
    Number(new Big(state.price).mul(new Big(10).pow(24)).toString())
  )
    .toLocaleString()
    .replace(/,/g, "");

  const approvals = Object.values(state.tokens).map((token) => {
    return {
      methodName: "nft_approve",
      contractName: token.nftContractId,
      gas: gas,
      args: {
        token_id: token.tokenId,
        account_id: marketAddress,
        msg: JSON.stringify({
          price: _price,
        }),
      },
      deposit: 800000000000000000000,
    };
  });

  Near.call([
    {
      contractName: marketAddress,
      methodName: "deposit_storage",
      args: {},
      gas: gas,
      deposit: storageDeposit,
    },
    ...approvals,
  ]);
};

if (!accountId) return <div>Sign in first</div>;

return (
  <div class="d-flex flex-column gap-4">
    <div>
      <h4>Mass-listing tool for NFTs</h4>
      <p>Use this tool to mass-list tokens to the Mintbase Market.</p>
    </div>

    <div>
      <div class="d-flex gap-1 justify-content-center">
        <p class="text-black">Selected</p>
        <p class="text-black">
          <span class="fw-bold">{numTokensSelected}</span> tokens
        </p>
        <p class="text-black">for</p>
        <p class="text-black">
          <span class="fw-bold">{state.price}</span>N
        </p>
      </div>

      <div class="d-flex gap-1 flex-wrap justify-content-center">
        {Object.values(state.tokens).map((token) => {
          return (
            <Widget
              src="mob.near/widget/NftImage"
              props={{
                nft: {
                  tokenId: token.tokenId,
                  contractId: token.nftContractId,
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
          );
        })}
      </div>
    </div>
    <div class="w-100 d-flex gap-1">
      <div
        class="d-flex gap-2 flex-column"
        style={{
          width: "50%",
        }}
      >
        <label>Price (in NEAR)</label>
        <input type="text" value={state.price}></input>
        <div class="d-flex flex-row-reverse gap-2 ">
          <button
            onClick={() => {
              listMarket();
            }}
          >
            List
          </button>
          {numTokensSelected > 0 && (
            <div
              class="p-1 bg-white rounded"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                clear();
              }}
            >
              Clear
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        <Widget
          src="microchipgnu.near/widget/NFT.Selector"
          props={{
            compressImages: true,
            onChange: ({ contractId, tokenId }) => {
              addToListCart(tokenId, contractId);
            },
          }}
        />
      </div>
    </div>

    <Widget src="mintbase.near/widget/BuiltWithMintbase" />
  </div>
);
