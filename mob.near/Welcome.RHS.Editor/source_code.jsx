const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to edit your homepage";
}

const rhs = context.accountId
  ? Social.get(`${context.accountId}/settings/near.social/homepage.rhs`)
  : undefined;

if (rhs === null) {
  return "";
}

const defaultWidgets = [
  {
    src: "mob.near/widget/Welcome.GetInvolved",
  },
  {
    src: "mob.near/widget/Welcome.Notifications",
    requiresLogin: true,
  },
  {
    src: "mob.near/widget/Applications",
  },
  {
    src: "mob.near/widget/People",
  },
  {
    src: "mob.near/widget/Welcome.FollowFeed",
  },
  {
    src: "mob.near/widget/Welcome.PokeFeed",
  },
];

const widgets = (rhs && JSON.parse(rhs)) ?? defaultWidgets;

const renderMenu = (src, requireLogin, index) => {
  return (
    <div className="mb-3">
      <div className="font-monospace">{src}</div>
      <button
        className="btn btn-outline-dark"
        title="Move Up"
        disabled={index === 0}
      >
        <i className="bi bi-caret-up-fill" />
      </button>
      <button
        className="btn btn-outline-dark"
        title="Move Down"
        disabled={index + 1 === widgets.length}
      >
        <i className="bi bi-caret-up-fill" />
      </button>
    </div>
  );
};

return (
  <>
    <h3>Right-Hand Side menu editor</h3>
    {widgets.map(({ src, requiresLogin }, i) => (
      <div key={i} className="border rounded-4 p-3 mb-3">
        {renderMenu(src, requireLogin, i)}
        <div className="text-bg-light rounded-4 p-3">
          <Widget src={src} />
        </div>
      </div>
    ))}
  </>
);
