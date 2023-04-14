//QuickSocialUsers
const all = Social.keys("*/memo/", "final");

if (all === null) {
  return "Loading";
}

let users = Object.keys(all).map((accountId) => (
  <li class="list-group-item">
    <Widget
      src="zavodil.near/widget/ProfileLine"
      props={{
        accountId,
        link: "/#/zavodil.near/widget/QuickSocial?accountId=" + accountId,
      }}
    />{" "}
    <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
  </li>
));

return (
  <div>
    <h1>QuickSocial users:</h1>
    <ul class="list-group">{users}</ul>
  </div>
);
