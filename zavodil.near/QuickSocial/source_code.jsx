// QuickSocial
let accountId = context.accountId;
let targetId = props.accountId ?? accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

let following = Social.keys(`${targetId}/graph/follow/*`, "final", {
  values_only: true,
});

if (following === null) {
  return "Loading";
}
const followed = Object.keys(following[targetId]["graph"]["follow"]);
const allStatuses = [];

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
  : "Feed of ${targetId} is empty";

return (
  <div>
    <h1>QuickSocial</h1>
    <div className="me-4 mb-4">
      <Widget src="zavodil.near/widget/Status" props={{ accountId }} />
    </div>

    <h4>{title}</h4>

    <div className="d-flex justify-content-between mb-3">
      <div className="me-4">
        <Widget src="mob.near/widget/Profile" props={{ accountId: targetId }} />
      </div>
      <div>
        <Widget
          src="mob.near/widget/FollowButton"
          props={{ accountId: targetId }}
        />
      </div>
    </div>

    <div>{allStatuses}</div>
  </div>
);
