const accountId = context.accountId;
if (context.loading) {
  return "Loading";
}
if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}
const CONTRACT = "nft-vote.near";

const nftContract = props.nftContract;
if (!nftContract) {
  return "No nftContract";
}

const getNftData = () => {
  const nftCollectionData = Near.view(nftContract, "nft_metadata");
  console.log(nftCollectionData);
  return {
    nftSymbol: nftCollectionData.symbol,
    name: nftCollectionData.name,
    iconBase64: nftCollectionData.icon.startsWith("data:image/")
      ? nftCollectionData.icon
      : undefined,
  };
};

const canUseCreator = () => {
  const usersNftData = Near.view(nftContract, "nft_tokens_for_owner", {
    account_id: accountId,
  });
  console.log(usersNftData);
  return usersNftData.length > 0;
};

const updateState = () => {
  const nftCollectionData = getNftData();
  const canUseCreator = canUseCreator();
  const asyncPolls = Near.asyncView(CONTRACT, "get_votes_by_contract", {
    contract_id: nftContract,
    limit: 1000,
    offset: 0,
  });
  asyncPolls.then((polls) => {
    console.log(polls);
    State.update({
      nftSymbol: nftCollectionData.nftSymbol,
      name: nftCollectionData.name,
      iconBase64: nftCollectionData.iconBase64,
      canUseCreator: canUseCreator,
      showPollCreator: false,
      polls: polls,
    });
  });
};

if (!state.polls) {
  const nftCollectionData = getNftData();
  State.init({
    nftSymbol: nftCollectionData.nftSymbol,
    name: nftCollectionData.name,
    iconBase64: nftCollectionData.iconBase64,
    showPollCreator: false,
    canUseCreator: canUseCreator(),
    polls: [],
  });
  updateState();
}

return (
  <div class="container my-5">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-9 d-flex">
            <div class="align-self-center">
              <div style={{ height: "100px", width: "100px" }}>
                <div
                  style={{
                    "background-image": 'url("' + state.iconBase64 + '")',
                    "background-size": "100px",
                    "background-repeat": "no-repeat",
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
              </div>
            </div>
            <div class="p-3 align-self-center">
              <div>
                Symbol: <strong>{state.nftSymbol}</strong>
              </div>
              <div>
                Name: <strong>{state.name}</strong>
              </div>
            </div>
          </div>
          <div class="col-3 text-end">
            <button
              onClick={updateState}
              type="button"
              class="btn btn-outline-secondary"
            >
              <i class="bi bi-repeat"></i>
            </button>
            <button
              onClick={() => {
                console.log("viewMode " + state.viewMode);
                State.update({ showPollCreator: !state.showPollCreator });
              }}
              type="button"
              style={{ width: "42px" }}
              class="btn btn-outline-secondary"
              disabled={!state.canUseCreator}
            >
              {state.showPollCreator ? "-" : "+"}
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        {state.showPollCreator && (
          <Widget
            src={`p516entropy.near/widget/NftPollCreator`}
            props={{
              nftContract,
            }}
          />
        )}
        {state.polls.map((poll, i) => {
          return (
            <Widget
              src={`p516entropy.near/widget/NftPollWindow`}
              props={{ nftContract, pollId: i }}
            />
          );
        })}
      </div>
    </div>
  </div>
);
