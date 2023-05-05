const daoId = props.daoId;

return (
  <div>
    <h1>🌐 Cybernetic Organizations</h1>

    <div className="mb-2">
      <Widget
        src="onboarder.near/widget/SputnikDAOProfileSearchStringMatch"
        props={{
          limit: 20,
          onChange: ({ result }) => State.update({ profiles: result }),
        }}
      />
    </div>
    <br />

    <a
      className="btn btn-outline-primary"
      href="/#/hack.near/widget/DAO.Profile.Editor"
    >
      Submit Proposal to <b>Create a Profile</b> for a Decentralized Autonomous
      Organization
    </a>
    <br />

    <hr />

    {state.profiles && state.profiles.length > 0 && (
      <div className="mb-2">
        {state.profiles.map(({ accountId }, i) => (
          <div
            key={i}
            className="d-flex justify-content-between align-items-center mb-3"
          >
            <div className="me-2 text-truncate">
              <a
                href={`#/hack.near/widget/DAO.Profile?accountId=${accountId}`}
                className="text-decoration-none link-dark text-truncate"
              >
                <Widget
                  src="mob.near/widget/Profile.InlineBlock"
                  props={{ accountId }}
                />
              </a>
            </div>
            <div className="d-none text-nowrap d-md-block">
              <div className="m-1">
                <Widget
                  src="mob.near/widget/FollowButton"
                  props={{ accountId }}
                />
              </div>
              <div className="m-1">
                <Widget
                  src="hack.near/widget/DAO.JoinButton"
                  props={{ daoId: accountId }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
