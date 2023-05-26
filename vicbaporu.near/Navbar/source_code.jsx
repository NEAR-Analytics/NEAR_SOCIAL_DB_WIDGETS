return (
  <>
    <div class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <a class="navbar-brand mt-2 mt-lg-0" href="#">
            <img
              src="https://res.cloudinary.com/dgcxcqu6p/image/upload/v1685034388/milestone_logo_verde_rqzu5a.png"
              height="15"
              alt="MDB Logo"
              loading="lazy"
            />
          </a>
          <ul class="navbar-nav mt-1 me-auto mb-2 mb-lg-0">
            <li
              class="nav-item"
              onClick={() => {
                props.onSelectedOption("project");
              }}
            >
              <a class="nav-link" href="#">
                Proyecto
              </a>
            </li>
            <li
              class="nav-item"
              onClick={() => {
                props.onSelectedOption("buys");
              }}
            >
              <a class="nav-link" href="#">
                Mis compras
              </a>
            </li>
            <li
              class="nav-item"
              onClick={() => {
                props.onSelectedOption("rewards");
              }}
            >
              <a class="nav-link" href="#">
                Mis recompenzas
              </a>
            </li>
            <li
              class="nav-item"
              onClick={() => {
                props.onSelectedOption("metapool");
              }}
            >
              <a class="nav-link" href="#">
                Meta Pool
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
);
