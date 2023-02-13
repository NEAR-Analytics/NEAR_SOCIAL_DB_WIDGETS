props.controller.setLayout('layouts:container', {
  title: 'ND Event Lists',
  back: false,

  primaryAction: {
    label: 'Create new Eventlist',
    onClick: ['push', 'new', {}],
  },
});

const Container = props.__engine.Components.Container;
const Spacer = props.__engine.Components.Spacer;
const Hr = props.__engine.Components.Hr;

return (
  <>
    <Container>
      {props.__engine.renderComponent('index.container', {
        header: 'Your event lists',
        forAccountId: props.__engine.accountId,
      })}
    </Container>
    <Hr />
    <Spacer />

    <Container>
      {props.__engine.renderComponent('index.container', {
        header: 'All event lists',
        search: true,
      })}
    </Container>
  </>
);
