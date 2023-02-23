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

const defaultNoImageUrl =
  "https://nftstorage.link/ipfs/bafkreiatvd6pqssvlwywe62siqcmz7ngixbvocpzp3clzdnzb352sal7km";

const getNftData = () => {
  const nftCollectionDataAsync = Near.asyncView(nftContract, "nft_metadata");
  return nftCollectionDataAsync.then((nftCollectionData) => {
    console.log(nftCollectionData);
    return {
      nftSymbol: nftCollectionData.symbol,
      name: nftCollectionData.name,
      iconBase64:
        nftCollectionData.icon &&
        nftCollectionData.icon.startsWith("data:image/")
          ? nftCollectionData.icon
          : defaultNoImageUrl,
    };
  });
};

const canUseCreator = () => {
  const usersNftDataAsync = Near.asyncView(
    nftContract,
    "nft_tokens_for_owner",
    {
      account_id: accountId,
    }
  );
  return usersNftDataAsync.then((usersNftData) => {
    console.log(usersNftData);

    return (usersNftData.length = 0);
  });
};

const updateState = () => {
  getNftData().then((data) => {
    State.update({
      nftSymbol: data.nftSymbol,
      name: data.name,
      iconBase64: data.iconBase64,
    });
  });
  canUseCreator().then((canUseCreator) => {
    State.update({
      canUseCreator: canUseCreator,
    });
  });
  const asyncPolls = Near.asyncView(CONTRACT, "get_votes_by_contract", {
    contract_id: nftContract,
    limit: 1000,
    offset: 0,
  });
  asyncPolls.then((polls) => {
    console.log(polls);
    State.update({
      showPollCreator: false,
      polls: polls,
    });
  });
};

if (!state.polls) {
  State.init({
    nftSymbol: "",
    name: "",
    iconBase64: "",
    showPollCreator: false,
    canUseCreator: false,
    polls: [],
  });
  updateState();
}

return (
  <div
    class="card"
    style={{
      "max-width": "600px",
    }}
  >
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
                  "border-radius": "5px",
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
      {!state.showPollCreator && state.polls.length === 0 && (
        <div>The collection currently has no polls created</div>
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
);
