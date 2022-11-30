//MassFollowing
const userId = context.accountId;
const ownerId = "zavodil.near";

if (!userId) {
  return "Please sign in with NEAR wallet to follow other accounts";
}

const accounts = Social.keys(`*/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (accounts === null) {
  return "Loading";
}

const followingData = Social.keys(`${userId}/graph/follow/*`, "final");
if (followingData === null) {
  return "Loading";
}

const following = followingData[userId]["graph"]["follow"];

let followDev = prop.followDev ?? true;

if (followDev) {
  following[ownerId] = true;
}

State.init({
  following,
  followDev,
});

let followingsAll = [];
Object.keys(accounts).forEach((accountId) => {
  Object.keys(accounts[accountId].graph.follow).forEach(
    (followingAccountId) => {
      followingsAll[followingAccountId] =
        (followingsAll[followingAccountId] ?? 0) + 1;
    }
  );
});

let followingTop = Object.keys(followingsAll).sort(
  (a, b) => followingsAll[b] - followingsAll[a]
);

let handleChange = (e) => {
  console.log(e);
  let following = state.following;
  following[e.target.value] = e.target.checked;
  State.update({ following });
};

let followDevChange = (e) => {
  let following = state.following;
  following[ownerId] = e.target.checked;
  State.update({ following });
};

let followingsBlocks = followingTop.map((accountId) => (
  <li className="list-group-item">
    <div class="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={accountId}
        disabled={accountId == userId}
        id={`follow-${accountId}`}
        name={`follow-${accountId}`}
        onChange={(e) => handleChange(e)}
        checked={state.following[accountId] || false}
      />
      <label className="form-check-label" for={`follow-${accountId}`}>
        <Widget
          src="zavodil.near/widget/ProfileLine"
          props={{
            accountId,
          }}
        />{" "}
        <span className="badge rounded-pill bg-primary">
          {followingsAll[accountId]}
        </span>
      </label>
    </div>
  </li>
));

let dataFollow = Object.keys(state.following).map((accountId) => {
  let follow = !!state.following[accountId];
  return { [accountId]: follow ? "" : null };
});

let dataGraph = Object.keys(state.following).map((accountId) => {
  let follow = !!state.following[accountId];
  return {
    key: "follow",
    value: {
      type: follow ? "unfollow" : "follow",
      accountId,
    },
  };
});

let dataNotify = Object.keys(state.following).map((accountId) => {
  let follow = !!state.following[accountId];
  return {
    key: accountId,
    value: {
      type: follow ? "unfollow" : "follow",
    },
  };
});

const data = {
  graph: dataFollow,
  index: {
    graph: JSON.stringify(dataGraph),
    notify: JSON.stringify(dataNotify),
  },
};

return (
  <>
    <h1>Users by followers</h1>
    <div className="mb-3">
      <CommitButton
        disabled={context.loading}
        className={`btn ${
          context.loading || follow ? "btn-outline-dark" : "btn-primary"
        }`}
        data={data}
      >
        {context.loading ? "Loading" : "Follow"}
      </CommitButton>
    </div>

    <ul className="list-group">{followingsBlocks}</ul>

    <div class="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id={`follow-dev`}
        onChange={(e) => handleChange(e)}
        checked={state.followDev}
        name="follow-dev"
      />
      <label className="form-check-label" for="follow-dev">
        Follow widget author
      </label>
    </div>
  </>
);
