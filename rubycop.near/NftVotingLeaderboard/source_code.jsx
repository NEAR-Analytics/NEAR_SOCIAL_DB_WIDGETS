let stats = Social.index("graph", "nft_likes", { order: "desc" });
stats = stats.map((k) => k.value.nft_likes).sort((b, a) => b.rating - a.rating);
stats = [...new Map(stats.map((item) => [item.token_id, item])).values()];

return (
  <>
    <h3>NFT Leaderboard</h3>
    <div class="row row-cols-1 row-cols-md-4 g-4">
      {stats
        .sort((a, b) => b.rating - a.rating)
        .map(({ account_id, contract_id, token_id, rating }, i) => (
          <div class="col">
            <div class="card h-100">
              <Widget
                key={i}
                src={"mob.near/widget/NftImage"}
                props={{
                  tokenId: token_id,
                  contractId: contract_id,
                  style: {
                    height: "15em",
                    objectFit: "cover",
                    maxHeight: "15em",
                    overflowWrap: "break-word",
                  },
                  className: "card-img-top",
                }}
              />

              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  <a
                    href={`#mob.near/widget/NftImage?tokenId=${token_id}&contractId=${contract_id}`}
                  >
                    {contract_id}:{token_id}
                  </a>
                </p>
                <Widget
                  src="rubycop.near/widget/NftVotingButton"
                  props={{
                    account_id,
                    contract_id,
                    token_id,
                    rating,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  </>
);
