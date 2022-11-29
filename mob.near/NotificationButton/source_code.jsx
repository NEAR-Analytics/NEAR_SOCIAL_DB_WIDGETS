const notificationFeedSrc = "mob.near/widget/NotificationFeed";

const render = (counter, disabled) => {
  const className = "btn btn-sm btn-outline-dark border-0";
  const inner = (
    <>
      <i className="fs-4 bi bi-bell"></i>
      {counter !== undefined && counter > 0 && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
          style={{ zIndex: 1, border: "1px solid rgb(15,81,51)" }}
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
        <a className={className} href={`#/${notificationFeedSrc}`}>
          {inner}
        </a>
      )}
    </div>
  );
};

const accountId = context.accountId;

if (context.loading || !accountId) {
  return render(0, true);
}

const lastBlockHeight = Storage.get("lastBlockHeight", notificationFeedSrc);
if (lastBlockHeight === null) {
  return render(0, true);
}

const notifications = Social.index("notify", accountId, {
  order: "asc",
  from: (lastBlockHeight ?? 0) + 1,
});
return render(notifications.length, false);
