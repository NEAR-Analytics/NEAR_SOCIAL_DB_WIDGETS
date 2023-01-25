const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events_app';
const EVENTS_CONTRACT = 'events_v1.near';

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
})

if(!state){return "Loading"}

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



return <>
  {/* main widget */}
  
  <Widget
    src={`${APP_OWNER}/widget/${APP_NAME}__${routeSlug}?accountId=${accountId}`}
    props={{...routeProps, {engine: {transitionTo}}}}}
  />

</>;
