const accounts = Social.keys(`*/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
const all_account_tags = Social.getr(`*/profile/tags`, "final");
const userId = context.accountId;
const ownerId = context.ownerId;
if (!userId) {
  return "Please sign in with NEAR wallet to follow other accounts";
}
if (accounts === null) {
  return "Loading";
}

const followingData = Social.keys(`${userId}/graph/follow/*`, "final");
const my_tags = Object.keys(Social.getr(`${userId}/profile/tags`, "final"));

if (followingData === null || tagsData === null) {
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
  multiSelectMode: false,
});

let followingsPerAccount = Object.keys(accounts).reduce(
  (res, id) => ({
    ...res,
    [id]: Object.keys(accounts[id].graph.follow).filter((x) => x !== userId),
  }),
  {}
);

let tagsPerAccount = Object.keys(all_account_tags).reduce(
  (res, id) => ({
    ...res,
    [id]: Object.keys(all_account_tags[id].profile.tags),
  }),
  {}
);

const myFriends = followingsPerAccount[userId];
const friendsInCommon = (accountId) => {
  return myFriends.filter((a) => followingsPerAccount[accountId].includes(a));
};
console.log(myFriends, "myfriends");
console.log(my_tags, "mytags");
const tagsInCommon = (accountId) => {
  return my_tags;
  // filter((a) => tagsPerAccount[accountId].includes(a));
};

function getRecommendationsFor(accountId) {
  const recommendations = Object.keys(accounts)
    .filter(
      (accountId) => !myFriends.includes(accountId) && accountId !== userId
    )
    .map((accountId) => ({
      accountId,
      commonFollows: friendsInCommon(accountId).length,
      commonTags: tagsInCommon(accountId).length,
    }))
    .map(({ accountId, commonFollows }) => ({
      accountId,
      commonFollows,
      score: commonFollows,
    }))
    .sort((f, s) => s.score - f.score)
    .slice(0, 20);
  return recommendations;
}

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

const rec = getRecommendationsFor(userId);

const followingsRows = rec.map(({ accountId, commonFollows, score }) => (
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
          src="roshaan.near/widget/ProfileLine"
          props={{
            accountId,
            link: "",
            showTags: props.showTags,
          }}
        />{" "}
        <OverlayTrigger
          placement="auto"
          overlay={
            <Tooltip>
              {friendsInCommon(accountId).map((friendsInCommon) => {
                return <li className={`list-group-item`}>{friendsInCommon}</li>;
              })}
            </Tooltip>
          }
        >
          <span
            className="badge rounded-pill bg-primary"
            title={`${commonFollows} followers in common`}
          >
            {commonFollows} friends in common
          </span>
          <span
            className="badge rounded-pill bg-primary"
            title={`${commonFollows} tags in common`}
          >
            {commonTags} common tags
          </span>
        </OverlayTrigger>
        <br />
      </label>
    </div>
  </li>
));

const commitButton = (
  <CommitButton
    disabled={context.loading}
    className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
    data={getCommitData()}
  >
    {context.loading ? "Loading" : "Follow Selected"}
  </CommitButton>
);

return (
  <>
    <h1>People You May Know</h1>
    <p>
      Based on your current connections, you might also want to follow the
      following accounts.
    </p>

    <div className="mb-3">{commitButton}</div>
    <ul className="list-group">{followingsRows}</ul>

    <div className="mt-2 mb-3">{commitButton}</div>
  </>
);
