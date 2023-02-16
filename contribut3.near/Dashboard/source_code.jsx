const ownerId = "contribut3.near";

return (
  <div>
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
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item">
                <i className="bi-boxes" />
                <span>Project</span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
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
      <div className="d-flex flex-row justify-content-between">
        <div
          className="btn-group"
          role="group"
          aria-label="Content Tab Selector"
        >
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="projects"
            autocomplete="off"
            checked
          />
          <label className="btn btn-outline-secondary" htmlFor="projects">
            <i className="bi-boxes" />
            <span>Projects</span>
          </label>

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="contributors"
            autocomplete="off"
          />
          <label className="btn btn-outline-secondary" htmlFor="contributors">
            <i className="bi-person" />
            <span>Contributors</span>
          </label>

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="requests"
            autocomplete="off"
          />
          <label className="btn btn-outline-secondary" htmlFor="requests">
            <i className="bi-ui-checks-grid" />
            <span>Requests</span>
          </label>
        </div>
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card card-sm">
            <div className="card-body row no-gutters align-items-center">
              <div className="col-auto">
                <i className="bi-search" />
              </div>
              <div className="col">
                <input
                  className="form-control form-control-lg form-control-borderless"
                  type="search"
                  value={state.search}
                  placeholder="Search"
                  onChange={(e) => State.update({ search: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
