const blunts = Social.index("blunt", "blunt-click");
const counter = {};
const uniqueBlunts = {};

if (blunts) {
  blunts.reverse().forEach(({ accountId, value }) => {
    const key = JSON.stringify({ accountId, value });
    if (key in uniqueBlunts) {
      return;
    }
    counter[accountId] = (counter[accountId] || 0) + 1;
    uniqueBlunts[key] = true;
  });
}

const top = Object.entries(counter);
top.sort((a, b) => b[1] - a[1]);

function renderBlunts(accountIds) {
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
    <div className="mb-4">
      <CommitButton
        className="btn btn-lg btn-success"
        data={{
          index: {
            blunt: JSON.stringify(
              {
                key: "blunt-click",
                value: Date.now(),
              },
              undefined,
              0
            ),
          },
        }}
      >
        Hit the Blunt 🍃💨
      </CommitButton>
    </div>
    <div className="mb-4">
      <h4>Top 10 People To Hit the Blunt</h4>
      <div>{renderBlunts(top.slice(0, 10).map((a) => a[0]))}</div>
    </div>
    <div className="mb-4">
      <h4>Last 30 People to Hit the Blunt</h4>
      <div>
        {blunts && renderBlunts(blunts.slice(0, 30).map((a) => a.accountId))}
      </div>
    </div>
  </div>
);
