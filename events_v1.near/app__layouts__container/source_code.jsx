const title = props.layoutProps.title ?? '';

const dropdownItems = props.layoutProps.dropdownItems ?? [];

const Dropdown =
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
          {dropdownItems.map((item) => {
            return (
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  {item}
                </a>
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
      className="container-fluid"
      style={{
        width: '100%',
      }}
    >
      <div className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <h2 className="navbar-brand">{title}</h2>

          {dropdownItems && dropdownItems.length > 0 ? Dropdown : null}
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Widget src={props.component.src} props={props.component.props} />
        </div>
      </div>
    </div>
  </>
);
