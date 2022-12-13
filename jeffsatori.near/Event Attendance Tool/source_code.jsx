const R = Social.index("Attending", "Attendance");
const counter = {};
const uniqueAttendance = {};

if (Attending) {
  Attending.reverse().forEach(({ accountId, value }) => {
    const key = JSON.stringify({ accountId, value });
    if (key in uniqueAttendance) {
      return;
    }
    counter[accountId] = (counter[accountId] || 0) + 1;
    uniqueAttendance[key] = true;
  });
}

const top = Object.entries(counter);
top.sort((a, b) => b[1] - a[1]);

function renderAttendace(accountIds) {
  return (
    <div className="d-flex flex-wrap gap-3">
      {accountIds &&
        accountIds.map((accountId) => {
          return (
            <div className="position-relative">
              <a
                href={`#/jeffsatori.near/widget/ProfilePage?accountId=${accountId}`}
                className="text-decoration-none"
              >
                <Widget
                  src="jeffsatori.near/widget/ProfileImage"
                  props={{
                    accountId,
                    className: "d-inline-block overflow-hidden",
                  }}
                />
              </a>
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                style={{ zIndex: 1, border: "1px solid rgb(15,81,51)" }}
              >
                {counter[accountId]}
              </span>
            </div>
          );
        })}
    </div>
  );
}

return (
  <div>
    <h2>Event</h2>
    <Widget
      src="jeffsatori.near/widget/Attendance"
      props={{ hasEvent: Event ? event : undefined }}
    />
    <br />
    <div className="mb-4">
      <CommitButton
        className="btn btn-lg btn-success"
        data={{
          index: {
            Attending: JSON.stringify(
              {
                key: "Attendance-click",
                value: Date.now(),
              },
              undefined,
              0
            ),
          },
        }}
      >
        Attending
      </CommitButton>
    </div>
    <div className="mb-4">
      <h4>See who's attending</h4>
      <div>{renderAttendace(top.slice(0, 10).map((a) => a[0]))}</div>
    </div>
  </div>
);
