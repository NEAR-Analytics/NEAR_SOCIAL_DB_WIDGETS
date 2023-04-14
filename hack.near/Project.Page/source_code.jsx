const owner = props.owner ?? context.accountId;
if (!owner) {
  return "No account ID";
}

const page = props.page ?? Social.getr(`${owner}/page`);

if (page === null) {
  return "Loading";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="hack.near/widget/Page.Summary"
        props={{
          owner,
          page,
          link: true,
          showEditButton: !props.page,
        }}
      />

      <div className="mt-3">
        <Widget src="hack.near/widget/Page.Tabs" props={{ owner, page }} />
      </div>
    </div>
  </div>
);
