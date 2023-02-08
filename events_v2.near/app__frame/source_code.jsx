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
 * Animation
 * */
const FadeIn = styled.keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const SlideInLeft = styled.keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

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

  Hr: styled.div`
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
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

  FullActionButton: styled.button`
    width: 100%;
    padding: 0.5rem;
    margin: 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #ccc;
  `,

  FormLabel: styled.label`
    width: 100%;
    color: #666;
    padding: 0.5rem 0;
    margin: 0.5rem 0 0 0;
    box-sizing: border-box;
  `,

  GridContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: flex-start;

    width: auto;
    margin-left: -20px;
    margin-right: -20px;

    & > * {
      margin: 20px 20px;
      min-width: 320px;
      max-width: ${({ itemWidth }) => itemWidth || '540px'};
      width: 100%;
      flex-grow: 3;
      flex-shrink: 3;

      animation: ${SlideInLeft} 0.3s ease-in-out;
    }
  `,

  HorizontalScroll: styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;
    justify-content: flex-start;

    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;

    & > * {
      margin-right: 20px;
      min-width: 20px;
      max-width: ${({ itemWidth }) => itemWidth || '540px'};
      width: 100%;
      flex-grow: 3;
      flex-shrink: 0;

      animation: ${SlideInLeft} 0.3s ease-in-out;
    }

    & > *:last-child {
      margin-right: 0;
    }

    @media (max-width: 768px) {
      & > * {
        width: 40%;
        max-width: 40%;
      }
    }
  `,

  Card: styled.div`
    display: flex;
    flex-direction: ${(args) => orientation2FlexDirection(args) || 'column'};
    flex-wrap: ${(args) => orientation2FlexWrap(args) || 'wrap'};
    align-items: stretch;
    justify-content: stretch;
    padding: 0;
    background-color: #ffffff;
    border-radius: 4px 4px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    border: 0.1vw solid #cccccc;

    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
      box-shadow: 5px 0 15px -2px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
      flex-direction: column !important;
    }
  `,

  CardHeaderImage: styled.div`
    height: auto;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 2px 2px 0 0;
    border-bottom: 0.1vw solid #cccccc;
    flex-shrink: 0;
    flex-grow: 0;
  `,

  CardBody: styled.div`
    width: 100%;
    height: auto;
    flex-grow: 100;
    flex-shrink: 0;
    padding: 1vw calc(max(0.5rem, 0.5vw));
  `,

  CardFooter: styled.div`
    font-size: ${({ small }) => (small ? '0.6rem' : '0.8vw')};
    font-weight: 400;
    margin: 0;
    padding: calc(max(0.5rem, 0.5vw));
    height: 42px;
    flex-grow: 0;
    flex-shrink: 0;
    width: 100%;
    border-top: 0.1vw solid #cccccc;
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

const ENV = { appOwner, appName, VERSION };

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

function orientation2FlexDirection({ orientation }) {
  switch (orientation) {
    case 'horizontal':
      return 'row';
    case 'vertical':
      return 'column';
    default:
      return 'column';
  }
}

function orientation2FlexWrap({ orientation }) {
  switch (orientation) {
    case 'horizontal':
      return 'nowrap';
    case 'vertical':
      return 'wrap';
    default:
      return 'nowrap';
  }
}

function sessionGet(env, prop, defaultValue) {
  return (
    SessionState.get(`${env.appOwner}.${env.appName}.${prop}`) || defaultValue
  );
}
function sessionSet(env, prop, value) {
  return SessionState.set(`${env.appOwner}.${env.appName}.${prop}`, value);
}

function storageGet(env, prop, defaultValue) {
  return Storage.get(`${env.appOwner}.${env.appName}.${prop}`) || defaultValue;
}
function storageSet(env, prop, value) {
  return Storage.set(`${env.appOwner}.${env.appName}.${prop}`, value);
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

function fetchPathOptions(env, path) {
  const nameParts = path.split(':');
  if (nameParts.length === 1) {
    return {
      owner: env.appOwner,
      name: env.appName,
      slug: slugFromName(nameParts[0]),
    };
  }
  if (nameParts.length === 2) {
    return {
      owner: env.appOwner,
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

function widgetPathFromName(env, widgetName) {
  const { owner, name, slug } = fetchPathOptions(env, widgetName);
  console.log('widgetPathFromName', {
    owner,
    name,
    slug,
    widgetName,
    path: `${owner}/widget/${name}__${slug}`,
  });
  return `${owner}/widget/${name}__${slug}`;
}

function layoutPathFromName(env, layoutName) {
  return widgetPathFromName(env, layoutName);
}

function rerender() {
  // HACK: force a re-render
  State.update({
    renderCycles: state.renderCycles + 1,
  });
}

function push(env, name, props) {
  const layer = {
    name,
    props: props || {},
    appOwner: env.appOwner,
    appName: env.appName,
  };
  const newLayers = [...state.layers, layer];

  persistRoutingInformation(newLayers);

  State.update({
    layers: newLayers,
  });
}

function replace(env, name, props) {
  const layer = {
    name,
    props: props || {},
    appOwner: env.appOwner,
    appName: env.appName,
  };
  const newLayers = [...state.layers.slice(0, -1), layer];

  persistRoutingInformation(newLayers);

  State.update({
    layers: newLayers,
  });
}

// pop from the stack, ensure we always have at least one layer
function pop(/*_env*/) {
  const newLayers =
    state.layers.length > 1 ? state.layers.slice(0, -1) : state.layers;

  persistRoutingInformation(newLayers);

  State.update({
    layers: newLayers,
  });

  // rerender();
}

function dirtyEval(env, args) {
  const method = args[0];
  const key = args[1];
  const mArgs = args.slice(2);

  switch (method) {
    case 'push':
      return push(env, key, mArgs[0]);
    case 'replace':
      return replace(env, key, mArgs[0]);
    case 'pop':
      return pop(env);
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

function numberToMonth(number, format) {
  const month = parseInt(number, 10);
  const map = [
    ['Jan', 'January'],
    ['Feb', 'February'],
    ['Mar', 'March'],
    ['Apr', 'April'],
    ['May', 'May'],
    ['Jun', 'June'],
    ['Jul', 'July'],
    ['Aug', 'August'],
    ['Sep', 'September'],
    ['Okt', 'Oktober'],
    ['Nov', 'November'],
    ['Dec', 'December'],
  ];

  if (format === 'long') {
    return map[month - 1][1];
  }
  return map[month - 1][0];
}

function dayWithSuffix(day) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const value = parseInt(day, 10);
  const suffix = suffixes[value % 10 > 3 ? 0 : value % 10];
  return `${value}${suffix}`;
}

function formatDate(date, format) {
  if (date === null || date === undefined) {
    console.error('formatDate', 'date is null or undefined', date, format);
    return '';
  }
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
    Mshort: numberToMonth(dateString.substring(5, 7)),
    Mlong: numberToMonth(dateString.substring(5, 7), 'long'),
    Dst: dayWithSuffix(dateString.substring(8, 10)),
  };

  return format.replace(
    /\{\{\s*(?<part>YYYY|YY|MM|DD|hh|mm|ss|Mshort|Mlong|Dst)\s*\}\}/gu,
    (_match, part) => {
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
  return COST_NEAR_PER_BYTE * (bytes + NEAR_STORAGE_BYTES_SAFTY_OFFSET);
}

function contractCall(contractName, methodName, args) {
  const cost = calculateStorageCost(args);
  // console.log('contractCall', { contractName, methodName, args, cost });
  Near.call(contractName, methodName, args || {}, TGAS_300, cost);
}

function contractView(contractName, methodName, args) {
  // console.log('contractView', { contractName, methodName, args });
  return Near.view(contractName, methodName, args || {});
}

function loading(displayText) {
  return <>{displayText || '...'}</>;
}

function mergeEnv(env, newEnv) {
  return {
    ...env,
    // add all keys from env which are not null or undefined
    ...Object.entries(newEnv || {}).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {}),
  };
}

function renderComponent(name, props, env) {
  const widgetEnv = mergeEnv(ENV, env);

  const _sessionGet = (...args) => {
    return sessionGet(widgetEnv, ...args);
  };
  const _sessionSet = (...args) => {
    return sessionSet(widgetEnv, ...args);
  };
  const _storageGet = (...args) => {
    return storageGet(widgetEnv, ...args);
  };
  const _storageSet = (...args) => {
    return storageSet(widgetEnv, ...args);
  };

  const _layoutPathFromName = (path) => {
    return layoutPathFromName(widgetEnv, path);
  };
  const _widgetPathFromName = (path) => {
    return widgetPathFromName(widgetEnv, path);
  };

  const _push = (_name, _props) => {
    return push(widgetEnv, _name, _props);
  };
  const _pop = () => {
    return pop(widgetEnv);
  };
  const _replace = (_name, _props) => {
    return replace(widgetEnv, _name, _props);
  };

  const _renderComponent = (_name, _props, _env) => {
    return safeRender(_name, _props, mergeEnv(widgetEnv, _env));
  };

  const _dirtyEval = (args) => {
    return dirtyEval(widgetEnv, args);
  };

  const engine = {
    env: widgetEnv,
    accountId,

    loading,
    rerender,
    push: _push,
    pop: _pop,
    replace: _replace,
    sessionGet: _sessionGet,
    sessionSet: _sessionSet,
    storageGet: _storageGet,
    storageSet: _storageSet,
    layoutPathFromName: _layoutPathFromName,
    widgetPathFromName: _widgetPathFromName,

    renderComponent: _renderComponent,

    Components,

    helpers: {
      propIsRequiredMessage,
      calculateStorageCost,
      formatDate,
    },

    hacks: {
      dirtyEval: _dirtyEval,
    },

    TGAS_300,

    contract: {
      call: contractCall,
      view: contractView,
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

function safeRender(_name, _props, _customEnv) {
  try {
    return renderComponent(_name, _props, _customEnv);
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
          {safeRender(layer.name, layer.props, {
            appOwner: layer.appOwner,
            appName: layer.appName,
          })}
        </AppLayer>
      );
    })}
  </>
);
