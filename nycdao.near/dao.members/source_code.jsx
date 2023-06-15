const accountId = props.accountId ?? "liberty.sputnik-dao.near";
const daoId = props.daoId ?? "liberty.sputnik-dao.near";

return (
  <div>
    <ul className="nav nav-pills nav-fill mb-4" role="tablist">
      <li className="nav-item m-2" role="presentation">
        <a
          href={`#/nycdao.near/widget/nyc.dao?accountId=${accountId}&tab=following`}
          className={`btn m-1 border nav-link ${
            tab === "following" ? "active tab-with-border" : ""
          }`}
          role="tab"
        >
          Followers
        </a>
      </li>
      <li className="nav-item m-2" role="presentation">
        <a
          href={`#/nycdao.near/widget/nyc.dao?accountId=${accountId}&tab=members`}
          className={`btn m-1 border nav-link ${
            tab === "members" ? "active" : ""
          }`}
          role="tab"
        >
          Members
        </a>
      </li>
    </ul>
    <div className="tab-content">
      <div
        className={`tab-pane fade ${tab === "following" ? "show active" : ""}`}
        role="tabpanel"
      >
        <Widget
          src="mob.near/widget/FollowingList"
          props={{ accountId: accountId }}
        />
      </div>
      <div
        className={`tab-pane fade ${tab === "members" ? "show active" : ""}`}
        role="tabpanel"
      >
        <Widget src="hack.near/widget/DAO.Members" props={{ daoId }} />
      </div>
    </div>
  </div>
);
