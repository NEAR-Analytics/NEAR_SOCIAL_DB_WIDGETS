return (
  <div>
    <h4>People</h4>
    <div className="mb-2">
      <Widget
        src="mob.near/widget/ProfileSearch"
        props={{
          limit: 10,
          onChange: ({ result }) => State.update({ profiles: result }),
        }}
      />
    </div>
    {state.profiles && state.profiles.length > 0 && (
      <div className="mb-2">
        {state.profiles.map((profile, i) => (
          <div key={i} className="d-flex justify-content-between mb-3">
            <div className="me-4 text-truncate">
              <Widget
                src="mob.near/widget/Profile.InlineBlock"
                props={{ accountId: profile.accountId }}
              />
            </div>
            <div className="text-nowrap">
              <Widget
                src="mob.near/widget/FollowButton"
                props={{ accountId: profile.accountId }}
              />
              <Widget
                src="mob.near/widget/PokeButton"
                props={{ accountId: profile.accountId }}
              />
            </div>
          </div>
        ))}
        <hr />
      </div>
    )}

    <Widget src="mob.near/widget/LastProfilesImages" />
  </div>
);
