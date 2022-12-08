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

const following = followingData[userId]["graph"]["follow"] ?? [];

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

let handleChange = (accountId) => {
  let following = state.following;
  following[accountId] = !following[accountId];
  State.update({ following });
};

let followDevChange = () => {
  handleChange(ownerId);
  State.update({ followDev: !state.followDev });
};

let followingsBlocks = followingTop.map((accountId) => (
  <li
    className={`list-group-item ${
      state.following[accountId] ? "list-group-item-success" : ""
    }`}
  >
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={accountId}
        disabled={accountId == userId}
        id={`follow-${accountId}`}
        name={`follow-${accountId}`}
        onChange={() => handleChange(accountId)}
        checked={state.following[accountId] ?? false}
      />
      <label className="form-check-label" for={`follow-${accountId}`}>
        <Widget
          src="zavodil.near/widget/ProfileLine"
          props={{
            accountId,
            link: "",
          }}
        />{" "}
        <span
          className="badge rounded-pill bg-primary"
          title={`${followingsAll[accountId]} followers`}
        >
          {followingsAll[accountId]}
        </span>
        <a
          className="btn btn-sm btn-outline-secondary border-0"
          href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
          target="_blank"
        >
          <i className="bi bi-window-plus me-1" title="Open in new tab"></i>
        </a>
      </label>
    </div>
  </li>
));

let dataFollow = {};
Object.keys(state.following).map((accountId) => {
  if (accountId !== userId) {
    let follow = !!state.following[accountId];
    dataFollow[accountId] = follow ? "" : null;
  }
});

let dataGraph = [];
let dataNotify = [];

Object.keys(state.following).map((accountId) => {
  if (following[accountId] != state.following[accountId]) {
    let follow = !!state.following[accountId];
    dataGraph.push({
      key: "follow",
      value: {
        type: follow ? "follow" : "unfollow",
        accountId,
      },
    });

    dataNotify.push({
      key: accountId,
      value: {
        type: follow ? "follow" : "unfollow",
      },
    });
  }
});

const data = {
  graph: {
    follow: dataFollow,
  },
  index: {
    graph: JSON.stringify(dataGraph),
    notify: JSON.stringify(dataNotify),
  },
};

const selectAll = (total) => {
  let count = 0;
  followingTop.forEach((accountId) => {
    let following = state.following;
    if (!following[accountId]) {
      count += 1;
      if (count <= total) {
        following[accountId] = !following[accountId];
        State.update({ following });
      }
    }
  });
};

return (
  <>
    <h1>Mass Follow</h1>
    <p>Follow all the people you like with one click.</p>

    <div className="mb-3">
      <CommitButton
        disabled={context.loading}
        className={`btn ${
          context.loading ? "btn-outline-dark" : "btn-primary"
        }`}
        data={data}
      >
        {context.loading ? "Loading" : "Mass Follow"}
      </CommitButton>
      <button
        onClick={() => {
          selectAll(50);
        }}
      >
        Select 50
      </button>
    </div>
    <h4>Users by followers</h4>
    <ul className="list-group">{followingsBlocks}</ul>
    <div className="form-check pt-3">
      <input
        className="form-check-input"
        type="checkbox"
        id={`follow-dev`}
        onChange={() => followDevChange()}
        checked={state.followDev}
        name="follow-dev"
      />
      <label className="form-check-label" for="follow-dev">
        Follow widget author ({ownerId})
      </label>
    </div>

    <div className="mt-2 mb-3">
      <CommitButton
        disabled={context.loading}
        className={`btn ${
          context.loading ? "btn-outline-dark" : "btn-primary"
        }`}
        data={data}
      >
        {context.loading ? "Loading" : "Mass Follow"}
      </CommitButton>
    </div>
  </>
);
