const accounts = Social.keys(`*/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
const userId = context.accountId;
const ownerId = context.ownerId;
if (!userId) {
  return "Please sign in with NEAR wallet to follow other accounts";
}
if (accounts === null) {
  return "Loading";
}
const followingData = Social.keys(`${userId}/graph/follow/*`, "final");
if (followingData === null) {
  return "Loading";
}
const following = followingData[userId]["graph"]["follow"] ?? {};

function getFollowersPerAccount() {
  let res = {};
  Object.keys(accounts).forEach((accountId) => {
    Object.keys(accounts[accountId].graph.follow).forEach(
      (followingAccountId) => {
        res[followingAccountId] = (res[followingAccountId] ?? 0) + 1;
      }
    );
  });
  return res;
}

const followingsAll = getFollowersPerAccount();

State.init({
  following,
});

function getRecommendationsFor(accountId) {
  let followingsPerAccount = Object.keys(accounts).reduce(
    (res, id) => ({
      ...res,
      [id]: Object.keys(accounts[id].graph.follow).filter((x) => x !== userId),
    }),
    {}
  );
  const myFriends = followingsPerAccount[accountId];
  const recommendations = Object.keys(accounts)
    .filter(
      (accountId) => !myFriends.includes(accountId) && accountId !== userId
    )
    .map((accountId) => ({
      accountId,
      commonFollows: myFriends.filter((a) =>
        followingsPerAccount[accountId].includes(a)
      ).length,
    }))
    .map(({ accountId, commonFollows }) => ({
      accountId,
      commonFollows,
      score: commonFollows * (followingsAll[accountId] || 1),
    }))
    .sort((f, s) => s.score - f.score)
    .slice(0, 20);
  return recommendations.map((x) => x.accountId);
}
const rec = getRecommendationsFor(userId);

let handleChange = (accountId) => {
  let following = state.following;
  following[accountId] = !following[accountId];
  State.update({ following });
};

let followDevChange = () => {
  handleChange(ownerId);
  State.update({ followDev: !state.followDev });
};

function getCommitData() {
  let dataGraph = [];
  let dataNotify = [];
  let dataFollow = {};

  Object.keys(state.following).map((accountId) => {
    if (accountId !== userId) {
      let follow = !!state.following[accountId];
      dataFollow[accountId] = follow ? "" : null;
    }
  });

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
  return data;
}

const followingsRows = rec.map((accountId) => (
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

return (
  <>
    <h1>People You May Know</h1>
    <p>
      Based on your current connections, you might also want to follow the
      following accounts.
    </p>

    <div className="mb-3">
      <CommitButton
        disabled={context.loading}
        className={`btn ${
          context.loading ? "btn-outline-dark" : "btn-primary"
        }`}
        data={getCommitData()}
      >
        {context.loading ? "Loading" : "Mass Follow"}
      </CommitButton>
    </div>
    <ul className="list-group">{followingsRows}</ul>
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
        Follow widget authors ({ownerId})
      </label>
    </div>

    <div className="mt-2 mb-3">
      <CommitButton
        disabled={context.loading}
        className={`btn ${
          context.loading ? "btn-outline-dark" : "btn-primary"
        }`}
        data={getCommitData()}
      >
        {context.loading ? "Loading" : "Mass Follow"}
      </CommitButton>
    </div>
  </>
);
