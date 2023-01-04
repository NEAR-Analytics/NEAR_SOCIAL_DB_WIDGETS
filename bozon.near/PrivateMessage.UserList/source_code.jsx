const accountId = context.accountId;

if (!accountId) return "Please sign in with NEAR wallet";

if (!props.secretKeyBase64 || !props.onSelectedUser) {
  console.log(props.secretKeyBase64 || props.onSelectedUser);
  return "Send secretKeyBase64 and onSelectedUser() in props";
}

let allProfiles =
  Social.get(["*/profile/name", "*/private_message/public_key/*"]) || {};
// allProfiles = Object.keys(allProfilesRequest).map((accountId) => {
//   return [accountId, allProfilesRequest[accountId]?.profile?.name];
// });

const follows = Social.get(`${accountId}/graph/follow/**`);

if (follows === null) return "Loading...";

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
    <input
      class="mb-3 form-control"
      placeholder="🔍 Input username"
      onChange={(e) => {
        const newFollowersArray = allFollowers.filter(
          (accountId) => accountId.indexOf(e.target.value) !== -1
        );

        if (allProfiles[e.target.value])
          newFollowersArray.unshift(e.target.value);

        State.update({
          userList: newFollowersArray,
        });
      }}
    ></input>

    {allFollowers.length === 0 && <p>You don't have any followers yet</p>}
    {state.userList.map((follower, i) => {
      const followerRegisteredPublicKey = Social.get(
        `${follower}/private_message/public_key`
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
                props.onSelectedUser(follower, followerRegisteredPublicKey);
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
