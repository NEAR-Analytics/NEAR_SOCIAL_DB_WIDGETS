const accountId = context.accountId;

if (!accountId) {
  return "Please log in with NEAR wallet to edit your project page";
}

let profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

State.init({
  profile,
});

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>Edit Project Page</h4>
      </div>
      <div className="mb-2">
        <Widget
          src="gov.near/widget/MetadataEditor"
          props={{
            initialMetadata: profile,
            onChange: (profile) => State.update({ profile }),
            options: {
              name: { label: "Project Name" },
              image: { label: "Project Image" },
              backgroundImage: { label: "Background Image" },
              description: { label: "Project Description" },
              tags: {
                label: "Project Tags",
                tagsPattern: "*/project/tags/*",
                placeholder: "near, dev, art, edu, nft, defi, gov, dao",
              },
              linktree: {
                links: [
                  {
                    label: "Project Twitter",
                    prefix: "https://twitter.com/",
                    name: "twitter",
                  },
                  {
                    label: "Github",
                    prefix: "https://github.com/",
                    name: "github",
                  },
                  {
                    label: "Telegram",
                    prefix: "https://t.me/",
                    name: "telegram",
                  },
                  {
                    label: "Website",
                    prefix: "https://",
                    name: "website",
                  },
                ],
              },
            },
          }}
        />
      </div>
      <div className="mb-2">
        <CommitButton data={{ profile: state.profile }}>
          Save project
        </CommitButton>
        <a
          className="btn btn-outline-primary ms-2"
          href={`#/gov.near/widget/ProjectPage?accountId=${accountId}`}
        >
          View project
        </a>
      </div>
    </div>
    <div className="col-lg-6">
      <div>
        <Widget
          src="gov.near/widget/ProjectPage"
          props={{ accountId, profile: state.profile }}
        />
      </div>
    </div>
  </div>
);
