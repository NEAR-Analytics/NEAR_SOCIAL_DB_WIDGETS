const side = context.accountId
  ? Social.get(`${context.accountId}/settings/every/page.side`)
  : undefined;

if (side === null) {
  return "";
}

const defaultWidgets = [
  {
    src: "hack.near/widget/Guide.Summary",
  },
  {
    src: "mob.near/widget/Applications",
  },
  {
    src: "mob.near/widget/People",
  },
];

const widgets = (side && JSON.parse(side)) ?? defaultWidgets;

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
    <div>
      <h4>Customizable:</h4>
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
            <Widget src={src} />
          </div>
        )
    )}
  </Div>
);
