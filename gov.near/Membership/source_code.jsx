const ownerId = "gov.near";
const tab = props.tab === "following" ? props.tab : "followers";

return (
  <div>
    <ul className="nav nav-pills nav-fill mb-4" role="tablist">
      <li className="nav-item" role="presentation">
        <a
          href={`#/gov.near/widget/JoinPage?ownerId=${ownerId}&tab=followers`}
          className={`btn nav-link ${tab === "followers" ? "active" : ""}`}
          role="tab"
        >
          Followers
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a
          href={`#/gov.near/widget/JoinPage?ownerId=${ownerId}&tab=following`}
          className={`btn nav-link ${tab === "following" ? "active" : ""}`}
          role="tab"
        >
          Members
        </a>
      </li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane fade in show active" role="tabpanel">
        <Widget
          src={
            tab === "followers"
              ? "mob.near/widget/FollowersList"
              : "mob.near/widget/FollowingList"
          }
          props={{ ownerId }}
        />
      </div>
    </div>
  </div>
);
