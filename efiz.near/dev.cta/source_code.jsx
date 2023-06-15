const accountId = props.accountId ?? context.accountId;

let isBuilder = false;
let widgets = Social.get(`${accountId}/widget/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
let widgetCount = 0;
if (widgets) {
  widgetCount = Object.keys(widgets).length;
}
if (widgetCount > 0) {
  isBuilder = true;
}

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin-botton: 8px;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 998px) {
    flex-direction: column;
    gap: var(--section-gap);
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
`;

return (
  <Container>
    {isBuilder ? (
      <div>
        <Text
          size="18px"
          weight="600"
          style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
        >
          Your Adventure Has Begun
        </Text>
        <FlexContainer>
          <div className="m-1">
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "https://nearbuilders.com",
                label: "Explore Groups",
                variant: "outline-success",
                size: "large",
              }}
            />
          </div>
          <div className="m-1">
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "#/every.near/widget/browser?path=every.near/thing/test",
                label: "Start Projects",
                variant: "outline-secondary",
                size: "large",
              }}
            />
          </div>
          <div className="m-1">
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "https://wallet.near.org/linkdrop/v2.keypom.near/2BNMVyPgjXgHtn9xiQkcRLzZYmsh5JyGoeaRV9Tb5rmsbqNrAsuwGPziL6ztsfjxLVzQRwGERA3JGSQ28VEA8NtL",
                label: "Join Community",
                variant: "outline-secondary",
                size: "large",
              }}
            />
          </div>
        </FlexContainer>
      </div>
    ) : (
      <Flex>
        <Text
          size="18px"
          weight="600"
          style={{ textTransform: "uppercase", letterSpacing: "0.17em" }}
        >
          Begin a New Adventure
        </Text>
        <FlexContainer>
          <div className="m-1">
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "https://nearbuilders.com",
                label: "Explore Groups",
                variant: "outline-success",
                size: "large",
              }}
            />
          </div>
          <div className="m-1">
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "#/every.near/widget/browser?path=every.near/thing/test",
                label: "Start Projects",
                variant: "outline-secondary",
                size: "large",
              }}
            />
          </div>
          <div className="m-1">
            <Widget
              src="near/widget/DIG.Button"
              props={{
                href: "#/hack.near/widget/Academy",
                label: "Learn Together",
                variant: "outline-secondary",
                size: "large",
              }}
            />
          </div>
        </FlexContainer>
      </Flex>
    )}
  </Container>
);
