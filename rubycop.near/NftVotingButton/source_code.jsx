if (!props.account_id || !props.contract_id || !props.token_id || !props.rating)
  return "";

return (
  <CommitButton
    data={{
      index: {
        graph: JSON.stringify({
          key: "nft_likes",
          value: {
            nft_likes: {
              contract_id: props.contract_id,
              token_id: props.token_id,
              rating: parseInt(props.rating) + 1,
            },
          },
        }),
        notify: JSON.stringify({
          key: props.account_id,
          value: "❤️ your NFT was liked",
        }),
      },
    }}
  >
    {`❤️ ${props.rating || 0}`}
  </CommitButton>
);
