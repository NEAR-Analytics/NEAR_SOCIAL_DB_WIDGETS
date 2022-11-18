const moos = Social.index("moo", "moo-click");
const counter = {};
const uniqueMoos = {};

if (moos) {
  moos.reverse().forEach(({ accountId, value }) => {
    const key = JSON.stringify({ accountId, value });
    if (uniqueMoos[key]) {
      return;
    }
    counter[accountId] = (counter[accountId] || 0) + 1;
    uniqueMoos[key] = true;
  });
}

const top = Object.entries(counter);
top.sort((a, b) => b[1] - a[1]);

function renderMoos(accountIds) {
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
            moo: JSON.stringify(
              {
                key: "moo-click",
                value: Date.now(),
              },
              undefined,
              0
            ),
          },
        }}
      >
        Moo 🐮
      </CommitButton>
    </div>
    <div className="mb-4">
      <h4>Top 10</h4>
      <div>{renderMoos(top.slice(0, 10).map((a) => a[0]))}</div>
    </div>
    <div className="mb-4">
      <h4>Last 10 </h4>
      <div>{moos && renderMoos(moos.slice(0, 10).map((a) => a.accountId))}</div>
    </div>
  </div>
);
