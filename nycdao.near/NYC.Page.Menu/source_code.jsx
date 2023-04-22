const accountId = props.accountId ?? "nycdao.near";

const menu = context.accountId
  ? Social.get(`${context.accountId}/settings/every/page.nyc.menu`)
  : undefined;

if (menu === null) {
  return "";
}

const defaultWidgets = [
  {
    src: "nycdao.near/widget/NYC.Summary",
    requiresLogin: true,
  },
  {
    src: "mob.near/widget/Profile.InlineBlock",
    requiresLogin: true,
  },
  {
    src: "nycdao.near/widget/NYC.People",
    requiresLogin: true,
  },
];

const widgets = (menu && JSON.parse(menu)) ?? defaultWidgets;

const Div = styled.div`
  position: relative;
  @media (hover: hover) {
    > .edit-link {
      display: none;
    }
  }
  &:hover {
    > .edit-link {
      display: inline;
    }
  }
`;

return (
  <Div>
    <div className="mb-3">
      <a href="#/nycdao.near/widget/NYC.Menu.Editor">🍎 🏙 🗽</a>
      {context.accountId && (
        <a
          key="edit"
          href={"#/nycdao.near/widget/NYC.Menu.Editor"}
          className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
        >
          <i class="bi bi-pencil" /> Edit Menu
        </a>
      )}
      <br />
    </div>
    {!context.accountId && (
      <div className="mb-2">
        <Widget src="nycdao.near/widget/Onboarding" />
      </div>
    )}
    {widgets.map(
      ({ src, requiresLogin }, i) =>
        (!requiresLogin || context.accountId) && (
          <div key={i} className="text-bg-light rounded-4 p-3 mb-3">
            <Widget src={src} props={accountId} />
          </div>
        )
    )}
  </Div>
);
