const ownerId = "gov.near";
const accountId = props.accountId ?? context.accountId;
const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (!accountId) {
  return "No account ID";
}

if (profile === null) {
  return "Loading";
}

const showEditButton =
  profile !== undefined &&
  (!props.profile || props.showEditButton) &&
  accountId &&
  accountId === context.accountId;

const name = "NEAR Global";
const tags = Object.keys(profile.tags ?? {});

return (
  <div>
    <Widget src="mob.near/widget/ProfileOnboarding" props={{ accountId }} />
    <h2>
      <b>NEAR Global:</b> Uniting the Open Web
    </h2>
    <p>
      We build generative community programs to activate contributors in order
      to solve problems for members of the NEAR ecosystem. Join to discover
      professional development opportunities that involve sharing knowledge and
      best practices with ecosystem leaders and industry experts around the
      world.
    </p>
    <div className="mb-3">
      <Widget src="gov.near/widget/Profile" props={{ ownerId }} />
    </div>
    <div className="mb-3">
      <h4>HOW TO JOIN:</h4>
      <p>1. Engage with us on Near Social:</p>
      <Widget src="gov.near/widget/JoinButton" props={{ ownerId }} />
    </div>
    <div className="mb-3">
      <p>
        2. Propose adding members to the{" "}
        <a href="https://app.astrodao.com/dao/global.sputnik-dao.near">
          NEAR Global DAO
        </a>
      </p>
      <Widget src="gov.near/widget/NewMember" props={{ ownerId }} />
    </div>
    <h2>Connect and Collaborate</h2>
    <div className="mb-2">
      <Widget
        src="mob.near/widget/ProfileSearch"
        props={{
          boostedTag: "near",
          placeholder: "🔍 Search Profiles",
          limit: 39,
          onChange: ({ result }) => State.update({ profiles: result }),
        }}
      />
    </div>
    {state.profiles && state.profiles.length > 0 && (
      <div className="mb-2">
        {state.profiles.map(({ accountId }, i) => (
          <div
            key={i}
            className="d-flex justify-content-between align-items-center mb-3"
          >
            <div className="me-2 text-truncate">
              <a
                href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
                className="text-decoration-none link-dark text-truncate"
              >
                <Widget src="gov.near/widget/Profile" props={{ ownerId }} />
              </a>
            </div>
            <div className="d-none text-nowrap d-md-block">
              <Widget
                src="mob.near/widget/FollowButton"
                props={{ accountId }}
              />
              <Widget src="mob.near/widget/PokeButton" props={{ accountId }} />
            </div>
          </div>
        ))}
        <hr />
      </div>
    )}
    <Widget
      src="gov.near/widget/BuilderProfiles"
      props={{ tag: "near", limit: 24 }}
    />
    <div>
      <Widget src="gov.near/widget/Membership" props={{ ownerId }} />
    </div>
    <div className="mb-3"></div>
    <h2>Level Up Your Profile</h2>
    <div className="mb-3">
      <Widget src="mob.near/widget/Profile" props={{ accountId }} />
    </div>
    <div className="mb-3">
      <Widget src="gov.near/widget/PublicTagEditor" props={{ accountId }} />
    </div>
    <div className="mb-3"></div>
    <div>
      <Widget src="gov.near/widget/ProfileTagsEditor" props={{ accountId }} />
    </div>
  </div>
);
