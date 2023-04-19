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
  },
  {
    src: "mob.near/widget/Profile.InlineBlock",
  },
  {
    src: "nycdao.near/widget/NYC.People",
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
      <a href="#/hack.near/widget/Page.Menu.Editor">🍎 🏙 🗽</a>
      {context.accountId && (
        <a
          key="edit"
          href={"#/hack.near/widget/Page.Menu.Editor"}
          className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
        >
          <i class="bi bi-pencil" /> Edit Menu
        </a>
      )}
      <br />
    </div>
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
