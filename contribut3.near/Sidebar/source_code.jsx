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
<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" transform="translate(0 0.161133)" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.4 16.1389C23.4 15.6687 23.1997 15.2208 22.8483 14.8928C22.4974 14.5652 22.0241 14.3834 21.5333 14.3834H19.0667L19.0667 13.8049C19.0637 12.9232 18.687 12.0813 18.0238 11.4623C17.361 10.8437 16.4651 10.4972 15.5333 10.4945H13.2333V8.56113H16.2833C16.7741 8.56113 17.2474 8.37929 17.5983 8.05173C17.9497 7.72374 18.15 7.27581 18.15 6.80558V2.91669C18.15 2.44646 17.9497 1.99853 17.5983 1.67053C17.2474 1.34297 16.7741 1.16113 16.2833 1.16113H7.11667C6.62588 1.16113 6.15265 1.34297 5.8017 1.67053C5.45027 1.99853 5.25 2.44646 5.25 2.91669V6.80558C5.25 7.27581 5.45027 7.72374 5.8017 8.05173C6.15265 8.37929 6.62588 8.56113 7.11667 8.56113H11.1667V10.4945L8.86609 10.4945C7.93431 10.4972 7.03899 10.8437 6.37622 11.4623C5.71299 12.0813 5.33627 12.9238 5.33333 13.8056V14.3834H2.86667C2.37588 14.3834 1.90265 14.5652 1.55169 14.8928C1.20027 15.2208 1 15.6687 1 16.1389L1 20.8056C1 21.2758 1.20027 21.7237 1.55169 22.0517C1.90265 22.3793 2.37588 22.5611 2.86667 22.5611H9.86667C10.3575 22.5611 10.8307 22.3793 11.1816 22.0517C11.5331 21.7237 11.7333 21.2758 11.7333 20.8056V16.1389C11.7333 15.6687 11.5331 15.2208 11.1816 14.8928C10.8307 14.5652 10.3575 14.3834 9.86667 14.3834H7.4V13.8056C7.4 13.4507 7.55093 13.1073 7.82462 12.8518C8.09878 12.596 8.4734 12.45 8.86667 12.45L15.5333 12.45C15.9266 12.45 16.3012 12.596 16.5754 12.8518C16.8491 13.1073 17 13.4507 17 13.8056V14.3834H14.5333C14.0425 14.3834 13.5693 14.5652 13.2184 14.8928C12.8669 15.2208 12.6667 15.6687 12.6667 16.1389V20.8056C12.6667 21.2758 12.8669 21.7237 13.2184 22.0517C13.5693 22.3793 14.0425 22.5611 14.5333 22.5611H21.5333C22.0241 22.5611 22.4974 22.3793 22.8483 22.0517C23.1997 21.7237 23.4 21.2758 23.4 20.8056V16.1389ZM14.7333 16.3389H21.3333V20.6056H14.7333V16.3389ZM7.31667 3.11669L16.0833 3.11669V6.60558H7.31667V3.11669ZM3.06667 16.3389H9.66667L9.66667 20.6056H3.06667L3.06667 16.3389Z" fill="#667085"/>
</svg>
