/* eslint no-magic-numbers: 0 */

const VERSION = '0.3.0';

/**
 *  NEAR Social App
 *  Docs: https://github.com/NEARFoundation/events-platform
 *
 */

/**
 * Adjust these:
 * */

const NEAR_STORAGE_BYTES_SAFTY_OFFSET = 42;
const PROP_IS_REQUIRED_MESSAGE = 'props.{prop} is required';
const PLEASE_CONNECT_WALLET_MESSAGE =
  'Please connect your NEAR wallet to continue.';

const ContainerPaddingHorizontal = 'calc(max(28px, 1.6vw))';
const ContainerPaddingVertical = 'calc(max(12px, 1.2vw))';

/**
 * Components
 * */

const Components = {
  Select: styled.select`
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
  `,

  Button: styled.button`
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
  `,

  Loading: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  `,

  PageTitle: styled.h1`
    font-size: calc(max(32px, 2.5vw));
    color: black;
  `,

  Container: styled.div`
    padding-left: ${ContainerPaddingHorizontal};
    padding-right: ${ContainerPaddingHorizontal};
    padding-top: ${ContainerPaddingVertical};
    padding-bottom: ${ContainerPaddingVertical};
  `,

  ContainerHeader: styled.div`
    font-size: 24px;
    color: #424242;
    padding: ${ContainerPaddingVertical} 0;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  `,

  InfoBar: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0px ${ContainerPaddingHorizontal};
    border-bottom: 1px solid #e0e0e0;
  `,

  InfoBarItem: styled.div`
    display: flex;
    align-items: center;
    margin-right: 12px;
    padding: 8px 0;
  `,

  InfoBarLink: styled.a`
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
  `,

  TextHeader: styled.div`
    font-size: 20px;
    color: #424242;
  `,

  InlineTag: styled.div`
    display: inline-block;
    background-color: #e0e0e0;
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: 8px;
    margin-left: 8px;
  `,

  Text: styled.div`
    font-size: 16px;
    color: #424242;
    margin-right: 8px;
  `,

  ValidationError: styled.div`
    color: #c00;
    font-size: 0.8rem;
    margin: 0.5rem 0 0 0;
  `,
};

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

const DEBUG = props.DEBUG || false;

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

const COST_NEAR_PER_BYTE = Math.pow(10, 20);
const TGAS_300 = '300000000000000';

const SessionState = {
  _state: {},
  set: (prop, value) => {
    SessionState._state[prop] = value;
    return true;
  },
  get: (prop) => {
    return SessionState._state[prop];
  },
};

function sessionGet(prop, defaultValue) {
  return SessionState.get(`${appOwner}.${appName}.${prop}`) || defaultValue;
}
function sessionSet(prop, value) {
  return SessionState.set(`${appOwner}.${appName}.${prop}`, value);
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

function fetchPathOptions(path) {
  const nameParts = path.split(':');
  if (nameParts.length === 1) {
    return {
      owner: appOwner,
      name: appName,
      slug: slugFromName(nameParts[0]),
    };
  }
  if (nameParts.length === 2) {
    return {
      owner: appOwner,
      name: nameParts[0],
      slug: slugFromName(nameParts[1]),
    };
  }
  if (nameParts.length === 3) {
    return {
      owner: nameParts[0],
      name: nameParts[1],
      slug: slugFromName(nameParts[2]),
    };
  }
  throw new Error(`Invalid path: ${path}`);
}

function widgetPathFromName(widgetName) {
  const { owner, name, slug } = fetchPathOptions(widgetName);
  return `${owner}/widget/${name}__${slug}`;
}

function layoutPathFromName(layoutName) {
  return widgetPathFromName(layoutName);
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

  switch (method) {
    case 'push':
      return push(key, mArgs[0]);
    case 'replace':
      return replace(key, mArgs[0]);
    case 'pop':
      return pop();
    default:
      throw new Error(`Unknown method ${method}`);
  }
}

function isDate(value) {
  // we have no instanceof or typeof, so we check for the interface
  try {
    value.getFullYear();
    value.getMonth();
    value.getDate();
    value.getHours();
    value.getMinutes();
    value.getSeconds();
    return true;
  } catch (e) {
    return false;
  }
}

function formatDate(date, format) {
  const properDate = isDate(date) ? date : new Date(date);

  const dateString = properDate.toISOString();

  const parts = {
    YYYY: dateString.substring(0, 4),
    YY: dateString.substring(2, 4),
    MM: dateString.substring(5, 7),
    DD: dateString.substring(8, 10),
    hh: dateString.substring(11, 13),
    mm: dateString.substring(14, 16),
    ss: dateString.substring(17, 19),
  };

  return format.replace(
    /\{\{\s*(?<part>YYYY|YY|MM|DD|hh|mm|ss)\s*\}\}/gu,
    (match, part) => {
      return parts[part];
    }
  );
}

// https://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript
function byteLength(str) {
  // returns the byte length of an utf8 string
  var s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    let code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) {
      s++;
    } else if (code > 0x7ff && code <= 0xffff) {
      s += 2;
    }
    if (code >= 0xdc00 && code <= 0xdfff) {
      i--;
    } //trail surrogate
  }
  return s;
}

function calculateStorageCost(value) {
  // get number of bytes without TextEncoder or Blob
  const bytes = byteLength(JSON.stringify(value));
  const estimated =
    COST_NEAR_PER_BYTE * (bytes + NEAR_STORAGE_BYTES_SAFTY_OFFSET);
  console.log('calculateStorageCost', {
    bytes,
    estimated,
    const: NEAR_STORAGE_BYTES_SAFTY_OFFSET,
  });
  return COST_NEAR_PER_BYTE * (bytes + NEAR_STORAGE_BYTES_SAFTY_OFFSET);
}

function contractCall(contractName, methodName, args) {
  const cost = calculateStorageCost(args);
  Near.call(contractName, methodName, args, TGAS_300, cost);
}

function renderComponent(name, props) {
  const engine = {
    env,
    accountId,

    push,
    pop,
    replace,
    rerender,
    sessionGet,
    sessionSet,
    storageGet,
    storageSet,
    layoutPathFromName,
    widgetPathFromName,

    renderComponent: safeRender,

    Components,

    helpers: {
      propIsRequiredMessage,
      calculateStorageCost,
      formatDate,
    },

    hacks: {
      dirtyEval,
    },

    TGAS_300,

    contract: {
      call: contractCall,
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

const FadeIn = styled.keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const AppLayer = styled.div`
  animation: ${FadeIn} 0.3s ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: ${(props) => props.delay};
  animation-duration: ${(props) => props.duration};
  width: 100vw;
  min-height: 100vh;
  background-color: transparent;
  z-index: ${(props) => props.zIndex};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  opacity: 0;

  backdrop-filter: ${(props) => {
    return props.backdropFilter;
  }};
  webkit-backdrop-filter: ${(props) => {
    return props.backdropFilter;
  }};

  transition: backdrop-filter 0.3s ease-in-out;
  transition-delay: ${(props) => props.transitionDelay};
`;

// have to deconstruct Components here because of a bug in the VM.
// It cannot render <Components.Button /> :(
const { Button } = Components;

return (
  <>
    <div id="app-state" data-state={JSON.stringify(state)}></div>

    {/* state reset button */}
    {DEBUG ? (
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
    ) : null}

    {state.layers.map((layer, index) => {
      const isLast = index === state.layers.length - 1;

      return (
        <AppLayer
          key={index}
          delay={isLast ? '0.0s' : '0.2s'}
          duration={isLast ? '0.3s' : '1s'}
          transitionDelay={isLast ? '0s' : '1s'}
          backdropFilter={
            isLast
              ? 'blur(16px) saturate(140%) brightness(80%)'
              : 'blur(0px) saturate(100%) brightness(100%)'
          }
          zIndex={index + 100}
        >
          {safeRender(layer.name, layer.props)}
        </AppLayer>
      );
    })}
  </>
);
