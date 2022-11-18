const moos = Social.index("moo", "moo-click");
const counter = {};

return (
  <div>
    <div className="mb-4">
      <CommitButton
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
        Moo
      </CommitButton>
    </div>
    <div className="d-flex gap-3 flex-row-reverse">
      {moos &&
        moos.map(({ accountId, blockHeight, value }) => {
          counter[accountId] = (counter[accountId] || 0) + 1;
          return (
            <div className="position-relative">
              <Widget
                src="mob.near/widget/ProfileImage"
                props={{
                  accountId,
                  className: "d-inline-block overflow-hidden",
                }}
              />
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                style={{ zIndex: 1 }}
              >
                {counter[accountId]}
              </span>
            </div>
          );
        })}
    </div>
  </div>
);
