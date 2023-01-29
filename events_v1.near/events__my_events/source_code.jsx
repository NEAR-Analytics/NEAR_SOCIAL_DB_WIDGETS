props.controller.setLayout('container', {
  title: 'My events',
  back: true,
});

return props.__engine.renderComponent('index.list_container', {
  forAccountId: props.__engine.accountId,
});
