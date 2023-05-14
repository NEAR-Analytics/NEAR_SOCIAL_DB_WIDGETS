const accountId = props.accountId ?? "build.sputnik-dao.near";
const hashtags = [
  { name: "dev", required: true },
  { name: "bos", required: true },
];

const content = context.accountId
  ? Social.get(`${context.accountId}/settings/dev/content`)
  : undefined;

if (content === null) {
  return "";
}

const defaultWidgets = [
  {
    src: "hack.near/widget/dev.Page.Header",
    props: { hashtags, accountId },
  },
  {
    src: "efiz.near/widget/Community.Posts",
    props: {
      communityHashtags: hashtags,
      exclusive: false,
      allowPublicPosting: true,
    },
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
          authors: [accountId],
        }}
      />
      {context.accountId && (
        <a
          key="edit"
          href={"#/hack.near/widget/dev.Page.Editor"}
          className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
        >
          <i class="bi bi-pencil" /> Edit Content
        </a>
      )}
    </div>
    {widgets.map(
      ({ src, requiresLogin }, i) =>
        (!requiresLogin || context.accountId) && (
          <div key={i} className="text rounded-4 p-3 mb-3">
            <Widget src={src} props={props} />
          </div>
        )
    )}
  </Div>
);
