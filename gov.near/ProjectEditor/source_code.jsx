const accountId = context.accountId;

if (!accountId) {
  return "Please log in with NEAR wallet to edit your project page";
}

let project = Social.getr(`${accountId}/project`);

if (project === null) {
  return "Loading";
}

State.init({
  project,
});

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>Edit Project</h4>
      </div>
      <div className="mb-2">
        <Widget
          src="gov.near/widget/MetadataEditor"
          props={{
            initialMetadata: project,
            onChange: (project) => State.update({ project }),
            options: {
              name: { label: "Name" },
              featuredWidget: { label: "Featured Widget" },
              image: { label: "Project image" },
              backgroundImage: { label: "Background image" },
              description: { label: "About" },
              tags: {
                label: "Tags",
                tagsPattern: "*/project/tags/*",
                placeholder: "near, dev, art, edu, nft, defi, gov, dao",
              },
              linktree: {
                links: [
                  {
                    label: "Twitter",
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
        <CommitButton data={{ project: state.project }}>
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
          props={{ accountId, project: state.project }}
        />
      </div>
    </div>
  </div>
);
