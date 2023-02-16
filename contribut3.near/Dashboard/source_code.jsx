const ownerId = "contribut3.near";

return (
  <div>
    <div className="d-flex flex-row justify-content-between">
      <div>
        <h1 className="fs-2">Dashboard</h1>
        <p className="fw-semibold fs-5 text-muted">
          Find projects, contributors or requests
        </p>
      </div>
      <div className="dropdown">
        <a
          className="btn btn-info dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Create new...
        </a>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item">
              <i className="bi-ui-checks-grid" />
              <span>Contribution request</span>
            </a>
          </li>
          <li>
            <a className="dropdown-item">
              <i className="bi-boxes" />
              <span>Project</span>
            </a>
          </li>
          <li>
            <a className="dropdown-item">
              <i className="bi-diagram-2" />
              <span>Organization</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
