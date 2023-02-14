const CONTRACT = "nft-vote.near";
const nftContract = props.nftContract;
if (!nftContract) {
  return "No nftContract";
}
let events = Near.view(CONTRACT, "get_votes_by_contract", {
  contract_id: "nft.testnet",
  limit: 100,
  offset: 0,
});

console.log(events);

State.init({
  createdOptions: [],
  newPollNoCommitted: "",
  title: "",
  description: "",
});

const isCreateBtnDisabled = () => {
  return state.createdOptions.length <= 1 || !state.title || !state.description;
};

const createPoll = () => {
  const pollData = {
    nft_contract_id: nftContract,
    name: state.title,
    description: state.description,
    answers: state.createdOptions.map((option) => option.input),
    min_votes_to_win: 0,
    min_participations: 0,
  };
  console.log("NEAR.call: " + JSON.stringify(pollData));
  Near.call(CONTRACT, "create_vote", pollData);
};

const createdOptions = state.createdOptions.map((option, i) => {
  console.log(option);
  return (
    <div class="input-group mb-3" key={i + "_new"}>
      <input
        type="text"
        class="form-control"
        placeholder="A new poll option"
        aria-label="A new poll option"
        aria-describedby="basic-addon2"
        value={option.input}
        onChange={(e) => {
          const modifiedCreatedOptions = [...state.createdOptions];
          modifiedCreatedOptions[i] = { input: e.target.value };
          State.update({
            createdOptions: modifiedCreatedOptions,
          });
        }}
      />
      <div>
        <button
          class="btn btn-outline-secondary"
          type="button"
          style={{
            "border-top-left-radius": 0,
            "border-bottom-left-radius": 0,
          }}
          onClick={() => {
            const modifiedOptions = [...state.createdOptions];
            modifiedOptions.splice(i, 1);
            State.update({
              createdOptions: modifiedOptions,
            });
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
});

return (
  <div class="mx-2 my-3">
    <div class="card">
      <div class="card-body">
        <div>
          <p>
            <strong>"{nftContract}" NFT Poll Creator</strong>
          </p>
          <div class="form-group mb-3">
            <label for="titleFormControlInput">Title</label>
            <input
              type="text"
              class="form-control"
              id="titleFormControlInput"
              value={state.title}
              onChange={(e) => {
                State.update({ title: e.target.value });
              }}
            />
          </div>
          <div class="form-group">
            <label for="descriptionFormControlTextarea">Description</label>
            <textarea
              class="form-control"
              id="descriptionFormControlTextarea"
              rows="3"
              value={state.description}
              onChange={(e) => {
                State.update({ description: e.target.value });
              }}
            ></textarea>
          </div>
        </div>
        <hr />
        <div>{createdOptions}</div>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="A new poll option"
            aria-label="A new poll option"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              State.update({ newPollNoCommitted: e.target.value });
            }}
            value={state.newPollNoCommitted}
          />
          <div>
            <button
              class="btn btn-outline-secondary"
              type="button"
              style={{
                "border-top-left-radius": 0,
                "border-bottom-left-radius": 0,
              }}
              disabled={!state.newPollNoCommitted}
              onClick={() => {
                State.update({
                  createdOptions: [
                    ...state.createdOptions,
                    { input: state.newPollNoCommitted },
                  ],
                  newPollNoCommitted: "",
                });
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div class="card-footer text-end">
        <button
          onClick={createPoll}
          type="button"
          class="btn btn-primary"
          disabled={isCreateBtnDisabled()}
        >
          Create
        </button>
      </div>
    </div>
  </div>
);
