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

const routeSlug = slugFromName(state.route.name);
const routeProps = {
  ...state.route.props,
};

const rendering = {
  renderComponent,
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

function slugFromName(name) {
  return name.split('.').join('__');
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
