const accountId = props.accountId ?? context.accountId;
const tab = props.tab === "members" ? props.tab : "subscribers";

return (
  <div>
    <ul className="nav nav-pills nav-fill mb-4" role="tablist">
      <li className="nav-item" role="presentation">
        <a
          href={`#/gov.near/widget/FollowPage?accountId=${accountId}&tab=subscribers`}
          className={`btn nav-link ${tab === "subscribers" ? "active" : ""}`}
          role="tab"
        >
          Subscribers
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a
          href={`#/gov.near/widget/FollowPage?accountId=${accountId}&tab=members`}
          className={`btn nav-link ${tab === "members" ? "active" : ""}`}
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
            tab === "subscribers"
              ? "gov.near/widget/SubscribersList"
              : "gov.near/widget/MembersList"
          }
          props={{ accountId }}
        />
      </div>
    </div>
  </div>
);
