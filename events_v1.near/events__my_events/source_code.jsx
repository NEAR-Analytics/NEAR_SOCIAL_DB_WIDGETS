console.log('props', props);

props.__layout.setLayout('container', {
  title: 'My events',
});

return props.__engine.renderComponent('index.list_container', {
  forAccountId: props.__engine.accountId,
});
