const accountId = props.accountId ?? context.accountId;
const daoId = props.accountId ?? "build.sputnik-dao.near";

const tab =
  props.tab === "members" || props.tab === "following" ? props.tab : "members";

return (
  <div>
    <ul className="nav nav-pills nav-fill mb-4" role="tablist">
      <li className="nav-item" role="presentation">
        <a
          href={`#/hack.near/widget/every.one?accountId=${accountId}&tab=members`}
          className={`btn nav-link ${tab === "members" ? "active" : ""}`}
          role="tab"
        >
          Members
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a
          href={`#/mob.near/widget/FollowPage?accountId=${accountId}&tab=followers`}
          className={`btn nav-link ${tab === "followers" ? "active" : ""}`}
          role="tab"
        >
          Followers
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a
          href={`#/mob.near/widget/FollowPage?accountId=${accountId}&tab=following`}
          className={`btn nav-link ${tab === "following" ? "active" : ""}`}
          role="tab"
        >
          Following
        </a>
      </li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane fade in show active" role="tabpanel">
        {tab === "members" && (
          <Widget
            src="hack.near/widget/DAO.Members"
            props={{ accountId, daoId }}
          />
        )}
        {tab === "followers" && (
          <Widget src="mob.near/widget/FollowersList" props={{ accountId }} />
        )}
        {tab === "following" && (
          <Widget src="mob.near/widget/FollowingList" props={{ accountId }} />
        )}
      </div>
    </div>
  </div>
);
