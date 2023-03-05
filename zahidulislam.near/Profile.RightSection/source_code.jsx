const accountId = props.accountId || context.accountId;

if (!accountId) return "Login or send accountId in the props";

const profile = Social.getr(`${accountId}/profile`);

const allWidgetsHistoryChangesBlocks = Social.keys(
  `${accountId}/widget/*`,
  "final",
  {
    return_type: "History",
  }
);

if (allWidgetsHistoryChangesBlocks === null) return "Loading...";

const widgets = Social.getr(`${accountId}/widget`) ?? {};

return (
  <div className="rightSection">
    <div>
      <h2>Widgets</h2>

      {Object.keys(widgets)?.length > 0 ? (
        <div className="widgetsContainer">
          {Object.keys(widgets)?.map((item, index) => (
            <Widget
              src="zahidulislam.near/widget/Profile.WidgetItem"
              props={{
                name: item,
                accountId,
                commits: allWidgetsHistoryChangesBlocks[accountId].widget[item],
              }}
            />
          ))}
        </div>
      ) : (
        <p
          style={{ padding: 20, textAlign: "center", color: "rgba(0,0,0,.75)" }}
        >
          {profile?.name} does not have any widget.
        </p>
      )}
    </div>

    <div>
      <h2>104 contributions in 2023</h2>
      <div style={{ marginTop: 20 }} />
      <Widget
        src="zahidulislam.near/widget/Profile.Contributions"
        props={{ theme: props.theme }}
      />
    </div>
  </div>
);
