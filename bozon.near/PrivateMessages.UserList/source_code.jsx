const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const secretKey = props.secretKey;

if (!secretKey || !props.onSelectedUser) {
  return "Send secretKey and onSelectedUser() in props";
}

const follows = Social.get(`${accountId}/graph/follow/**`);

const allFollowers = follows
  ? Object.keys(follows).map((f) => {
      return f;
    })
  : [];

State.init({
  userList: allFollowers,
});

return (
  <div>
    <h1 class="mb-3 text-center">Private Messages</h1>

    <input
      class="mb-3 form-control"
      placeholder="Input username"
      onChange={(e) => {
        const newFollowersArray = allFollowers.filter(
          (accountId) => accountId.indexOf(e.target.value) !== -1
        );
        const a = Social.get(`${e.target.value}/**`);

        if (a) newFollowersArray.unshift(e.target.value);

        State.update({
          userList: newFollowersArray,
        });
      }}
    ></input>

    {allFollowers.length === 0 && <p>You don't have any followers yet</p>}
    {state.userList.map((follower, i) => {
      const followerRegisteredPublicKey = Social.get(
        `${follower}/private_messages/*`
      );

      return (
        <div
          class="mb-3 d-flex flex-row align-items-center justify-content-between"
          key={i}
        >
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{
              accountId: follower,
            }}
          />

          {!followerRegisteredPublicKey ? (
            <span
              style={{ lineHeight: "1.5rem" }}
              className="badge text-bg-secondary"
            >
              User not registered
            </span>
          ) : (
            <button
              onClick={() => {
                props.onSelectedUser(follower);
              }}
            >
              Send message
            </button>
          )}
        </div>
      );
    })}
  </div>
);
