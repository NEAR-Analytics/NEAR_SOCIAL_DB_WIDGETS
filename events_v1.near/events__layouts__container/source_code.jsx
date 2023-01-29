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

const navbar = (
  <div
    className="navbar navbar-expand-lg navbar-dark"
    style={{
      minHeight: NAVBAR_HEIGHT,
      position: 'fixed',
      top: NAVBAR_OFFSET_TOP,
      width: '100%',
      backgroundColor: '#2c2c54',
    }}
  >
    <div className="container-fluid h-100 flex">
      <div className="d-flex align-items-center text-center">
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
            fontSize: 20,
            width: '100%',
          }}
        >
          {title}
        </h2>
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
