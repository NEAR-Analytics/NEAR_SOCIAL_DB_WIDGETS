const stats = Social.index("graph", "nft_stats", { order: "desc" });

return (
  <>
    <h3>NFT Leaderboard</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">NFT contract rating</th>
          <th scope="col">NFT token id</th>
        </tr>
      </thead>
      <tbody>
        {stats
          .map((k) => k.value.nft_stats)
          .sort((a, b) => b.rating - a.rating)
          .map(({ contract_id, token_id, rating }, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <b>{rating}</b>
              </td>
              <td>
                <a
                  href={`#mob.near/widget/NftImage?tokenId=${token_id}&contractId=${contract_id}`}
                >
                  {token_id}
                </a>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </>
);
