return (
  <Accordion.Root
    className="AccordionRoot"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    <Accordion.Item className="AccordionItem" value="item-1">
      <Accordion.Header className="AccordionHeader">
        <Accordion.Trigger className="AccordionTrigger">
          Tab 1
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="AccordionContent">
        <div>Tab 1 content</div>
      </Accordion.Content>
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
