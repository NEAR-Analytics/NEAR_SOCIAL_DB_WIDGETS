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

const org = (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="24"
      height="24"
      transform="translate(0 0.161133)"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23.4 16.1389C23.4 15.6687 23.1997 15.2208 22.8483 14.8928C22.4974 14.5652 22.0241 14.3834 21.5333 14.3834H19.0667L19.0667 13.8049C19.0637 12.9232 18.687 12.0813 18.0238 11.4623C17.361 10.8437 16.4651 10.4972 15.5333 10.4945H13.2333V8.56113H16.2833C16.7741 8.56113 17.2474 8.37929 17.5983 8.05173C17.9497 7.72374 18.15 7.27581 18.15 6.80558V2.91669C18.15 2.44646 17.9497 1.99853 17.5983 1.67053C17.2474 1.34297 16.7741 1.16113 16.2833 1.16113H7.11667C6.62588 1.16113 6.15265 1.34297 5.8017 1.67053C5.45027 1.99853 5.25 2.44646 5.25 2.91669V6.80558C5.25 7.27581 5.45027 7.72374 5.8017 8.05173C6.15265 8.37929 6.62588 8.56113 7.11667 8.56113H11.1667V10.4945L8.86609 10.4945C7.93431 10.4972 7.03899 10.8437 6.37622 11.4623C5.71299 12.0813 5.33627 12.9238 5.33333 13.8056V14.3834H2.86667C2.37588 14.3834 1.90265 14.5652 1.55169 14.8928C1.20027 15.2208 1 15.6687 1 16.1389L1 20.8056C1 21.2758 1.20027 21.7237 1.55169 22.0517C1.90265 22.3793 2.37588 22.5611 2.86667 22.5611H9.86667C10.3575 22.5611 10.8307 22.3793 11.1816 22.0517C11.5331 21.7237 11.7333 21.2758 11.7333 20.8056V16.1389C11.7333 15.6687 11.5331 15.2208 11.1816 14.8928C10.8307 14.5652 10.3575 14.3834 9.86667 14.3834H7.4V13.8056C7.4 13.4507 7.55093 13.1073 7.82462 12.8518C8.09878 12.596 8.4734 12.45 8.86667 12.45L15.5333 12.45C15.9266 12.45 16.3012 12.596 16.5754 12.8518C16.8491 13.1073 17 13.4507 17 13.8056V14.3834H14.5333C14.0425 14.3834 13.5693 14.5652 13.2184 14.8928C12.8669 15.2208 12.6667 15.6687 12.6667 16.1389V20.8056C12.6667 21.2758 12.8669 21.7237 13.2184 22.0517C13.5693 22.3793 14.0425 22.5611 14.5333 22.5611H21.5333C22.0241 22.5611 22.4974 22.3793 22.8483 22.0517C23.1997 21.7237 23.4 21.2758 23.4 20.8056V16.1389ZM14.7333 16.3389H21.3333V20.6056H14.7333V16.3389ZM7.31667 3.11669L16.0833 3.11669V6.60558H7.31667V3.11669ZM3.06667 16.3389H9.66667L9.66667 20.6056H3.06667L3.06667 16.3389Z"
      fill="#667085"
    />
  </svg>
);

const graph = (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.80252 3.25906C9.17114 3.25906 8.56563 3.53 8.11918 4.01229C7.67273 4.49458 7.42192 5.14871 7.42192 5.83077V10.5785C7.42192 10.7359 7.36404 10.8869 7.26101 10.9982C7.15798 11.1095 7.01825 11.172 6.87255 11.172H2.47759C1.84621 11.172 1.2407 11.443 0.79425 11.9252C0.3478 12.4075 0.0969875 13.0617 0.0969875 13.7437V18.4915C0.0969875 18.8292 0.158564 19.1636 0.2782 19.4756C0.397837 19.7877 0.57319 20.0712 0.79425 20.31C1.01531 20.5488 1.27774 20.7382 1.56657 20.8675C1.8554 20.9967 2.16496 21.0632 2.47759 21.0632H14.1975C14.5101 21.0632 14.8197 20.9967 15.1085 20.8675C15.3973 20.7382 15.6598 20.5488 15.8808 20.31C16.1019 20.0712 16.2772 19.7877 16.3969 19.4756C16.5165 19.1636 16.5781 18.8292 16.5781 18.4915V13.7437C16.5781 13.5863 16.636 13.4354 16.739 13.3241C16.842 13.2128 16.9817 13.1503 17.1275 13.1503H21.5224C22.1538 13.1503 22.7593 12.8793 23.2057 12.397C23.6522 11.9147 23.903 11.2606 23.903 10.5785V5.83077C23.903 5.14871 23.6522 4.49458 23.2057 4.01229C22.7593 3.53 22.1538 3.25906 21.5224 3.25906H9.80252ZM21.5224 11.172H16.5781V5.23729H21.5224C21.6681 5.23729 21.8078 5.29982 21.9109 5.41112C22.0139 5.52242 22.0718 5.67337 22.0718 5.83077V10.5785C22.0718 10.7359 22.0139 10.8869 21.9109 10.9982C21.8078 11.1095 21.6681 11.172 21.5224 11.172ZM14.7468 11.172H9.25315V5.83077C9.25315 5.67337 9.31103 5.52242 9.41406 5.41112C9.51708 5.29982 9.65682 5.23729 9.80252 5.23729H14.7468V11.172ZM7.42192 13.1503V19.085H2.47759C2.33189 19.085 2.19215 19.0224 2.08913 18.9111C1.9861 18.7998 1.92822 18.6489 1.92822 18.4915V13.7437C1.92822 13.5863 1.9861 13.4354 2.08913 13.3241C2.19215 13.2128 2.33189 13.1503 2.47759 13.1503H7.42192ZM9.25315 13.1503H14.7468V18.4915C14.7468 18.6489 14.689 18.7998 14.5859 18.9111C14.4829 19.0224 14.3432 19.085 14.1975 19.085H9.25315V13.1503Z"
      fill="#667085"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.04832 3.94543C8.51238 3.44412 9.14322 3.16113 9.80252 3.16113H21.5224C22.1817 3.16113 22.8126 3.44412 23.2766 3.94543C23.7405 4.44651 24 5.12479 24 5.83077V10.5785C24 11.2845 23.7405 11.9628 23.2766 12.4639C22.8126 12.9652 22.1817 13.2482 21.5224 13.2482H17.1275C17.0097 13.2482 16.8953 13.2987 16.8098 13.3909C16.7242 13.4834 16.6751 13.6102 16.6751 13.7437V18.4915C16.6751 18.8412 16.6113 19.1876 16.4873 19.511C16.3633 19.8344 16.1814 20.1287 15.9517 20.3768C15.7219 20.625 15.4488 20.8223 15.1478 20.957C14.8467 21.0917 14.5238 21.1611 14.1975 21.1611H2.47759C2.15128 21.1611 1.82834 21.0917 1.52728 20.957C1.22623 20.8223 0.95313 20.625 0.723392 20.3768C0.493667 20.1287 0.311757 19.8344 0.187754 19.511C0.0637526 19.1876 0 18.8412 0 18.4915V13.7437C0 13.0377 0.259546 12.3595 0.723392 11.8584C1.18745 11.3571 1.81829 11.0741 2.47759 11.0741H6.87255C6.99033 11.0741 7.10473 11.0236 7.19015 10.9313C7.27578 10.8388 7.32493 10.712 7.32493 10.5785V5.83077C7.32493 5.12479 7.58448 4.44651 8.04832 3.94543ZM9.80252 3.35698C9.19907 3.35698 8.61888 3.61588 8.19004 4.07916C7.76098 4.54265 7.5189 5.17262 7.5189 5.83077V10.5785C7.5189 10.7599 7.45229 10.935 7.33187 11.0651C7.21124 11.1954 7.04617 11.2699 6.87255 11.2699H2.47759C1.87413 11.2699 1.29395 11.5288 0.865108 11.9921C0.436055 12.4556 0.193975 13.0856 0.193975 13.7437V18.4915C0.193975 18.8172 0.253375 19.1397 0.368647 19.4403C0.483916 19.7409 0.652714 20.0137 0.865108 20.2431C1.07749 20.4725 1.32926 20.6542 1.60587 20.7779C1.88246 20.9017 2.17865 20.9653 2.47759 20.9653H14.1975C14.4964 20.9653 14.7926 20.9017 15.0692 20.7779C15.3458 20.6542 15.5976 20.4725 15.81 20.2431C16.0224 20.0137 16.1912 19.7409 16.3064 19.4403C16.4217 19.1397 16.4811 18.8172 16.4811 18.4915V13.7437C16.4811 13.5624 16.5477 13.3873 16.6681 13.2572C16.7888 13.1269 16.9538 13.0523 17.1275 13.0523H21.5224C22.1259 13.0523 22.706 12.7934 23.1349 12.3302C23.5639 11.8667 23.806 11.2367 23.806 10.5785V5.83077C23.806 5.17262 23.5639 4.54265 23.1349 4.07916C22.706 3.61588 22.1259 3.35698 21.5224 3.35698H9.80252ZM9.80252 5.33522C9.68474 5.33522 9.57034 5.3857 9.48491 5.47798C9.39928 5.57049 9.35014 5.69728 9.35014 5.83077V11.0741H14.6499V5.33522H9.80252ZM9.3432 5.34426C9.46383 5.21394 9.6289 5.13937 9.80252 5.13937H14.8438V11.2699H9.15616V5.83077C9.15616 5.64945 9.22278 5.47435 9.3432 5.34426ZM16.4811 5.13937H21.5224C21.696 5.13937 21.8611 5.21394 21.9817 5.34426C22.1022 5.47435 22.1688 5.64945 22.1688 5.83077V10.5785C22.1688 10.7599 22.1022 10.935 21.9817 11.0651C21.8611 11.1954 21.696 11.2699 21.5224 11.2699H16.4811V5.13937ZM16.6751 5.33522V11.0741H21.5224C21.6402 11.0741 21.7546 11.0236 21.84 10.9313C21.9256 10.8388 21.9748 10.712 21.9748 10.5785V5.83077C21.9748 5.69728 21.9256 5.57049 21.84 5.47798C21.7546 5.3857 21.6402 5.33522 21.5224 5.33522H16.6751ZM2.47759 13.2482C2.35981 13.2482 2.24541 13.2987 2.15998 13.3909C2.07435 13.4834 2.02521 13.6102 2.02521 13.7437V18.4915C2.02521 18.625 2.07435 18.7518 2.15998 18.8443C2.24541 18.9366 2.35981 18.987 2.47759 18.987H7.32493V13.2482H2.47759ZM2.01827 13.2572C2.1389 13.1269 2.30397 13.0523 2.47759 13.0523H7.5189V19.1829H2.47759C2.30397 19.1829 2.1389 19.1083 2.01827 18.978C1.89785 18.8479 1.83123 18.6728 1.83123 18.4915V13.7437C1.83123 13.5624 1.89785 13.3873 2.01827 13.2572ZM9.15616 13.0523H14.8438V18.4915C14.8438 18.6728 14.7772 18.8479 14.6568 18.978C14.5362 19.1083 14.3711 19.1829 14.1975 19.1829H9.15616V13.0523ZM9.35014 13.2482V18.987H14.1975C14.3153 18.987 14.4297 18.9366 14.5151 18.8443C14.6007 18.7518 14.6499 18.625 14.6499 18.4915V13.2482H9.35014Z"
      fill="#667085"
    />
  </svg>
);

const about = (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 14.1611V10.6611M12 7.16113H12.01M9.9 19.3611L11.36 21.3078C11.5771 21.5973 11.6857 21.742 11.8188 21.7938C11.9353 21.8391 12.0647 21.8391 12.1812 21.7938C12.3143 21.742 12.4229 21.5973 12.64 21.3078L14.1 19.3611C14.3931 18.9703 14.5397 18.7748 14.7185 18.6256C14.9569 18.4267 15.2383 18.286 15.5405 18.2146C15.7671 18.1611 16.0114 18.1611 16.5 18.1611C17.8978 18.1611 18.5967 18.1611 19.1481 17.9328C19.8831 17.6283 20.4672 17.0443 20.7716 16.3092C21 15.7579 21 15.059 21 13.6611V7.96113C21 6.28098 21 5.4409 20.673 4.79916C20.3854 4.23468 19.9265 3.77573 19.362 3.48811C18.7202 3.16113 17.8802 3.16113 16.2 3.16113H7.8C6.11984 3.16113 5.27976 3.16113 4.63803 3.48811C4.07354 3.77573 3.6146 4.23468 3.32698 4.79916C3 5.4409 3 6.28098 3 7.96113V13.6611C3 15.059 3 15.7579 3.22836 16.3092C3.53284 17.0443 4.11687 17.6283 4.85195 17.9328C5.40326 18.1611 6.10218 18.1611 7.5 18.1611C7.98858 18.1611 8.23287 18.1611 8.45951 18.2146C8.76169 18.286 9.04312 18.4267 9.2815 18.6256C9.46028 18.7748 9.60685 18.9703 9.9 19.3611Z"
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
      icon: org,
      id: "entities",
    })}
    {navItem({
      text: "My graph",
      icon: graph,
      id: "contributions",
    })}
    <hr className="border-2" />
    {navItem({
      text: "About this app",
      icon: about,
      id: "about",
    })}
    <a className="nav-link mt-2 rounded-3 p-2" href="/#/">
      <i className="bi-escape" />
      <span>Exit application</span>
    </a>
  </div>
);
