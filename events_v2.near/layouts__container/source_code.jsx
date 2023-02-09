const NAVBAR_HEIGHT = 64;
const NAVBAR_OFFSET_TOP = 0;

const title = props.title || '';

const Pulse = styled.keyframes`
  0% {
    transform: scale(0.975);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.975);
  }
`;

const Navbar = styled.div`
  min-height: ${NAVBAR_HEIGHT}px;
  position: fixed;
  top: ${NAVBAR_OFFSET_TOP}px;
  width: 100%;
  background-color: rgba(44, 44, 84, 0.85);
  backdrop-filter: blur(32px) saturate(180%);
  webkitbackdropfilter: blur(32px) saturate(180%);
  z-index: 99999999;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const NavPrimaryButton = styled.button`
  background-color: transparent;
  user-select: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.25rem;
  transition: all 1s ease-in-out;
  margin-left: 8px;
  cursor: pointer;

  border-radius: 8px;
  border: 1px solid white;
  box-shadow: 0 0 2px 1px rgb(0, 0, 0, 0.3),
    0 0 89px 2px rgb(255, 255, 255, 0.4);

  transform: scale(0.975);

  margin: 0 12px;

  &:hover {
    /* darker and transparent */
    background-color: rgba(44, 44, 84, 0.85);

    animation: ${Pulse} 2s infinite;
  }

  @media (max-width: 768px) {
    font-size: 1.15rem;
    padding: 6px 14px;
    margin: 0 8px;
  }
`;

const NavbarTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  padding: 0;
  color: white;
  flex-grow: 1;
  word-break: break-all;
  margin: 0 12px;

  text-align: ${() => {
    return props.primaryAction || props.back ? 'left' : 'center';
  }};

  @media (max-width: 768px) {
    font-size: 1.15rem;

    margin: 0 8px;
  }
`;

const NavbarBackButton = styled.button`
  background-color: transparent;
  user-select: none;
  color: white;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  width: ${NAVBAR_HEIGHT}px;

  flex-grow: 0;
  flex-shrink: 0;
`;

const navbar = (
  <Navbar className="navbar">
    {props.back ? (
      <NavbarBackButton
        type="button"
        tabIndex={0}
        onClick={() => {
          props.__engine.pop();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            props.__engine.pop();
          }
        }}
      >
        <i className="bi bi-chevron-left"></i>
      </NavbarBackButton>
    ) : null}

    <NavbarTitle>{title}</NavbarTitle>

    {props.primaryAction ? (
      <NavPrimaryButton
        type="button"
        tabIndex={0}
        onClick={() => {
          props.__engine.hacks.dirtyEval(props.primaryAction.onClick);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            props.__engine.hacks.dirtyEval(props.primaryAction.onClick);
          }
        }}
      >
        {props.primaryAction.label}
      </NavPrimaryButton>
    ) : null}
  </Navbar>
);

return (
  <div
    style={{
      width: '100vw',
      minHeight: '100%',
      backgroundColor: 'white',
      overflow: 'auto',
    }}
  >
    {navbar}

    <div
      style={{
        marginTop: NAVBAR_HEIGHT,
      }}
    >
      {props.__engine.renderComponent(
        props.component.name,
        props.component.props
      )}
    </div>
  </div>
);
