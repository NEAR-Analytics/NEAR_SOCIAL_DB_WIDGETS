const accountId = props.accountId;
const userId = context.accountId;

if (!accountId || !userId) return "";

const accounts = Social.keys(`*/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

let followingsPerAccount = Object.keys(accounts).reduce(
  (res, id) => ({
    ...res,
    [id]: Object.keys(accounts[id].graph.follow).filter((x) => x !== accountId),
  }),
  {}
);

const myFriends = followingsPerAccount[userId] || [];

const findFriendsInCommon = (accountId) => {
  return myFriends.filter((a) => followingsPerAccount[accountId].includes(a));
};

const friendsInCommon = findFriendsInCommon(accountId);

if (friendsInCommon.length == 0) return "";

return (
  <OverlayTrigger
    placement="auto"
    overlay={
      <Tooltip>
        <span> You both follow </span>
        <br />
        <br />
        {friendsInCommon.map((friendsInCommon) => {
          return <li className={`list-group-item`}>{friendsInCommon}</li>;
        })}
      </Tooltip>
    }
  >
    <span
      className="badge rounded-pill bg-primary"
      title={`${friendsInCommon.length} followers in common`}
    >
      {friendsInCommon.length} friends in common
    </span>
  </OverlayTrigger>
);
