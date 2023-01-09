let stats = Social.index("graph", "nft_likes", { order: "desc" });
stats = stats.map((k) => k.value.nft_likes).sort((b, a) => b.rating - a.rating);
stats = [...new Map(stats.map((item) => [item.token_id, item])).values()];

return (
  <>
    <h3>NFT Leaderboard</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Action</th>
          <th scope="col">Preview</th>
          <th scope="col">NFT token id</th>
        </tr>
      </thead>
      <tbody>
        {stats
          .sort((a, b) => b.rating - a.rating)
          .map(({ account_id, contract_id, token_id, rating }, i) => (
            <tr className="align-middle" key={i}>
              <td>{i + 1}</td>
              <td className="text-center">
                <Widget
                  src="rubycop.near/widget/NftVotingButton"
                  props={{
                    account_id,
                    contract_id,
                    token_id,
                    rating,
                  }}
                />
              </td>
              <td>
                <Widget
                  key={i}
                  src={"mob.near/widget/NftImage"}
                  props={{
                    tokenId: token_id,
                    contractId: contract_id,
                    style: {
                      width: "5em",
                      height: "5em",
                      objectFit: "cover",
                      minWidth: "5em",
                      minHeight: "5em",
                      maxWidth: "5em",
                      maxHeight: "5em",
                      overflowWrap: "break-word",
                    },
                    className: "img-thumbnail",
                  }}
                />
              </td>
              <td>
                <a
                  href={`#mob.near/widget/NftImage?tokenId=${token_id}&contractId=${contract_id}`}
                >
                  {contract_id}:{token_id}
                </a>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </>
);
