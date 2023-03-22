const query = `
  query v2_omnisite_GetActivityByUser(
    $contractAddress: String!
    $limit: Int!
  ) {
    activities: mb_views_nft_activities(
      order_by: { timestamp: desc }
      limit: $limit
      where: {action_sender: { _eq: $contractAddress }}
    ) {
      kind
      description
      media
      title
      timestamp
      nft_contract_id
      action_sender
      receipt_id
      action_receiver
      token_id
      price
      nft_contract {
        name
        id
        base_uri
      }
    }
    totalItems: mb_views_nft_activities_aggregate(
      where: { action_sender: { _eq: $contractAddress }}
    ) {
      aggregate {
        count
      }
    }
  }
`;
State.init({
  contractAddress: null,
  res: null,
});

function fetchService() {
  asyncFetch("https://graph.mintbase.xyz/", {
    method: "POST",
    body: JSON.stringify({
      query: query,
      variables: { contractAddress: state.contractAddress, limit: 50 },
    }),
    headers: {
      "content-type": "application/json",
      "mb-api-key": "omni-site",
    },
  }).then((res) => {
    State.update({ res: res.body.data });
  });
}

function handleClick() {
  fetchService();
}

const Pill = styled.div`
  text-transform:uppercase;
  color:#ccc;
  padding:5px;
  height:25px;
  border-radius:5px;
    justify-items:center;
  align-items:center;
`;

const Table = styled.div`
  background: #1E2030;
  display:flex;
  flex-wrap:wrap;
  border-bottom:1px solid #333;
  padding:10px;
    color:#ccc;
`;

const Col = styled.div`
  width: ${(props) => (props.width ? props.width : "30%")};
  margin-right:10px;
  justify-items:center;
  align-items:center;
`;

return (
  <div class="flex flex-col items-center justify-center mt-2">
    <div class="text-3xl">Check User NFT Activity</div>
    <div class="d-flex flex-column align-items-center">
      <input
        class="form-control"
        id="activitycontract"
        type="text"
        placeholder="Type near username"
        onChange={(val) => {
          State.update({ contractAddress: val.target.value });
        }}
      />
      <div>
        <button
          onClick={handleClick}
          class="btn btn-outline-secondary border mt-4"
          type="button"
        >
          Check Activity
        </button>
      </div>
    </div>
    {state.res.activities ? (
      <>
        <br />
        <Table>
          {" "}
          <Col width="80px"> Kind </Col> <Col> Image </Col>
          <Col> Link to MB Nft </Col>
        </Table>
        {state.res.activities.map((act) => {
          const media = act.media.includes("https://arweave.net")
            ? act.media
            : `https://image-cache-service-z3w7d7dnea-ew.a.run.app/media?url=https://arweave.net/${act.media}`;

          const contractLink = `https://www.mintbase.xyz/contract/${act.nft_contract_id}/token/${act.token_id}`;

          return (
            <Table>
              <Col width="80px">
                {" "}
                <Pill>
                  {" "}
                  {act.kind === "make_offer" ? "OFFER" : act.kind}{" "}
                </Pill>{" "}
              </Col>
              <Col>
                <img src={media} width="50" />{" "}
              </Col>
              <Col>
                <p>
                  <a href={contractLink}>{act.title} </a>{" "}
                </p>{" "}
              </Col>
            </Table>
          );
        })}
      </>
    ) : null}

    <div>
      {" "}
      Powered by:{" "}
      <img src="https://www.mintbase.xyz/mintbase1.svg" width="70" />{" "}
    </div>
  </div>
);
