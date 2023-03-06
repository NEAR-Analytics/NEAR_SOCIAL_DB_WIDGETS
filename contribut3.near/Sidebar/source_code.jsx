const ownerId = "contribut3.near";

const proposalsCount = (
  Near.view(
    ownerId,
    "get_admin_contribution_requests",
    { account_id: context.accountId },
    "final",
    true
  ) ?? []
).length;

const invitesCount = Object.keys(
  Near.view(
    ownerId,
    "get_contributor_invites",
    { account_id: context.accountId },
    "final",
    true
  ) ?? {}
).length;

const inboxCount = proposalsCount + invitesCount;

const mail = (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 7.16113L10.1649 12.8766C10.8261 13.3394 11.1567 13.5708 11.5163 13.6604C11.8339 13.7396 12.1661 13.7396 12.4837 13.6604C12.8433 13.5708 13.1739 13.3394 13.8351 12.8766L22 7.16113M6.8 20.1611H17.2C18.8802 20.1611 19.7202 20.1611 20.362 19.8342C20.9265 19.5465 21.3854 19.0876 21.673 18.5231C22 17.8814 22 17.0413 22 15.3611V8.96113C22 7.28098 22 6.4409 21.673 5.79916C21.3854 5.23468 20.9265 4.77573 20.362 4.48811C19.7202 4.16113 18.8802 4.16113 17.2 4.16113H6.8C5.11984 4.16113 4.27976 4.16113 3.63803 4.48811C3.07354 4.77573 2.6146 5.23468 2.32698 5.79916C2 6.4409 2 7.28098 2 8.96113V15.3611C2 17.0413 2 17.8814 2.32698 18.5231C2.6146 19.0876 3.07354 19.5465 3.63803 19.8342C4.27976 20.1611 5.11984 20.1611 6.8 20.1611Z"
      stroke="#667085"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const navItem = ({ text, icon, id, count }) => (
  <a
    className={`nav-link mt-2 rounded-3 p-2 ${id === props.tab ? "bg-secondary" : ""
      }`}
    href={`/#/${ownerId}/widget/Index?tab=${id}`}
    onClick={() => props.update({ tab: id, content: "", search: "" })}
  >
    {icon}
    <span>{text}</span>
    {!!count && count > 0 ? (
      <div
        className="d-inline-block rounded-circle bg-danger text-center"
        style={{ minWidth: "1.5em", height: "1.5em", color: "#FFF" }}
      >
        {count}
      </div>
    ) : (
      <></>
    )}
  </a>
);

const HomeLink = styled.a`
  color: #000;
  margin-bottom: 1.5rem;

  &:hover {
    text-decoration: none;
    color: #000;
  }
`;

return (
  <div className="d-flex flex-column">
    <HomeLink
      href={`/#/${ownerId}/widget/Index`}
      onClick={() => props.update({ tab: "home", content: "", search: "" })}
    >
      <h4 className="fs-4 text-nowrap d-flex flex-row align-items-center">
        <Widget src={`${ownerId}/widget/Logo`} props={{ size: 32 }} />
        <span className="ms-2">Web3 Combinator</span>
      </h4>
    </HomeLink>
    {navItem({
      text: "Inbox",
      icon: mail,
      id: "inbox",
      count: inboxCount,
    })}
    {navItem({
      text: "Manage",
      icon: "bi-diagram-2",
      id: "entities",
    })}
    {navItem({
      text: "My graph",
      icon: "bi-ui-checks-grid",
      id: "contributions",
    })}
    <hr className="border-2" />
    {navItem({
      text: "About this app",
      icon: "bi-info-square",
      id: "about",
    })}
    <a className="nav-link mt-2 rounded-3 p-2" href="/#/">
      <i className="bi-escape" />
      <span>Exit application</span>
    </a>
  </div>
);
