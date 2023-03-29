const Content = styled("Accordion.Content")`
    background: #eee;
    padding: 16px;
    margin: 0 0 16px;
`;

const Header = styled("Accordion.Header")`
    background: #fff;
    margin: 0 0 16px;
`;

return (
  <Accordion.Root type="single" defaultValue="item-1" collapsible>
    <Accordion.Item value="item-1">
      <Header>
        <Accordion.Trigger asChild>
          <Widget
            src="calebjacob.near/widget/TestButton"
            props={{ label: "Tab 1" }}
          />
        </Accordion.Trigger>
      </Header>

      <Content>
        <div>Tab 1 content</div>
      </Content>
    </Accordion.Item>

    <Accordion.Item value="item-2">
      <Header>
        <Accordion.Trigger asChild>
          <Widget
            src="calebjacob.near/widget/TestButton"
            props={{ label: "Tab 2" }}
          />
        </Accordion.Trigger>
      </Header>

      <Content>
        <div>Tab 2 content</div>
      </Content>
    </Accordion.Item>

    <Accordion.Item value="item-3">
      <Header>
        <Accordion.Trigger asChild>
          <Widget
            src="calebjacob.near/widget/TestButton"
            props={{ label: "Tab 3" }}
          />
        </Accordion.Trigger>
      </Header>

      <Content>
        <div>Tab 3 content</div>
      </Content>
    </Accordion.Item>
  </Accordion.Root>
);
