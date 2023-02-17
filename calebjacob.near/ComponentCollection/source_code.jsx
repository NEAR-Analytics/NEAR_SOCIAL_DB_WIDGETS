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

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const CardWrapper = styled.div``;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
`;

if (data !== null && components.length === 0) {
  return <Text>This account has not published any components yet.</Text>;
}

return (
  <Wrapper>
    {components.map((component, i) => (
      <Widget
        src="calebjacob.near/widget/ComponentCard"
        props={{
          src: `${component.accountId}/widget/${component.widgetName}`,
          blockHeight: component.blockHeight,
        }}
      />
    ))}
  </Wrapper>
);
