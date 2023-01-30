const NAVBAR_HEIGHT = 64;
const NAVBAR_OFFSET_TOP = 0;

const title = props.title || '';
const dropdownItems = props.dropdownItems || [];

const dropdownElement =
  dropdownItems && dropdownItems.length > 0 ? (
    <>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainMenuDropdown"
        aria-controls="mainMenuDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mainMenuDropdown">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {dropdownItems.map((item, idx) => {
            return props.__engine.renderComponent(item.name, {
              ...item.props,
              key: `dropdown_item_${item.name}_${idx}`,
            });
          })}
        </ul>
      </div>
    </>
  ) : null;

const NavPrimaryButton = styled.button`
  background-color: #2c2c54;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition: all 0.5s ease;
  border-radius: 4px;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    background-color: #2c2c54;
  }
`;

const navbar = (
  <div
    className="navbar navbar-expand-lg navbar-dark"
    style={{
      minHeight: NAVBAR_HEIGHT,
      position: 'fixed',
      top: NAVBAR_OFFSET_TOP,
      width: '100%',
      // dark purple #2c2c54 with backdrop filter blur
      backgroundColor: 'rgba(44, 44, 84, 0.85)',
      backdropFilter: 'blur(32px) saturate(180%)',
      zIndex: 99999999,
    }}
  >
    <div className="container-fluid h-100 flex">
      <div className="d-flex align-items-center w-100">
        {props.back ? (
          <button
            className=""
            style={{
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              width: NAVBAR_HEIGHT,
            }}
            type="button"
            onClick={() => {
              props.__engine.pop();
            }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        ) : null}

        <h2
          style={{
            color: 'white',
            margin: 0,
            padding: 0,
            marginLeft: 10,
            marginRight: 'auto',
            fontSize: 20,
            display: 'inline-block',
          }}
        >
          {title}
        </h2>

        {props.primaryAction ? (
          <NavPrimaryButton
            type="button"
            onClick={() => {
              props.__engine.hacks.dirtyEval(props.primaryAction.onClick);
            }}
          >
            {props.primaryAction.label}
          </NavPrimaryButton>
        ) : null}
      </div>

      {dropdownItems && dropdownItems.length > 0 ? dropdownElement : null}
    </div>
  </div>
);

return (
  <>
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
        className="row"
        style={{
          marginTop: NAVBAR_HEIGHT,
        }}
      >
        <div className="col-12">
          {props.__engine.renderComponent(
            props.component.name,
            props.component.props
          )}
        </div>
      </div>
    </div>
  </>
);
