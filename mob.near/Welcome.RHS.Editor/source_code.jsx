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

if (state.widgets === undefined) {
  const widgets = (rhs && JSON.parse(rhs)) ?? defaultWidgets;
  State.update({ widgets });
}

const move = (fromIndex, toIndex) => {
  const widget = state.widgets.splice(fromIndex, 1)[0];
  if (toIndex !== undefined) {
    state.widgets.splice(toIndex, 0, widget);
  }
  State.update();
};

const renderMenu = (src, requireLogin, index) => {
  return (
    <div className="mb-3" key="menu">
      <div className="font-monospace mb-2">{src}</div>
      <button
        className="btn btn-primary"
        title="Move Up"
        disabled={index === 0}
        onClick={() => move(index, index - 1)}
      >
        <i className="bi bi-chevron-up" />
      </button>
      <button
        className="btn btn-primary"
        title="Move Down"
        disabled={index + 1 === state.widgets.length}
        onClick={() => move(index, index + 1)}
      >
        <i className="bi bi-chevron-down" />
      </button>
      <button
        className="btn btn-primary"
        title="Move to the Tottom"
        disabled={index === 0}
        onClick={() => move(index, 0)}
      >
        <i className="bi bi-chevron-double-up" />
      </button>
      <button
        className="btn btn-primary"
        title="Move to the Bottom"
        disabled={index + 1 === state.widgets.length}
        onClick={() => move(index, state.widgets.length - 1)}
      >
        <i className="bi bi-chevron-double-down" />
      </button>
      <button
        className="btn btn-danger ms-4"
        title="Remove"
        onClick={() => move(index, undefined)}
      >
        <i className="bi bi-trash3" /> Remove
      </button>
    </div>
  );
};

return (
  <>
    <h3>Right-Hand Side menu editor</h3>
    {state.widgets.map(({ src, requiresLogin }, i) => (
      <div key={src} className="border rounded-4 p-3 mb-3">
        {renderMenu(src, requireLogin, i)}
        <div className="text-bg-light rounded-4 p-3">
          <Widget src={src} />
        </div>
      </div>
    ))}
  </>
);
