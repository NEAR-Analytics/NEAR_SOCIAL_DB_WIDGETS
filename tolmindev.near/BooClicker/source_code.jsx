const boos = Social.index("boo", "boo-click");
const counter = {};
const uniqueMoos = {};

if (boos) {
  boos.reverse().forEach(({ accountId, value }) => {
    const key = JSON.stringify({ accountId, value });
    if (key in uniqueMoos) {
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
                href={`#/mob/widget/ProfilePage?accountId=${accountId}`}
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
                style={{ zIndex: 1, border: "0px solid rgb(7,7,7)" }}
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
            boo: JSON.stringify(
              {
                key: "boo-click",
                value: Date.now(),
              },
              undefined,
              0
            ),
          },
        }}
      >
        Boo 💀
      </CommitButton>
    </div>
    <div className="mb-4">
      <h4>💀 Boo Overlords</h4>
      <div>{renderMoos(top.slice(0, 10).map((a) => a[0]))}</div>
    </div>
    <div className="mb-4">
      <h4>🦇 Last Catchers </h4>
      <div>
        {boos && renderMoos(boos.slice(0, 100).map((a) => a.accountId))}
      </div>
    </div>
  </div>
);
