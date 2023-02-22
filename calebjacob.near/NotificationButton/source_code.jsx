const accountId = context.accountId;

if (context.loading || !accountId) return <></>;

const notificationFeedSrc = "calebjacob.near/widget/NotificationsPage";
const lastBlockHeight = Storage.get("lastBlockHeight", notificationFeedSrc);
const notifications = Social.index("notify", accountId, {
  order: "asc",
  from: (lastBlockHeight ?? 0) + 1,
  subscribe: true,
});
const notificationsCount = notifications.length || 0;

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #2B2F31;
  color: #ECEDEE;
  transition: all 200ms;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;

  &:hover {
    color: #fff;
    background: rgb(60 65 68);
  }

  &:focus {
    box-shadow: 0 0 0 1px #fff;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  span {
    min-width: 13px;
    height: 13px;
    padding: 0 3px;
    display: block;
    color: #fff;
    background: #E5484D;
    border-radius: 100px;
    font-size: 10px;
    line-height: 13px;
    text-align: center;
    font-weight: 600;
    position: absolute;
    top: -2px;
    right: -1px;
  }
`;

return (
  <Button href={`/#/${notificationFeedSrc}`} aria-label="View Notifications">
    <svg viewBox="0 0 16 16" fill="none">
      <path
        d="M4.97282 11.8248C4.97282 11.8248 4.32577 14.2396 7.22354 15.0161C10.1213 15.7925 10.7684 13.3777 10.7684 13.3777M14.6887 7.44006L14.1711 9.37191L15.003 13.9947L0.99704 10.2419L4.02887 6.65431L4.54651 4.72246C5.29696 1.92176 8.17572 0.259704 10.9764 1.01015C13.7771 1.76059 15.4392 4.63936 14.6887 7.44006Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    {notificationsCount > 0 && (
      <span>{notificationsCount > 99 ? "99+" : notificationsCount}</span>
    )}
  </Button>
);

const render = (counter, disabled) => {
  const className = "btn p-0 btn-sm border-0 link-dark";
  const inner = (
    <>
      <i className="fs-4 bi bi-bell"></i>
      {counter !== undefined && counter > 0 && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
          style={{ zIndex: 1, border: "1px solid rgb(9,66,150)" }}
        >
          {counter}
        </span>
      )}
    </>
  );

  return (
    <div className="d-inline position-relative">
      {disabled ? (
        <button disabled className={className}>
          {inner}
        </button>
      ) : (
        <a className={className} href={`/#/${notificationFeedSrc}`}>
          {inner}
        </a>
      )}
    </div>
  );
};
