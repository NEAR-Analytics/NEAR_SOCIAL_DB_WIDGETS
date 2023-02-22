const CONTRACT = "nft-vote.near";
const accountId = context.accountId;
if (context.loading) {
  return "Loading";
}
if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}
const pollId = props.pollId;
if (pollId == null) {
  return "No pollId";
}
const nftContract = props.nftContract;
if (!nftContract) {
  return "No nftContract";
}

const getPollDetatils = (myNft, poll) => {
  console.log("poll", poll);
  const getPollOptionVotes = (votes) => {
    return Object.values(votes).reduce((acc, curr) => {
      acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
      return acc;
    }, {});
  };

  const myVotes = myNft.reduce((acc, curr) => {
    if (curr in poll.votes) {
      acc[curr] = poll.votes[curr];
    }
    return acc;
  }, {});

  const pollOptionVotes = getPollOptionVotes(poll.votes);
  const myPollOptionVotes = getPollOptionVotes(myVotes);

  console.log("pollOptionVotes", pollOptionVotes);
  console.log("myPollOptionVotes", myPollOptionVotes);
  const votedTotal = Object.values(pollOptionVotes).reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const myVotedTotal = Object.values(myPollOptionVotes).reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  console.log("votedTotal", votedTotal);

  const topic = poll.name;
  const description = poll.description;
  const availableToVote = myNft.length - myVotedTotal;

  const options = poll.answers.map((answer, i) => {
    return {
      id: i + "_id",
      label: answer,
      progress: Math.round((pollOptionVotes[i] / votedTotal) * 100) || 0,
      votedTotal: pollOptionVotes[i] || 0,
      voted: myPollOptionVotes[i],
    };
  });
  const myNftVoted = Object.keys(myVotes);
  return {
    options: options,
    availableToVote: availableToVote,
    description: description,
    topic: topic,
    votedTotal: votedTotal,
    myNftVoted: myNftVoted,
    ownerId: poll.owner_id,
    pollStatus: poll.status,
  };
};

const updateState = () => {
  const myNftAsync = Near.asyncView(nftContract, "nft_tokens_for_owner", {
    account_id: accountId,
  }).then((userNftsData) => {
    return userNftsData.map((userNftData) => {
      return userNftData.token_id;
    });
  });

  const asyncPolls = Near.asyncView(CONTRACT, "get_votes_by_contract", {
    contract_id: nftContract,
    limit: 1000,
    offset: 0,
  });

  myNftAsync.then((myNft) => {
    console.log("myNft", myNft);
    asyncPolls.then((polls) => {
      console.log("polls", polls);
      const currentState = getPollDetatils(myNft, polls[pollId]);
      State.update({
        options: currentState.options,
        availableToVote: currentState.availableToVote,
        description: currentState.description,
        myNftVoted: currentState.myNftVoted,
        votedTotal: currentState.votedTotal,
        ownerId: currentState.ownerId,
        pollStatus: currentState.pollStatus,
        topic: currentState.topic,
      });
    });
  });
};

if (!state.options) {
  State.init({
    viewMode: true,
    options: [],
    availableToVote: 0,
    description: "",
    myNftVoted: [],
    topic: "",
  });
  updateState();
}

const vote = (answerId) => {
  const myNftVoted = state.myNftVoted;
  const myNftNotVoted = myNft.filter((myNft) => !myNftVoted.includes(myNft));
  const pollData = {
    contract_id: nftContract,
    index: pollId,
    answer: answerId,
    nft_token_id: myNftNotVoted[0],
  };
  console.log("NEAR.call: vote " + JSON.stringify(pollData));
  Near.call(CONTRACT, "vote", pollData, 70 * Math.pow(10, 12));
  console.log("NEAR.call: vote finished");
};

const closePoll = () => {
  const pollData = {
    contract_id: nftContract,
    index: pollId,
  };
  console.log("NEAR.call: close_vote " + JSON.stringify(pollData));
  Near.call(CONTRACT, "close_vote", pollData);
  console.log("NEAR.call: close_vote finished");
};

const displayOptionsToView = state.options.map((option) => {
  return (
    <OverlayTrigger
      key={option.id + "view"}
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip id="button-tooltip">
          Voted {option.votedTotal} out of {state.votedTotal}
        </Tooltip>
      }
    >
      <div
        class="row"
        style={{
          "min-height": "50px",
        }}
      >
        <div class="col-2">
          <strong>{option.progress}%</strong>
        </div>

        <div
          class="col-10"
          style={{
            "padding-left": "0",
          }}
        >
          {option.label}
          {option.voted > 0 && (
            <strong style={{ color: "mediumseagreen" }}>+{option.voted}</strong>
          )}
        </div>
        <div class="w-100 d-none d-md-block"></div>

        <div class="col-2 text-center">
          <i
            class="bi bi-check-circle-fill"
            style={{
              visibility: option.voted ? "visible" : "hidden",
              color: "mediumseagreen",
            }}
          ></i>
        </div>

        <div
          class="col-10 align-self-center"
          style={{
            "padding-left": "0",
          }}
        >
          <div
            class="progress"
            style={{
              height: "6px",
            }}
          >
            <div
              class="progress-bar"
              role="progressbar"
              style={{
                width: option.progress + "%",
                "background-color": option.voted ? "mediumseagreen" : undefined,
              }}
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
            ></div>
          </div>
        </div>
      </div>
    </OverlayTrigger>
  );
});

const displayOptionsToVote = state.options.map((option, i) => {
  return (
    <div class="mb-2 d-flex" key={option.id + "edit"}>
      <button
        type="button"
        class="btn btn-outline-secondary"
        onClick={() => {
          vote(i);
          console.log("pressed " + option.id);
        }}
      >
        +
      </button>
      <div class="align-self-center" style={{ "padding-left": "10px" }}>
        {option.label}
      </div>
      {option.voted > 0 && (
        <strong
          class="align-self-center"
          style={{ "padding-left": "10px", color: "mediumseagreen" }}
        >
          +{option.voted}
        </strong>
      )}
    </div>
  );
});

return (
  <div class="mx-2 my-3">
    <div class="card">
      <div class="card-body">
        <div>
          <p>
            <strong>{state.topic}</strong>
            {state.pollStatus === 1 && <strong>(CLOSED)</strong>}
          </p>
          <Markdown text={state.description}></Markdown>
        </div>
        <hr />
        {state.viewMode ? (
          <div>{displayOptionsToView}</div>
        ) : (
          <div>{displayOptionsToVote}</div>
        )}
      </div>
      <div class="card-footer text-end">
        {state.ownerId === accountId && state.pollStatus === 0 && (
          <button type="button" onClick={closePoll} class="btn btn-danger">
            Close
          </button>
        )}
        <button onClick={updateState} type="button" class="btn btn-primary">
          <i class="bi bi-repeat"></i>
        </button>
        {state.viewMode ? (
          <button
            onClick={() => {
              console.log("viewMode " + state.viewMode);
              State.update({
                viewMode: !state.viewMode,
              });
            }}
            type="button"
            class="btn btn-primary"
            disabled={state.availableToVote < 1 || state.pollStatus === 1}
          >
            Vote mode ({state.availableToVote} votes left)
          </button>
        ) : (
          <button
            onClick={() => {
              console.log("viewMode " + state.viewMode);
              State.update({
                viewMode: !state.viewMode,
              });
            }}
            type="button"
            class="btn btn-primary"
          >
            View mode ({state.availableToVote} votes left)
          </button>
        )}
      </div>
    </div>
  </div>
);
