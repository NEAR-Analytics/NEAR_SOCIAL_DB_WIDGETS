const accountId = context?.accountId;

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

State.init({
  tokens: {},
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

return (
  <div class="d-flex flex-column gap-2">
    <div>{JSON.stringify(Object.keys(state.tokens).length)}</div>
    {data.map(({ token_id, nft_contract_id }) => {
      const key = `${token_id}::${nft_contract_id}`;
      const addedToken = !!state.tokens[key];

      return (
        <button
          class={`p-2 ${addedToken ? "bg-primary" : "bg-black"} text-white`}
          key={key}
          onClick={() => {
            if (!addedToken) {
              addToListCart(token_id, nft_contract_id);
            } else {
              removeFromCart(token_id, nft_contract_id);
            }
          }}
        >
          {token_id} | {nft_contract_id}
        </button>
      );
    })}
  </div>
);
