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
      // dark purple #2c2c54 with backdrop filter blur
      backgroundColor: 'rgba(44, 44, 84, 0.85)',
      backdropFilter: 'blur(16px)',
      zIndex: 99999999,
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

const blurs = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
];

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

      {blurs.map((i) => {
        const elHeight = 1;
        const minBlur = 30;
        const maxBlur = 80;
        const blurDelta = (maxBlur - minBlur) / elHeight;

        return (
          <div
            key={i}
            style={{
              position: 'fixed',
              top: NAVBAR_OFFSET_TOP + NAVBAR_HEIGHT + i * elHeight,
              height: elHeight,
              backgroundColor: 'rgba(255,255,255, 0.5)',
              backdropFilter: `blur(${maxBlur - i * blurDelta}px)`,
              width: '100%',
              zIndex: 99999999,
            }}
          />
        );
      })}
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
