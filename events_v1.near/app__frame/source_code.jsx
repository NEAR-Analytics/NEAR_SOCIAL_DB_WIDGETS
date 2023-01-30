const VERSION = '0.2.0';

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
 *     - e.g. app_namecomponent1
 *     - e.g. app_namecomponent1__subcomponent
 *  - Each widget can have a layout
 *    - layouts are also widgets
 *   - layouts are named as follows:
 *    - you choose a layout like 'my_layout'
 *   - In order to use the layout in your app, you must upload it to your account with the name: `my_app__layouts__my_layout`
 *
 *
 *  Functions available to widgets:
 *  - TODO: document
 *
 */

/**
 * Adjust these:
 * */

const PROP_IS_REQUIRED_MESSAGE = 'props.{prop} is required';
const PLEASE_CONNECT_WALLET_MESSAGE =
  'Please connect your NEAR wallet to continue.';

const ContainerPaddingHorizontal = 'calc(max(28px, 1.6vw))';

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
  font-size: calc(max(32px, 2.5vw));
  color: black;
`;

const Container = styled.div`
  padding-left: ${ContainerPaddingHorizontal};
  padding-right: ${ContainerPaddingHorizontal};
  padding-top: 12px;
  padding-bottom: 12px;
`;

const InfoBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0px ${ContainerPaddingHorizontal};
  border-bottom: 1px solid #e0e0e0;
`;

const InfoBarItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  padding: 8px 0;
`;

const InfoBarLink = styled.a`
  font-size: 16px;
  color: #424242;
  text-decoration: none;
  margin-right: 12px;
  padding: 8px 0;

  &:hover {
    text-decoration: underline;
  }

  &:last-child {
    margin-right: 0;
  }

  &:visited {
    color: #424242;
  }

  &:active {
    color: #424242;
  }
`;

const TextHeader = styled.div`
  font-size: 20px;
  color: #424242;
`;

const InlineTag = styled.div`
  display: inline-block;
  background-color: #e0e0e0;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  margin-left: 8px;
`;

const Text = styled.div`
  font-size: 16px;
  color: #424242;
  margin-right: 8px;
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

const rootRoute = {
  name: entryRoute,
  props: entryProps,
};

if (!state) {
  State.init({
    renderCycles: state ? state.renderCycles + 1 : 1,
    layers: [rootRoute],
  });
  return 'Loading...';
}

const env = {
  app: {
    owner: appOwner,
    name: appName,
  },
  VERSION,
};

const AppState = {
  _state: {},
  set: (prop, value) => {
    AppState._state[prop] = value;
    return true;
  },
  get: (prop) => {
    return AppState._state[prop];
  },
};

function appStateGet(prop, defaultValue) {
  return AppState.get(`${appOwner}.${appName}.${prop}`) || defaultValue;
}
function appStateSet(prop, value) {
  return AppState.set(`${appOwner}.${appName}.${prop}`, value);
}

function storageGet(prop, defaultValue) {
  return Storage.get(`${appOwner}.${appName}.${prop}`) || defaultValue;
}
function storageSet(prop, value) {
  return Storage.set(`${appOwner}.${appName}.${prop}`, value);
}

function restoreRoutes() {
  const info = storageGet('routing', null);
  if (info === null || info === undefined) {
    return;
  }

  const layers = state.layers;
  if (
    layers &&
    Array.isArray(info) &&
    JSON.stringify(info) !== JSON.stringify(layers)
  ) {
    State.update({
      layers: info,
    });
  }
}

restoreRoutes();

function persistRoutingInformation(newState) {
  storageSet('routing', newState);
}

function slugFromName(name) {
  return name.split('.').join('__').split('-').join('_');
}

function widgetPathFromName(name) {
  return `${appOwner}/widget/${appName}__${slugFromName(name)}`;
}

function layoutPathFromName(name) {
  return widgetPathFromName(`layouts.${name}`);
}

function rerender() {
  // HACK: force a re-render
  State.update({
    renderCycles: state.renderCycles + 1,
  });
}

function push(name, props) {
  const layer = {
    name,
    props: props || {},
  };
  const newLayers = [...state.layers, layer];

  persistRoutingInformation(newLayers);

  State.update({
    layers: newLayers,
  });

  // rerender();
}

function replace(name, props) {
  console.log('replace', name, props);
  const layer = {
    name,
    props: props || {},
  };
  const newLayers = [...state.layers.slice(0, -1), layer];

  persistRoutingInformation(newLayers);

  State.update({
    layers: newLayers,
  });

  // rerender();
}

// pop from the stack, ensure we always have at least one layer
function pop() {
  const newLayers =
    state.layers.length > 1 ? state.layers.slice(0, -1) : state.layers;

  persistRoutingInformation(newLayers);

  State.update({
    layers: newLayers,
  });

  rerender();
}

function dirtyEval(args) {
  const method = args[0];
  const key = args[1];
  const mArgs = args.slice(2);

  let result = null;
  switch (method) {
    case 'push':
      result = push(key, mArgs[0]);
    break;
    case 'replace':
      result = replace(key, mArgs[0]);
      break;
    case 'pop':
      result = pop();
      break;
    default:
      throw new Error(`Unknown method ${method}`);
  }
}

function renderComponent(name, props) {
  const engine = {
    env,
    accountId,

    push,
    pop,
    replace,
    rerender,
    appStateGet,
    appStateSet,
    storageGet,
    storageSet,
    layoutPathFromName,
    widgetPathFromName,

    renderComponent: safeRender,

    Components: {
      Select,
      Button,
      Loading,
      PageTitle,
      Container,
      InfoBar,
      InfoBarItem,
      InfoBarLink,
      TextHeader,
      InlineTag,
      Text,
    },

    helpers: {
      propIsRequiredMessage,
    },

    hacks: {
      dirtyEval,
    },
  };

  const controllerProps = {
    __engine: engine,

    component: {
      name: name,
      props: props,
    },
  };

  return (
    <Widget
      src={`${appOwner}/widget/app__layout_controller`}
      key={props && props.key ? props.key : name}
      props={controllerProps}
    />
  );
}

function safeRender(_name, _props) {
  try {
    return renderComponent(_name, _props);
  } catch (err) {
    console.log(err);
    return (
      <div>
        Failed to render component <strong>{_name}</strong> with props:{' '}
        <pre>{JSON.stringify(_props, null, 4)}</pre>
        <br />
        <pre>{err.toString()}</pre>
        <br />
      </div>
    );
  }
}

return (
  <>
    <div id="app-state" data-state={JSON.stringify(state)}></div>

    {/* state reset button */}
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 9999,
        padding: 8,
        backgroundColor: 'transparent',
      }}
    >
      <Button
        onClick={() => {
          storageSet('routing', [rootRoute]);
          State.update({
            layers: [rootRoute],
          });
        }}
      >
        Reset
      </Button>
    </div>

    {state.layers.map((layer, index) => {
      return (
        <div
          key={index}
          style={{
            width: '100vw',
            minHeight: '100vh',
            backgroundColor: 'transparent',
            zIndex: index,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'auto',
          }}
        >
          {safeRender(layer.name, layer.props)}
        </div>
      );
    })}
  </>
);
