return (
  <div>
    <h1>Builders</h1>
    <div className="mb-2">
      <Widget
        src="mob.near/widget/ProfileSearch"
        props={{
          boostedTag: "dev",
          placeholder: "🔍 Search Builders",
          limit: 39,
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
    <Widget
      src="gov.near/widget/BuilderProfiles"
      props={{ tag: "near", limit: 39 }}
    />
    <div className="mb-3"></div>
    <h2>Near Social Dev Tools</h2>
    <Widget
      src="mob.near/widget/WidgetIcons"
      props={{ tag: "dev", limit: 39 }}
    />
    <h3>#Template Widgets</h3>
    <Widget src="mob.near/widget/WidgetIcons" props={{ tag: "template" }} />
  </div>
);
