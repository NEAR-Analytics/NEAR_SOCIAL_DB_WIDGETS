const VERSION = '0.0.1';

const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events_app';
const ENTRY_ROUTE = 'index';

const accountId = context.accountId;
if (!accountId) {
  return 'Please connect your NEAR wallet to create an activity';
}

const env = {
  APP_OWNER,
  APP_NAME,
};

// TODO: get layers from URL
State.init({
  env,
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
  return name.split(/\.|\//gu).join('__');
}

function layoutFromName(name) {
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

const currentRoute = state.layers[state.layers.length - 1];

const engine = {
  renderComponent,
};

function push(name, props, layout, layoutProps) {
  State.update({
    layers: [
      ...state.layers,
      {
        name,
        props: props || {},
        layout: layout || 'default',
        layoutProps: layoutProps || {},
      },
    ],
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
  currentRoute,
};

// TODO: layouting, render widgets in widgets for maximum awesomeness
function renderComponent(name, props, layout, layoutProps) {
  const localLayoutName = layout || 'default';
  const localLayoutProps = layoutProps || {};
  const componentProps = {
    ...props,
    routing,
    engine,
    Components,
    accountId,
    env,
    VERSION,
  };

  return (
    <Widget
      src={layoutFromName(localLayoutName)}
      props={{
        ...componentProps,
        layout: localLayoutProps,
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
    {/* main widget */}
    {state.layers.map((layer, index) => {
      return (
        <div
          key={index}
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
            zIndex: Math.pow(10, 1 + index) + 10000,
            overflow: 'auto',
          }}
        >
          {renderComponent(
            layer.name,
            layer.props,
            layer.layout,
            layer.layoutProps
          )}
        </div>
      );
    })}
  </>
);
