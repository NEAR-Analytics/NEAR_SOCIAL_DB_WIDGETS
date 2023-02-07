const accountId = context?.accountId;
const marketAddress = "simple.market.mintbase1.near";

const LISTING_DEPOSIT_IN_NEAR_PER_TOKEN = 10000000000000000000000;
const size = "5em";

State.init({
  tokens: {},
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

const numTokensSelected = Object.keys(state.tokens).length;

const YoctoToNear = (amountYocto) =>
  new Big(amountYocto).div(new Big(10).pow(24)).toString();

const listMarket = () => {
  const gas = 200000000000000;

  const storageDeposit = new Big(
    LISTING_DEPOSIT_IN_NEAR_PER_TOKEN * numTokensSelected
  ).toFixed(0);

  const approvals = Object.values(state.tokens).map((token) => {
    console.log(token);
    return {
      methodName: "nft_approve",
      contractAddress: token.nftContractId,
      gas: gas,
      args: {
        token_id: token.tokenId,
        account_id: marketAddress,
        msg: JSON.stringify({
          price: 1,
        }),
      },
      deposit: 1,
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

return (
  <div class="d-flex flex-column gap-2">
    <button
      onClick={() => {
        listMarket();
      }}
    >
      List {numTokensSelected} tokens for 1N
    </button>
    {data.map(({ token_id, nft_contract_id }) => {
      const key = `${token_id}::${nft_contract_id}`;
      const addedToken = !!state.tokens[key];

      return (
        <button
          class={`p-2 ${
            addedToken ? "bg-primary" : "bg-black"
          } text-white d-flex gap-2 rounded`}
          key={key}
          onClick={() => {
            if (!addedToken) {
              addToListCart(token_id, nft_contract_id);
            } else {
              removeFromCart(token_id, nft_contract_id);
            }
          }}
        >
          <Widget
            src="mob.near/widget/NftImage"
            props={{
              nft: {
                tokenId: token_id,
                contractId: nft_contract_id,
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
          <div>
            <p>{token_id}</p>
            <p>{nft_contract_id}</p>
          </div>
        </button>
      );
    })}
  </div>
);
