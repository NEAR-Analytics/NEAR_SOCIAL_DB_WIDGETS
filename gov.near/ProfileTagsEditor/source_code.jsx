const accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet.";
}

let profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

State.init({
  profile,
});

return (
  <>
    <div className="row">
      <h3>Your Profile</h3>
      <Widget src="gov.near/widget/Profile" />
    </div>
    <div className="row">
      <h5>Edit Your Profile Tags</h5>
      <Widget
        src="gov.near/widget/MetadataEditor"
        props={{
          initialMetadata: profile,
          onChange: (profile) => State.update({ profile }),
          options: {
            tags: {
              label: "Tags",
              tagsPattern: "*/profile/tags/*",
              placeholder: "founder, builder, explorer",
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
        href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
      >
        View Profile
      </a>
    </div>
  </>
);
