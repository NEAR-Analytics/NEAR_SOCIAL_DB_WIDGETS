const VERSION = '0.0.1';

const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events_app';
const EVENTS_CONTRACT = 'events_v1.near';
const ENTRY_ROUTE = 'index';

const accountId = context.accountId;
if (!accountId) {
  return 'Please connect your NEAR wallet to create an activity';
}

const env = {
  APP_OWNER,
  APP_NAME,
  EVENTS_CONTRACT,
};

State.init({
  env,
  layers: [
    {
      name: ENTRY_ROUTE,
      props: {},
    },
  ],
});

if (!state) {
  return 'Loading';
}

function slugFromName(name) {
  return name.split(/\.|\//gu).join('__');
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

const Components = {
  Select,
  Button,
};

const currentRoute = state.layers[state.layers.length - 1];

function buildRenderingInfo() {
  return {
    renderComponent,
  };
}

function push(name, props = {}) {
  State.update({
    layers: [
      ...state.layers,
      {
        name,
        props,
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

function renderComponent(name, props) {
  return (
    <Widget
      src={`${APP_OWNER}/widget/${APP_NAME}__${slugFromName(name)}`}
      props={{
        ...props,
        routing,
        ...buildRenderingInfo(),
        Components,
        accountId,
        env,
        VERSION,
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
            backgroundColor: 'red',
            top: 72, // sit right below the navbar
            left: 0,
            right: 0,
            bottom: 0,
            padding: 0,
            zIndex: Math.pow(10, 1 + index) + 10000,
          }}
        >
          {renderComponent(layer.name, layer.props)}
        </div>
      );
    })}
  </>
);
