const minimumConnections = props.minimumConnections ?? 29;

const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

const groups = policy.roles
  .filter((role) => role.name === "community")
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const isMember = groups.map((group) => {
  return !group
    ? false
    : group.filter((address) => address === accountId).length > 0;
})?.[0];

const allAccounts = Social.keys(`*/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const mutualFollowersCount = {};

for (const account of Object.keys(allAccounts)) {
  const followers = allAccounts[account]?.graph?.follow;

  if (followers) {
    for (const follower of Object.keys(followers)) {
      if (allAccounts[follower]?.graph?.follow?.[account]) {
        mutualFollowersCount[account] =
          (mutualFollowersCount[account] || 0) + 1;
      }
    }
  }
}

const rankedAccounts = Object.entries(mutualFollowersCount);

rankedAccounts.sort((a, b) => b[1] - a[1]);

const filteredAccounts = rankedAccounts.filter(
  ([_, count]) => count > minimumConnections
);

const Wrapper = styled.div`
  .join-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
    color: ${props.primary ? "#006ADC" : "#11181C"} !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      display: inline-block;
      transform: rotate(90deg);
      color: #7E868C;
    }
  }
`;

const FollowButtonWrapper = styled.div`
  width: 100%;
  padding: 2px;
  display: flex;
  justify-content: space-between;

  div,
  button {
    flex-grow: 1;
    padding: 8px;
    margin: 4px;
  }

  @media (max-width: 1200px) {
    width: auto;
    div,
    button {
      width: auto;
    }
  }
`;

return (
  <Wrapper>
    <div className="d-flex border-bottom justify-content-between">
      <div className="p-1">
        <h2>Everyone</h2>
        <h5>
          <i>minimumConnections = {minimumConnections} </i>
        </h5>
        <p>
          <i>{filteredAccounts.length} qualified accounts</i>
        </p>
      </div>
      <div className="p-1 m-3">
        <div>
          <Widget
            src="mob.near/widget/Profile"
            props={{ accountId: "build.sputnik-dao.near" }}
          />
          <FollowButtonWrapper>
            <div>
              <Widget
                src="near/widget/FollowButton"
                props={{
                  accountId: "build.sputnik-dao.near",
                }}
              />
            </div>
            {!isMember && (
              <div>
                <Widget
                  src="hack.near/widget/DAO.Join"
                  props={{
                    daoId: "build.sputnik-dao.near",
                    role: "community",
                  }}
                />
              </div>
            )}
          </FollowButtonWrapper>
        </div>
      </div>
    </div>
    {filteredAccounts.map(([accountId, count], i) => (
      <div key={i} className="d-flex border-bottom justify-content-between">
        <div className="d-flex align-items-center">
          <div className="p-3">
            <h5>{i + 1}</h5>
          </div>
          <div className="p-2">
            <Widget src="mob.near/widget/Profile" props={{ accountId }} />
          </div>
        </div>
        <div className="p-1 m-3">
          <p>{count} mutual followers</p>
          <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
        </div>
      </div>
    ))}
  </Wrapper>
);
