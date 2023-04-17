const ownerId = "contribut3.near";
const accountId = props.accountId;

return (
  <Widget
    src={`${ownerId}/widget/SideWindow`}
    props={{
      title: "Propose contribution",
      description: (
        <Widget
          src={`${ownerId}/widget/Request.line`}
          props={{ accountId }}
        />
      ),
      trigger: <>Propose contribution</>,
      children: (
        <Widget
          src={`${ownerId}/widget/Request.ProposeForm`}
          props={{ accountId }}
        />
      ),
      minWidth: "600px",
    }}
  />
);
