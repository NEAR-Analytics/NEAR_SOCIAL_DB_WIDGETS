const Content = styled("Accordion.Content")`
    background: #eee;
    padding: 16px;
    margin: 0 0 16px;
`;

const Header = styled("Accordion.Header")`
    background: #fff;
    margin: 0 0 16px;
`;

const Trigger = styled("Accordion.Trigger")`
    display: block;
    background: #fff;
    cursor: pointer;
    border: none;
    padding: 0;
`;

return (
  <Accordion.Root type="single" defaultValue="item-1" collapsible>
    <Accordion.Item value="item-1">
      <Header>
        <Trigger>Tab 1</Trigger>
      </Header>

      <Content>
        <div>Tab 1 content</div>
      </Content>
    </Accordion.Item>

    <Accordion.Item value="item-2">
      <Header>
        <Trigger>Tab 2</Trigger>
      </Header>

      <Content>
        <div>Tab 2 content</div>
      </Content>
    </Accordion.Item>

    <Accordion.Item value="item-3">
      <Header>
        <Trigger>Tab 3</Trigger>
      </Header>

      <Content>
        <div>Tab 3 content</div>
      </Content>
    </Accordion.Item>
  </Accordion.Root>
);
