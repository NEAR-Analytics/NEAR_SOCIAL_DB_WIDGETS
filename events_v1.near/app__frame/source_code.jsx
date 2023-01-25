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
  route: {
    name: ENTRY_ROUTE,
    props: {},
  },
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

const rendering = {
  renderComponent,
  Components: {
    Select,
    Button,
  },
};

const routing = {
  transitionTo,
  currentRoute: state.route,
};

function transitionTo(name, props) {
  State.set({
    route: {
      name,
      props,
    },
  });
}

function renderComponent(name, props) {
  return (
    <Widget
      src={`${APP_OWNER}/widget/${APP_NAME}__${slugFromName(name)}`}
      props={{ ...props, routing, rendering, accountId, env, VERSION }}
    />
  );
}

return (
  <>
    {/* main widget */}
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        backgroundColor: 'red',
        top: 72,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {renderComponent(state.route.name, state.route.props)}
    </div>
  </>
);
