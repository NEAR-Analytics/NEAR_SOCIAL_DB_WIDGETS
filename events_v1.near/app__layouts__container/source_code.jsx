const NAVBAR_HEIGHT = 48;
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
            return (
              <li className="nav-item" key={idx}>
                <button
                  className="nav-link active"
                  aria-current="page"
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    props.routing.push(
                      item.route,
                      item.props,
                      item.layout,
                      item.layoutProps
                    );
                  }}
                >
                  {item.title}
                </button>
              </li>
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
                width: NAVBAR_HEIGHT,
              }}
              type="button"
              onClick={() => {
                props.routing.pop();
              }}
            >
              &lt;
            </button>
          ) : null}

          <h2 className="navbar-brand">{title}</h2>

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
