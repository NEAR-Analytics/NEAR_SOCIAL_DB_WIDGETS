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

const routeSlug = slugFromName(state.route.name);
const routeProps = {
  ...state.route.props,
};

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
      props={{ ...props, routing, rendering }}
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
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'red',
      }}
    >
      <Widget
        src={`${APP_OWNER}/widget/${APP_NAME}__${routeSlug}`}
        props={{ ...routeProps, routing }}
      />
    </div>
  </>
);
