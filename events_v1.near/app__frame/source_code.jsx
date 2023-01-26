const VERSION = '0.0.2';

const accountId = context.accountId;
if (!accountId) {
  return 'Please connect your NEAR wallet to continue.';
}

const appOwner = props.appOwner;
if (!appOwner) {
  return 'props.appOwner is required';
}

const appName = props.appName;
if (!appName) {
  return 'props.appName is required';
}

const entryRoute = props.entryRoute;
if (!entryRoute) {
  return 'props.entryRoute is required';
}

const entryProps = props.entryProps || {};
const entryLayout = props.entryLayout || 'default';
const entryLayoutProps = props.entryLayoutProps || {};

const env = {
  app: {
    owner: APP_OWNER,
    name: APP_NAME,
  },
  VERSION,
};

// TODO: get layers from URL
State.init({
  env,
  renderCycles: state ? state.renderCycles + 1 : 1,
  layers: [
    {
      name: entryRoute,
      props: entryProps,
      layout: entryLayout,
      layoutProps: entryLayoutProps,
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

function rerender() {
  // HACK: force a re-render
  State.update({
    renderCycles: state.renderCycles + 1,
  });
}

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

  rerender();
}

// pop from the stack, ensure we always have at least one layer
function pop() {
  State.update({
    layers: state.layers.length > 1 ? state.layers.slice(0, -1) : state.layers,
  });

  rerender();
}

const routing = {
  push,
  pop,
};

function renderComponent(name, props, layout, layoutProps) {
  console.log('renderComponent', name, props, layout, layoutProps);
  const _layoutName = layout || 'default';
  const componentProps = {
    ...(props || {}),
    routing,
    engine: {
      renderComponent,
      rerender,
    },
    Components,
    accountId,
    VERSION,
    layout: _layoutName,
    layoutProps: layoutProps || {},
  };
  const layoutKey = layoutProps && layoutProps.key ? layoutProps.key : null;
  const widgetKey = props && props.key ? props.key : name;
  const key = layoutKey || widgetKey;

  return (
    <Widget
      src={layoutFromName(_layoutName)}
      key={key}
      props={{
        ...componentProps,
        component: {
          src: `${APP_OWNER}/widget/${APP_NAME}__${slugFromName(name)}`,
          props: componentProps,
        },
      }}
    />
  );
}

return (
  <>
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        backgroundColor: 'white',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 0,
        zIndex: 10000,
        overflow: 'auto',
      }}
    >
      <div id="app-state" data-state={JSON.stringify(state)}></div>

      {renderComponent(
        state.layers[state.layers.length - 1].name,
        state.layers[state.layers.length - 1].props,
        state.layers[state.layers.length - 1].layout,
        state.layers[state.layers.length - 1].layoutProps
      )}
    </div>
  </>
);
