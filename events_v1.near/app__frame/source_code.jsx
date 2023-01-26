const VERSION = '0.0.1';

const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events_app';
const ENTRY_ROUTE = 'index';

const accountId = context.accountId;
if (!accountId) {
  return 'Please connect your NEAR wallet to continue.';
}

console.log('props', props);

const env = {
  APP_OWNER,
  APP_NAME,
};

// TODO: get layers from URL
State.init({
  env,
  renderCycles: 0,
  layers: [
    {
      name: ENTRY_ROUTE,
      props: {},
      layout: 'default',
      layoutProps: {},
    },
  ],
});

if (!state) {
  return '';
}

function slugFromName(name) {
  // console.log('slugFromName', name);
  return name.split('.').join('__');
}

function layoutFromName(name) {
  // console.log('layoutFromName', name);
  return `${APP_OWNER}/widget/app__layouts__${slugFromName(name)}`;
}

const Select = styled.select`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #3e8e41;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Components = {
  Select,
  Button,
  Loading,
};

function push(name, props, layout, layoutProps) {
  console.log('push', name, props, layout, layoutProps);
  const layer = {
    name,
    props: props || {},
    layout: layout || 'default',
    layoutProps: layoutProps || {},
  };
  const newLayers = [...state.layers, layer];

  State.update({
    layers: newLayers,
  });

  // HACK: force a re-render
  State.update({
    renderCycles: state.renderCycles + 1,
  });
}

// pop from the stack, ensure we always have at least one layer
function pop() {
  State.update({
    layers: state.layers.length > 1 ? state.layers.slice(0, -1) : state.layers,
  });
}

const routing = {
  push,
  pop,
};

// TODO: layouting, render widgets in widgets for maximum awesomeness
function renderComponent(name, props, layout, layoutProps) {
  console.log('renderComponent', name, props, layout, layoutProps);
  const _layoutName = layout || 'default';
  const componentProps = {
    ...(props || {}),
    routing,
    engine: {
      renderComponent,
    },
    Components,
    accountId,
    VERSION,
    layout: _layoutName,
    layoutProps: layoutProps || {},
  };
  // const key = props && props.key ? props.key : name;

  const widget = (
    <Widget
      src={layoutFromName(_layoutName)}
      props={{
        ...componentProps,
        component: {
          src: `${APP_OWNER}/widget/${APP_NAME}__${slugFromName(name)}`,
          props: componentProps,
        },
      }}
    />
  );

  return widget;
}

return (
  <>
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        backgroundColor: 'white',
        top: 72, // sit right below the navbar
        left: 0,
        right: 0,
        bottom: 0,
        padding: 0,
        zIndex: 10000,
        overflow: 'auto',
      }}
    >
      <div data-state={JSON.stringify(state) id="app-state"}></div>
      {renderComponent(
        state.layers[state.layers.length - 1].name,
        state.layers[state.layers.length - 1].props,
        state.layers[state.layers.length - 1].layout,
        state.layers[state.layers.length - 1].layoutProps
      )}
    </div>
  </>
);
