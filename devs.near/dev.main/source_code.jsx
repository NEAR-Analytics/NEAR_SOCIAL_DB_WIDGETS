const hashtag = props.hashtag ?? "dev";

const main = context.accountId
  ? Social.get(`${context.accountId}/settings/dev/main`)
  : undefined;

if (main === null) {
  return "";
}

const defaultWidgets = [
  {
    src: "devs.near/widget/dev.menu",
  },
  {
    src: "devs.near/widget/dev.profile",
  },
  {
    src: "devs.near/widget/dev.feed",
  },
];

const widgets = (main && JSON.parse(main)) ?? defaultWidgets;

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
      <Widget
        src="miraclx.near/widget/Attribution"
        props={{
          dep: true,
          authors: ["build.sputnik-dao.near"],
        }}
      />
      {context.accountId && (
        <a
          key="edit"
          href={"#/devs.near/widget/dev.main.config"}
          className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
        >
          <i class="bi bi-pencil-square" /> Edit Page
        </a>
      )}
    </div>
    <div>
      {widgets.map(
        ({ src, requiresLogin }, i) =>
          (!requiresLogin || context.accountId) && (
            <div key={i} className="text-bg-light rounded-4 p-3 mb-3">
              <Widget src={src} />
            </div>
          )
      )}
    </div>
  </Div>
);
