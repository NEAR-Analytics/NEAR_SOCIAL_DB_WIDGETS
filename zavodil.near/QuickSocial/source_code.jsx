// QuickSocial
let accountId = context.accountId;
let targetId = props.accountId ?? accountId;

if (!props.accountId && !accountId) {
  return (
    <Widget src="zavodil.near/widget/QuickSocialUsers" props={{ accountId }} />
  );
}
const targetStatus = Social.get(`${targetId}/memo`, "final");

if (targetStatus === null) {
  return "Loading";
}

// pre check since Social.keys crashes if no data
let followingData = Social.get(`${targetId}/graph/follow/*`, "final", {
  values_only: true,
});

let followed = [];
if (followingData) {
  let following = Social.keys(`${targetId}/graph/follow/*`, "final", {
    values_only: true,
  });

  followed = Object.keys(following[targetId]["graph"]["follow"]);
}

const allStatuses = [];

let currentAccount = (
  <>
    <h1>QuickSocial</h1>
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

for (let i = 0; i < followed.length; ++i) {
  const accountId = followed[i];

  const dataFollowed = Social.get(`${accountId}/memo`, "final");

  console.log(dataFollowed);

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
    {currentAccount}

    <h4>{title}</h4>

    <div>{allStatuses}</div>

    <hr />

    <div className="mt-3 mb-5">
      <a
        className="btn btn-outline-primary"
        href="/#/zavodil.near/widget/QuickSocialUsers"
      >
        All QuickSocial Users
      </a>
    </div>
  </div>
);
