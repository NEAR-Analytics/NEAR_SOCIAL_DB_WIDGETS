const Rsvp = Social.index("Rsvp", "rsvp-click");
const counter = {};
const uniqueRsvp = {};

if (Rsvp) {
  Rsvp.reverse().forEach(({ accountId, value }) => {
    const key = JSON.stringify({ accountId, value });
    if (key in uniqueRsvp) {
      return;
    }
    counter[accountId] = (counter[accountId] || 0) + 1;
    uniqueRsvp[key] = true;
  });
}

const top = Object.entries(counter);
top.sort((a, b) => b[1] - a[1]);

function renderRsvp(accountIds) {
  return (
    <div className="d-flex flex-wrap gap-3">
      {accountIds &&
        accountIds.map((accountId) => {
          return (
            <div className="position-relative">
              <a
                href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
                className="text-decoration-none"
              >
                <Widget
                  src="mob.near/widget/ProfileImage"
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
      src="jeffsatori.near/widget/EventsList"
      props={{ event: hasevent ? event : undefined }}
    />
    <br />
    <div className="mb-4">
      <CommitButton
        className="btn btn-lg btn-success"
        data={{
          index: {
            Rsvp: JSON.stringify(
              {
                key: "rsvp-click",
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
      <h4>
        <p>Total RSVPs: {top.length}</p> Attendee Profiles
        <div>{renderRsvp(top.map((a) => a[0]))}</div>{" "}
      </h4>
    </div>
  </div>
);
