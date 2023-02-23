const ownerId = "gov.near";
const tab = props.tab === "following" ? props.tab : "followers";

return (
  <div>
    <ul className="nav nav-pills nav-fill mb-4" role="tablist">
      <li className="nav-item" role="presentation">
        <a
          href={`#/mob.near/widget/FollowPage?accountId=${ownerId}&tab=followers`}
          className={`btn nav-link ${tab === "followers" ? "active" : ""}`}
          role="tab"
        >
          Members
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a
          href={`#/mob.near/widget/FollowPage?accountId=${ownerId}&tab=following`}
          className={`btn nav-link ${tab === "following" ? "active" : ""}`}
          role="tab"
        >
          Leaders
        </a>
      </li>
    </ul>
  </div>
);
