const accountId = props.accountId ?? "nycdao.near";
const hashtag = props.hashtag ?? "nyc";

const content = context.accountId
  ? Social.get(`${context.accountId}/settings/every/page.nyc.main`)
  : undefined;

if (content === null) {
  return "";
}

const defaultWidgets = [
  {
    src: "nycdao.near/widget/NYC.Tabs",
    props: { hashtag, accountId },
  },
];

const widgets = (content && JSON.parse(content)) ?? defaultWidgets;

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
          authors: ["evrything.near"],
        }}
      />
      {context.accountId && (
        <a
          key="edit"
          href={"#/nycdao.near/widget/NYC.Page.Editor"}
          className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
        >
          <i class="bi bi-pencil" /> Edit Page
        </a>
      )}
    </div>
    {widgets.map(
      ({ src, requiresLogin }, i) =>
        (!requiresLogin || context.accountId) && (
          <div key={i} className="text-bg-light rounded-4 p-3 mb-3">
            <Widget src={src} props={{ hashtag, accountId }} />
          </div>
        )
    )}
  </Div>
);
