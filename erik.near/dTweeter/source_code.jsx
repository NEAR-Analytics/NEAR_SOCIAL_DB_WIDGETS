// dTweeter, a derivative of QuickSocial
let accountId = context.accountId;
let targetId = props.accountId ?? accountId;

if (context.loading) {
  return "Loading";
}

// Get all the users who actually post statuses
let allUsersBlock = (
  <div className="mt-3 mb-5">
    <a
      className="btn btn-outline-primary"
      href="/#/zavodil.near/widget/QuickSocialUsers"
    >
      All Users
    </a>
  </div>
);

// Generic sign-in
if (!props.accountId && !accountId) {
  return (
    <div>
      <div>Please sign in with NEAR wallet to use QuickSocial</div>
      {allUsersBlock}
    </div>
  );
}

let followed = []; // what is this?
let following = Social.keys(`${targetId}/graph/follow/*`, "final", {
  values_only: true,
});

if (!following) {
  return "Loading";
}

if (typeof following === "object" && Object.keys(following).length) {
  followed = Object.keys(following[targetId]["graph"]["follow"]);
}

// Just grabbing the single status memo, rather than any ongoing posts.
const targetStatus = Social.get(`${targetId}/memo`, "final");

// TODO: create a simple graph with an ongoing series of posts.  See idea picker for examples.
// ***
// ***

if (targetStatus === null) {
  return "Loading";
}

const allStatuses = [];

// TODO: Fix this so it's not the status widget but rather a microblog widget.
let currentAccountBlock = (
  <>
    <h1>dTweeter</h1>
    <div className="me-4 mb-4">
      <Widget src="zavodil.near/widget/Status" props={{ accountId }} />
    </div>

    <div class="alert alert-primary" role="alert">
      <div className="d-flex justify-content-between mb-3">
        <div className="me-4">
          <Widget
            src="mob.near/widget/Profile"
            props={{ accountId: targetId }}
          />
        </div>
        <div>
          <Widget
            src="mob.near/widget/FollowButton"
            props={{ accountId: targetId }}
          />
        </div>
      </div>
      {targetStatus}
    </div>
  </>
);

// Output all the followed accounts and their statuses
// TODO: Make these statuses into actual microblog posts.
for (let i = 0; i < followed.length; ++i) {
  const accountId = followed[i];

  const dataFollowed = Social.get(`${accountId}/memo`, "final");

  if (dataFollowed) {
    allStatuses.push(
      <div className="mb-2">
        <div class="card">
          <div class="card-header">
            <Widget
              src="zavodil.near/widget/ProfileLine"
              props={{ accountId }}
            />

            <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
          </div>
          <div class="card-body">{dataFollowed}</div>
        </div>
      </div>
    );
  }
}

let title = allStatuses.length
  ? `Feed of ${targetId}:`
  : `Feed of ${targetId} is empty`;

return (
  <div>
    {currentAccountBlock}

    <h4>{title}</h4>

    <div>{allStatuses}</div>

    <hr />

    {allUsersBlock}
  </div>
);
