const VERSION = '0.1.0';

/**
 *  NEAR Social App
 *
 *  This is the main app component that is used to render the app.
 *
 *
 *  WHY?
 *  - DRY: we don't want to have to copy/paste the same code into every app
 *  - Speed: we want to be able to build apps quickly
 *  - Functionality: we want to be able to add functionality to all apps at once
 *
 *
 *  HOW?
 *  this app provides common functionality often needed in apps
 *  - routing

 *  - layout management
 *
 *  Requirements:
 *  - Fork the following widgets into your account:
 *    - app__layouts__default
 *    - app__frame (this component)
 *  - You should also take a look at: https://github.com/NEARFoundation/events-platform
 *    as it provides a lot of the functionality you need to build an app, it provides:
 *      - an opinionated way to build apps
 *        - directory structure
 *        - naming conventions
 *      - a way to build apps quickly
 *        - development tools (dev server, deploy script)
 *        - env var injection
 *      - a sample app
 *
 *
 *  This component is responsible for:
 *  - Loading the app's state/environment
 *  - Rendering the app's layouts
 *  - Rendering the app's components
 *
 *  It follows conventions:
 *  - The app's environment is loaded from the props
 *    - props.appOwner
 *    - props.appName
 *  - An app is a collection of widgets
 *  - each widget must be namespaced by the app's owner and name
 *     Widgets are named as follows:
 *       - you choose an app_name like 'my_app'
 *       - you choose a widget like 'my_widget'
 *       - app, widgets and subwidgets are separated by '__'
 *       - In order to use the widget in your app, you must upload it to your account with the name: `my_app__my_widget`
 *     - e.g. app_name__component1
 *     - e.g. app_name__component1__subcomponent
 *  - Each widget can have a layout
 *    - lyouts can be passed to the renderComponent function
 *      - calling `renderComponent('parent.subcomponent', {}, 'my_layout', { someLayoutProp: 'someValue' })`
 *        - will render the widget 'parent' using the layout 'my_layout'
 *        - the layout will be passed the props: { someLayoutProp: 'someValue' }
 *        - the corresponding layout widget must be uploaded to your account with the name: `app__layouts__my_layout`
 *           - NOTE: the layouts can be shared across apps, so they are namespaced within 'app' **not** the app's name
 *        - the corresponding widget must be uploaded to your account with the name: `my_app__my_widget__subcomponent`
 *    - layouts are also rendered as widgets and get passed the same props as the widget they are rendering
 *
 *
 *
 *  Functions available to widgets:
 *
 *
 *  @param {String} name - the name of the widget to render
 *  @param {Object} props - the props to pass to the widget
 *  @param {String} layout - the name of the layout to use
 *  @param {Object} layoutProps - the props to pass to the layout
 *  available in: props.engine
 *  renderComponent(name, props, layout, layoutProps)
 *    renders a widget with the given name and props within the given layout,
 *    use this instead of <Widget src="" />
 *
 *
 *  @param {String} name - the name of the widget to render
 *  @param {Object} props - the props to pass to the widget
 *  @param {String} layout - the name of the layout to use
 *  @param {Object} layoutProps - the props to pass to the layout
 *  available in: props.routing
 *  push(name, props, layout, layoutProps)
 *    pushes a new layer onto the stack of layers to render
 *    this will cause the app to render a new layer on top of the current layer
 *
 *
 *  available in: props.routing
 *  pop()
 *    pops the current layer off the stack of layers to render.
 *    Functions the same as the back button
 *
 */

/**
 * Adjust these:
 * */

const PROP_IS_REQUIRED_MESSAGE = 'props.{prop} is required';
const PLEASE_CONNECT_WALLET_MESSAGE =
  'Please connect your NEAR wallet to continue.';

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

const PageTitle = styled.h1`
  font-size: 2em;
  text-align: center;
  color: palevioletred;
`;
/**
 *   I suggest you don't edit anything below this line
 * */

const accountId = context.accountId;
if (!accountId) {
  return PLEASE_CONNECT_WALLET_MESSAGE;
}

function propIsRequiredMessage(prop) {
  return PROP_IS_REQUIRED_MESSAGE.replace('{prop}', prop);
}

const appOwner = props.appOwner;
if (!appOwner) {
  return propIsRequiredMessage('appOwner');
}

const appName = props.appName;
if (!appName) {
  return propIsRequiredMessage('appName');
}

const entryRoute = props.entryRoute;
if (!entryRoute) {
  return propIsRequiredMessage('entryRoute');
}

const entryProps = props.entryProps || {};
const entryLayout = props.entryLayout || 'default';
const entryLayoutProps = props.entryLayoutProps || {};

const env = {
  app: {
    owner: appOwner,
    name: appName,
  },
  VERSION,
};

function storageGet(prop, defaultValue) {
  return Storage.get(`${appOwner}.${appName}.${prop}`) || defaultValue;
}
function storageSet(prop, value) {
  return Storage.set(`${appOwner}.${appName}.${prop}`, value);
}

function loadRoutingInfo() {
  const info = storageGet('routing', null);
  console.log(info);
  return info;
}

const lastRoute = loadRoutingInfo();
const hasLastRouteAndIsDifferent =
  lastRoute &&
  lastRoute.name !== entryRoute &&
  lastRoute.props !== entryProps &&
  lastRoute.layout !== entryLayout &&
  lastRoute.layoutProps !== entryLayoutProps;

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
    hasLastRouteAndIsDifferent ? lastRoute : null,
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
  return `${appOwner}/widget/app__layouts__${slugFromName(name)}`;
}

function rerender() {
  // HACK: force a re-render
  State.update({
    renderCycles: state.renderCycles + 1,
  });
}

function persistRoutingInformation(currentRoute) {
  storageSet('routing', currentRoute);
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

  persistRoutingInformation(newLayers[newLayers.length - 1]);

  State.update({
    layers: newLayers,
  });

  rerender();
}

// pop from the stack, ensure we always have at least one layer
function pop() {
  const newLayers =
    // eslint-disable-next-line no-magic-numbers
    state.layers.length > 1 ? state.layers.slice(0, -1) : state.layers;

  persistRoutingInformation(newLayers[newLayers.length - 1]);

  State.update({
    layers: newLayers,
  });

  rerender();
}

function renderComponent(name, props, layout, layoutProps) {
  console.log('renderComponent', name, props, layout, layoutProps);
  const _layoutName = layout || 'default';
  const componentProps = {
    ...(props || {}),
    routing: {
      push,
      pop,
    },
    engine: {
      renderComponent,
      rerender,
    },
    Components: {
      Select,
      Button,
      Loading,
      PageTitle,
    },
    helpers: {
      propIsRequiredMessage,
    },
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
          src: `${appOwner}/widget/${appName}__${slugFromName(name)}`,
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
