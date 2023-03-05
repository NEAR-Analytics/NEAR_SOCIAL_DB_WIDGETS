const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

let profile = Social.getr(`${sender}/profile`);

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
        <h4>Edit profile of @{sender}</h4>
      </div>
      <div className="mb-2">
        <Widget
          src="mob.near/widget/MetadataEditor"
          props={{
            initialMetadata: profile,
            onChange: (profile) => State.update({ profile }),
            options: {
              name: { label: "Name" },
              image: { label: "Profile picture" },
              backgroundImage: { label: "Background image" },
              description: { label: "About" },
              tags: {
                label: "Tags",
                tagsPattern: "*/profile/tags/*",
                placeholder: "bos",
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
        <CommitButton data={{ profile: state.profile }}>
          Save Profile
        </CommitButton>
        <a
          className="btn btn-outline-primary ms-2"
          href={`#/mob.near/widget/ProfilePage?sender=${sender}`}
        >
          View Profile
        </a>
      </div>
    </div>
    <div className="col-lg-6">
      <div>
        <Widget
          src="hack.near/widget/ProfilePage"
          props={{ sender, profile: state.profile }}
        />
      </div>
    </div>
  </div>
);
