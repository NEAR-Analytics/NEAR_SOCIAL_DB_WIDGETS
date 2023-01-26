const NAVBAR_HEIGHT = 64;
const NAVBAR_OFFSET_TOP = 72;

const title = props.layoutProps.title ?? '';
const dropdownItems = props.layoutProps.dropdownItems ?? [];

const dropdownElement =
  dropdownItems && dropdownItems.length > 0 ? (
    <>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {dropdownItems.map((item, idx) => {
            return props.engine.renderComponent(
              item.component,
              {
                ...item.props,
                key: `dropdown_item_${idx}`,
              },
              item.layout,
              item.layoutProps
            );
          })}
        </ul>
      </div>
    </>
  ) : null;

return (
  <>
    <div
      style={{
        width: '100%',
      }}
    >
      <div
        className="navbar navbar-expand-lg navbar-dark bg-primary"
        style={{
          height: NAVBAR_HEIGHT,
          position: 'fixed',
          top: NAVBAR_OFFSET_TOP,
          width: '100%',
        }}
      >
        <div className="container-fluid h-100 flex">
          <div className="d-flex">
            {props.layoutProps.back ? (
              <button
                className=""
                style={{
                  color: 'black',
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
                  console.log('back');
                  props.routing.pop();
                }}
              >
                &lt;
              </button>
            ) : null}

            <h2 className="navbar-brand">{title}</h2>
          </div>

          {dropdownItems && dropdownItems.length > 0 ? dropdownElement : null}
        </div>
      </div>

      <div
        className="row"
        style={{
          marginTop: NAVBAR_HEIGHT,
        }}
      >
        <div className="col-12">
          <Widget src={props.component.src} props={props.component.props} />
        </div>
      </div>
    </div>
  </>
);
