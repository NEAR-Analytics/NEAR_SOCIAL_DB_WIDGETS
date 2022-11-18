const moos = Social.index("moo", "moo-click");

return (
  <div>
    <div className="mb-2">
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
    <div className="d-flex gap-1">
      {moos &&
        moos.map(({ accountId, blockHeight, value }) => (
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId,
              className: "d-inline-block overflow-hidden",
            }}
          />
        ))}
    </div>
  </div>
);
