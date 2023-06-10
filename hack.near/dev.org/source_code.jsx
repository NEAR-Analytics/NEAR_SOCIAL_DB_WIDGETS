const accountId = props.accountId ?? context.accountId;
const daoId = props.accountId ?? "build.sputnik-dao.near";

const tab = props.tab === "following" ? props.tab : "members";

return (
  <div>
    <ul className="nav nav-pills nav-fill mb-4" role="tablist">
      <li className="nav-item" role="presentation">
        <a
          href={`#/hack.near/widget/every.one?accountId=devs.near&tab=members`}
          className={`btn nav-link ${tab === "members" ? "active" : ""}`}
          role="tab"
        >
          Members
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a
          href={`#/hack.near/widget/every.one?accountId=devs.near&tab=following`}
          className={`btn nav-link ${tab === "following" ? "active" : ""}`}
          role="tab"
        >
          Collaborators
        </a>
      </li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane fade in show active" role="tabpanel">
        <Widget
          src={
            tab === "members"
              ? "hack.near/widget/DAO.Members"
              : "mob.near/widget/FollowingList"
          }
          props={{ accountId, daoId }}
        />
      </div>
    </div>
  </div>
);
