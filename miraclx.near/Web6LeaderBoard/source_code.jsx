let index = state.index ?? Storage.get("index");
if (index !== null) {
  index = index || [];

  const lastBlockHeight = index[0].blockHeight || 0;

  const newIndex = Social.index("web6", "web6-idx", {
    order: "asc",
    from: lastBlockHeight + 1,
    subscribe: true,
  });

  if (newIndex !== null && newIndex.length > 0) {
    index = [...newIndex.reverse(), ...index];
    Storage.set("index", index);
  }

  console.log(index);

  if ((state.index.length || 0) < (index.length || 0)) {
    State.update({
      index,
    });
  }
}

if (moos) {
  moos.forEach(({ accountId, value }) => {
    const key = JSON.stringify({ accountId, value });
    if (key in uniqueMoos) {
      return;
    }
    counter[accountId] = (counter[accountId] || 0) + 1;
    uniqueMoos[key] = true;
  });
}

function timelineView() {
  return <>Timeline</>;
}

function leaderboardView() {
  return <>Leaderboard</>;
}

return (
  <>
    <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link text-dark active"
          id="timeline-tab"
          data-bs-toggle="tab"
          data-bs-target="#timeline"
          type="button"
          role="tab"
          aria-controls="timeline"
          aria-selected={state.view == "timeline"}
          onClick={() => (state.view = "timeline")}
        >
          Timeline
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link text-dark"
          id="leaderboard-tab"
          data-bs-toggle="tab"
          data-bs-target="#leaderboard"
          type="button"
          role="tab"
          aria-controls="leaderboard"
          aria-selected={state.view == "leaderboard"}
          onClick={() => (state.view = "leaderboard")}
        >
          Leaderboard
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="timeline"
        role="tabpanel"
        aria-labelledby="timeline-tab"
      >
        {timelineView()}
      </div>
      <div
        class="tab-pane fade"
        id="leaderboard"
        role="tabpanel"
        aria-labelledby="leaderboard-tab"
      >
        {leaderboardView()}
      </div>
    </div>
  </>
);
