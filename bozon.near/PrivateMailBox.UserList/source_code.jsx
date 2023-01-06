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
      return {
        accountId: f,
      };
    })
  : [];

const allMessagesCountPerAccountsObj = incomingMessages
  .map((el) => {
    return el.accountId;
  })
  .concat(allFollowers)
  .concat(
    outgoingMessages.map((el) => {
      return {
        accountId: el.value?.receiver_account_id,
        blockHeight: el.blockHeight,
      };
    })
  )
  .filter((el) => el?.accountId)
  .reduce((acc, el) => {
    acc[el.accountId] = {
      // countMessages:
      //   acc[el.accountId].countMessages !== undefined
      //     ? acc[el.accountId].countMessages + 1
      //     : 0,
      lastMessageBlockHeight:
        el.blockHeight > (acc[el.accountId].lastMessageBlockHeight || 0)
          ? el.blockHeight
          : acc[el.accountId].lastMessageBlockHeight,
    };
    return acc;
  }, {});

const allAccountsArray = Object.keys(allMessagesCountPerAccountsObj)
  .map((acc) => {
    return {
      accountId: acc,
      // countMessages: allMessagesCountPerAccountsObj[acc].countMessages,
      lastMessageBlockHeight:
        allMessagesCountPerAccountsObj[acc].lastMessageBlockHeight,
    };
  })
  .sort(
    (a, b) => b.lastMessageBlockHeight || 0 - a.lastMessageBlockHeight || 0
  );

State.init({
  userList: allAccountsArray,
});

return (
  <div>
    <input
      class="mb-3 form-control"
      placeholder="🔍 Input username"
      onChange={(e) => {
        const newAllAccountsArray = allAccountsArray.filter(
          (el) => el.accountId.indexOf(e.target.value) !== -1
        );

        if (allProfiles[e.target.value])
          newAllAccountsArray.unshift({
            accountId: e.target.value,
            //countMessages: 0,
          });

        State.update({
          userList: newAllAccountsArray,
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
              {account.lastMessageBlockHeight && (
                <Widget
                  src={`mob.near/widget/TimeAgo`}
                  props={{ blockHeight: account.lastMessageBlockHeight }}
                />
              )}
              <button
                onClick={() => {
                  props.onSelectedUser(
                    account.accountId,
                    followerRegisteredPublicKey
                  );
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
