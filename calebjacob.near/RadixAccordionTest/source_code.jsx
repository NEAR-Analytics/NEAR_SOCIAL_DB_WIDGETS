const Content = styled("Accordion.Content")`
    background: #f00;
`;

const Header = styled("Accordion.Header")`
    background: blue;
`;

const Trigger = styled("Accordion.Trigger")`
    background: green;
`;

return (
  <Accordion.Root
    className="AccordionRoot"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    <Accordion.Item className="AccordionItem" value="item-1">
      <Header className="AccordionHeader">
        <Trigger className="AccordionTrigger">Tab 1</Trigger>
      </Header>

      <Content className="AccordionContent">
        <div>Tab 1 content</div>
      </Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-2">
      <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger className="AccordionTrigger">
          Tab 2
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="AccordionContent">
        <div>Tab 2 content</div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-3">
      <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger className="AccordionTrigger">
          Tab 3
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="AccordionContent">
        <div>Tab 3 content</div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);
