const profiles =
  Social.get(["*/profile/name", "*/profile/tags/*"], "final") || {};

const accounts = Object.keys(profiles);

const users = accounts
  .map((accountId) => {
    const allWidgetsHistoryChangesBlocks = Social.keys(
      `${accountId}/widget/*`,
      "final",
      {
        return_type: "History",
      }
    );

    if (Object.keys(allWidgetsHistoryChangesBlocks).length !== 0) {
      return allWidgetsHistoryChangesBlocks;
    }
  })
  .filter((x) => x);

const numOfProfiles = users.map((user) => {
  const xs = Object.keys(user).map((key) => user[key]);
  const xss = xs[0]["widget"]; //.map((x) => xs[x]);

  const accountId = Object.keys(user)[0];

  const widgets = Object.keys(xss).map((w) => ({ [w]: xss[w] }));

  return {
    accountId,
    widgets,
    numOfWidget: widgets.length,
  };
});

const rankContributors = numOfProfiles.sort(
  (a, b) => b.numOfWidget - a.numOfWidget
);

const contributors = rankContributors.map((c) => {
  const profile = Social.getr(`${c.accountId}/profile`);
  const url = `https://ipfs.near.social/ipfs/${profile?.image?.ipfs_cid}`;

  const name = profile.name;
  const description = profile.description;
  const tags = Object.keys(profile.tags ?? {});

  return {
    profile,
    url,
    name,
    description,
    tags,
    ...c,
  };
});

return (
  <div class="container">
    <h2 class="mb-4">Widget Leaderboard</h2>
    {contributors.map((contributor) => (
      <div className="d-flex flex-row pt-4 pb-4 border-bottom">
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            metadata,
            accountId: contributor.accountId,
            widgetName,
            style: { height: "6em", width: "6em", minWidth: "6em" },
            className: "me-2",
          }}
        />
        <div className="text-truncate">
          <div className="text-truncate">
            <span className="fw-bold">{contributor.name}</span>{" "}
            <small>
              <span className="font-monospace">@{contributor.accountId}</span>
            </small>
          </div>
          <div className="text-truncate text-muted">
            {contributor.tags.length > 0 && (
              <>
                {contributor.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="me-1 fw-light badge border border-secondary text-bg-light"
                  >
                    #{tag}
                  </span>
                ))}
              </>
            )}
            <div
              class="mt-2"
              style={{
                fontWeight: 600,
              }}
            >{`#${contributor.numOfWidget} of widgets`}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
