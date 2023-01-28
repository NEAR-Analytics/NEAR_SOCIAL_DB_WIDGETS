const profiles = Social.get("*/profile/name", "final");

return (
  <div>
    {Object.entries(profiles || {})
      .slice(0, 10)
      .map(([accountId, data], i) => (
        <div key={i}>
          <Widget
            src="mob.near/widget/Profile.InlineBlock"
            props={{ accountId }}
          />
        </div>
      ))}
  </div>
);
