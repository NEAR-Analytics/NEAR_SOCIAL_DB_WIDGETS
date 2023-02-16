const accountId = props.accountId || context.accountId;

if (!accountId) return "";

let components = [];

const data = Social.keys(`${accountId}/widget/*`, "final", {
  return_type: "BlockHeight",
});

if (data) {
  components = [];

  Object.keys(data).forEach((accountId) => {
    return Object.keys(data[accountId].widget).forEach((widgetName) => {
      components.push({
        accountId,
        widgetName,
        blockHeight: data[accountId].widget[widgetName],
      });
    });
  });

  components.sort((a, b) => b.blockHeight - a.blockHeight);
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const CardWrapper = styled.div``;

return (
  <Wrapper>
    {components.map((component, i) => (
      <Widget
        src="calebjacob.near/widget/ComponentCard"
        props={{
          src: `${component.accountId}/widget/${component.widgetName}`,
        }}
      />
    ))}
  </Wrapper>
);
