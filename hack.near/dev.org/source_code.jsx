const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

const tab = props.tab === "following" ? props.tab : "members";

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
          href={`#/hack.near/widget/every.one?accountId=${accountId}&tab=following`}
          className={`btn nav-link ${tab === "following" ? "active" : ""}`}
          role="tab"
        >
          Collaborators
        </a>
      </li>
    </ul>
    <div className="tab-content">
      <div
        className={`tab-pane fade ${tab === "members" ? "show active" : ""}`}
        role="tabpanel"
      >
        <Widget
          src="hack.near/widget/DAO.Members"
          props={{ accountId, daoId }}
        />
      </div>
      <div
        className={`tab-pane fade ${tab === "following" ? "show active" : ""}`}
        role="tabpanel"
      >
        <Widget src="mob.near/widget/FollowingList" props={{ accountId }} />
      </div>
    </div>
  </div>
);
