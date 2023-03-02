return (
  <div>
    <h1>🏛️ DAOs on NEAR Social</h1>
    <div className="alert alert-primary">
      Explore DAOs created with Sputnik DAO that have created a NEAR Social
      profile as an approved function call proposal
    </div>

    <hr />
    <div className="mb-2">
      <Widget
        src="onboarder.near/widget/SputnikDAOProfileSearchStringMatch"
        props={{
          limit: 20,
          onChange: ({ result }) => State.update({ profiles: result }),
        }}
      />
    </div>
    {state.profiles && state.profiles.length > 0 && (
      <div className="mb-2">
        {state.profiles.map(({ accountId }, i) => (
          <div
            key={i}
            className="d-flex justify-content-between align-items-center mb-3"
          >
            <div className="me-2 text-truncate">
              <a
                href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
                className="text-decoration-none link-dark text-truncate"
              >
                <Widget
                  src="mob.near/widget/Profile.InlineBlock"
                  props={{ accountId }}
                />
              </a>
            </div>
            <div className="d-none text-nowrap d-md-block">
              <Widget
                src="mob.near/widget/FollowButton"
                props={{ accountId }}
              />
              <Widget src="mob.near/widget/PokeButton" props={{ accountId }} />
            </div>
          </div>
        ))}
        <hr />
      </div>
    )}
    <a
      className="btn btn-outline-primary"
      href="https://near.social/#/onboarder.near/widget/FunctionCallProposal"
    >
      Create A DAO To Make a NEAR.Social Profile
    </a>
  </div>
);
