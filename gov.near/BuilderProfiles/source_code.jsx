const accountId = props.accountId;
const tag = props.tag;

const makeLink = (accountId, tag) => {
  const args = [];
  if (accountId) {
    args.push(`accountId=${accountId}`);
  }
  if (tag) {
    args.push(`tag=${tag}`);
  }
  return `#/gov.near/widget/BuilderProfiles${
    args.length > 0 ? "?" : ""
  }${args.join("&")}`;
};

const render = (content) => {
  return (
    <div className="px-2 mx-auto">
      {(accountId || tag) && (
        <div className="mb-2">
          Filter:
          {accountId && (
            <a
              href={makeLink(undefined, tag)}
              className="btn btn-outline-primary"
            >
              <Widget
                src="bozon.near/widget/Developer"
                props={{ accountId, link: false }}
              />
              <i className="bi bi-x-square"></i>
            </a>
          )}
          {tag && (
            <a
              href={makeLink(accountId, undefined)}
              className="btn btn-outline-primary"
            >
              <span className="badge text-bg-secondary">#{tag}</span>
              <i className="bi bi-x-square"></i>
            </a>
          )}
        </div>
      )}
      {content}
    </div>
  );
};

let keys = `${accountId ?? "*"}/profile/tags/*`;

if (tag) {
  const taggedProfiles = Social.keys(
    `${accountId ?? "*"}/profile/tags/${tag}`,
    "final"
  );

  if (taggedProfiles === null) {
    return render("Loading tags");
  }

  keys = Object.entries(taggedProfiles)
    .map((kv) => Object.keys(kv[1].profile).map((b) => `${kv[0]}/profile/${b}`))
    .flat();
}

const data = Social.keys(keys, "final", {
  return_type: "BlockHeight",
});

if (data === null) {
  return render("Loading profiles");
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1].profile).map((kv) => ({
        accountId,
        name: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const renderTag = (tag, tagBadge) => (
  <a href={makeLink(accountId, tag)}>{tagBadge}</a>
);

const renderItem = (a) => {
  return (
    <a
      href={`#/bozon.near/widget/Developer?accountId=${a.accountId}`}
      className="text-decoration-none"
      key={JSON.stringify(a)}
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          accountId: a.accountId,
          name: a.name,
          blockHeight: a.blockHeight,
          renderTag,
          filterLink: makeLink(a.accountId, tag),
        }}
      />
    </a>
  );
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

return render(
  <div className="d-flex flex-wrap gap-1 my-3">
    {state.allItems
      .slice(0, props.limit ? parseInt(props.limit) : 999)
      .map(renderItem)}
  </div>
);
