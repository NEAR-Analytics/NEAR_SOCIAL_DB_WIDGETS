const accountId = context.accountId;

if (!accountId) return "Please sign in with NEAR wallet";

if (!props.secretKeyBase64 || !props.onSelectedUser) {
  console.log(props.secretKeyBase64 || props.onSelectedUser);
  return "Send secretKeyBase64 and onSelectedUser() in props";
}

let allProfiles =
  Social.get(["*/profile/name", "*/profile/tags/*"], "final") || {};
// allProfiles = Object.keys(allProfilesRequest).map((accountId) => {
//   return [accountId, allProfilesRequest[accountId]?.profile?.name];
// });

const follows = Social.get(`${accountId}/graph/follow/**`);

const incomingMessages = Social.index(
  "receive_private_message",
  accountId.toLowerCase(),
  {
    subscribe: true,
  }
);

const outgoingMessages = Social.index(
  "send_private_message",
  accountId.toLowerCase(),
  {
    subscribe: true,
  }
);

if (follows === null || incomingMessages === null || outgoingMessages === null)
  return "Loading...";

const allFollowers = follows
  ? Object.keys(follows).map((f) => {
      return f;
    })
  : [];

const allMessagesCountPerAccountsObj = incomingMessages
  .map((el) => {
    return el.accountId;
  })
  .concat(allFollowers)
  .concat(
    outgoingMessages.map((el) => {
      return el.value?.receiver_account_id;
    })
  )
  .filter((el) => el)
  .reduce((acc, el) => {
    acc[el] += 1;
    return acc;
  }, {});

const allMessagesCountPerAccountsArray = Object.keys(
  allMessagesCountPerAccountsObj
).map((acc) => {
  return {
    accountId: acc,
    countMessages: allMessagesCountPerAccountsObj[acc],
  };
});

State.init({
  userList: allMessagesCountPerAccountsArray,
});

return (
  <div>
    <input
      class="mb-3 form-control"
      placeholder="🔍 Input username"
      onChange={(e) => {
        const newFollowersArray = allMessagesArray.filter(
          (el) => el.accountId.indexOf(e.target.value) !== -1
        );

        if (allProfiles[e.target.value])
          newFollowersArray.unshift({
            accountId: e.target.value,
            countMessages: 0,
          });

        State.update({
          userList: newFollowersArray,
        });
      }}
    ></input>

    {allFollowers.length === 0 && <p>You don't have any followers yet</p>}
    {state.userList.map((account, i) => {
      const followerRegisteredPublicKey = Social.get(
        `${account.accountId}/private_message/public_key`
      );

      return (
        <div
          class="mb-3 d-flex flex-row align-items-center justify-content-between"
          key={i}
        >
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{
              accountId: account.accountId,
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
            <div>
              {account.countMessages}
              <button
                onClick={() => {
                  props.onSelectedUser(follower, followerRegisteredPublicKey);
                }}
              >
                Send message
              </button>
            </div>
          )}
        </div>
      );
    })}
  </div>
);
