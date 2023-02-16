const ownerId = "contribut3.near";

State.init({
  content: props.content ?? "projects",
});

const header = (
  <div>
    <h1 className="fs-2">Dashboard</h1>
    <p className="fw-semibold fs-5 text-muted">
      Find projects, contributors or requests
    </p>
  </div>
);

const createNewDropdown = (
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
);

const contentSelectButton = ({ id, text, icon }) => (
  <a
    className={`btn ${state.content === id ? "btn-secondary" : "btn-outline-secondary"
      }`}
    href={`https://near.social/#/${ownerId}/widget/Dashboard?tab=${props.tab
      }&content=${id}${props.search ? "&search=" + props.search : ""}`}
    onClick={() => State.update({ content: id })}
  >
    <i className={icon} />
    <span>{text}</span>
  </a>
);

const contentSelector = (
  <div className="btn-group" role="group" aria-label="Content Tab Selector">
    {contentSelectButton({
      id: "projects",
      text: "Projects",
      icon: "bi-boxes",
    })}
    {contentSelectButton({
      id: "contributors",
      text: "Contributors",
      icon: "bi-person",
    })}
    {contentSelectButton({
      id: "requests",
      text: "Requests",
      icon: "bi-ui-checks-grid",
    })}
  </div>
);

const searchBar = (
  <div className="w-25 col-12 col-md-10 col-lg-8">
    <div className="card card-sm">
      <div className="card-body row p-0 ps-2 align-items-center">
        <div className="col-auto pe-0 me-0">
          <i className="bi-search" />
        </div>
        <div className="col ms-0">
          <input
            className="form-control border-0"
            type="search"
            value={state.search}
            placeholder="Search"
            onChange={(e) => State.update({ search: e.target.value })}
          />
        </div>
      </div>
    </div>
  </div>
);

return (
  <div>
    <div className="mb-5 ps-3">
      <div className="d-flex flex-row justify-content-between mb-3">
        {header}
        {createNewDropdown}
      </div>
      <div className="d-flex flex-row justify-content-between">
        {contentSelector}
        {searchBar}
      </div>
    </div>
    <hr className="border-2" />
  </div>
);
