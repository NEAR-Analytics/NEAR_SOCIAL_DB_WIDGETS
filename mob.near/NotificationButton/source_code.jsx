const render = (counter, disabled) => {
  const className = "btn btn-sm btn-outline-dark border-0";
  const inner = (
    <>
      <i className="fs-4 bi bi-bell"></i>
      {counter && (
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
        <a className={className} href="#/mob.near/widget/NotificationFeed">
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

const notifications = Social.index("notify", accountId, {
  order: "desc",
});
console.log(notifications);
return render(notifications.length, false);
