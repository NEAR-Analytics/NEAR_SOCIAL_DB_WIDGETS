if (!props.accountId || !props.contractId || !props.token_id || !props.rating)
  return "";

return (
  <CommitButton
    data={{
      index: {
        graph: JSON.stringify({
          key: "nft_likes",
          value: {
            nft_likes: {
              contract_id: props.contractId,
              token_id: props.token_id,
              rating: props.rating + 1,
            },
          },
        }),
        notify: JSON.stringify({
          key: props.accountId,
          value: "Congrats! 🎉 your NFT was liked",
        }),
      },
    }}
  >
    {`Like (${props.rating || 0})`}
  </CommitButton>
);
