const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events_app';
const EVENTS_CONTRACT = 'events_v1.near';

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
    name: '',
    props: {},
  },
});

if (!state) {
  return 'Loading';
}

const routeSlug = state.route.name.split('.').join('__');
const routeProps = state.route.props;

function transitionTo(name, props) {
  State.set({
    route: {
      name,
      props,
    },
  });
}

const engine = {
  transitionTo,
};

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
        src={`${APP_OWNER}/widget/${APP_NAME}__${routeSlug}?accountId=${accountId}`}
        props={{ ...routeProps, engine }}
      />
    </div>
  </>
);
