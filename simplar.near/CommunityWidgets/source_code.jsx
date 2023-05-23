return (
    <>
    <div class="position-relative small">
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a href="#" class="nav-link" aria-current="page">
            <i class="bi bi-house me-1" />
            Home
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark">
            <i class="bi bi-mortarboard me-1" />
            Learn
          </a>
        </li>
        <li>
          <a href="#" class="nav-link link-dark">
            <i class="bi bi-calendar-date me-1" />
            Events
          </a>
        </li>
        <li>
          <a
            href="#"
            class="nav-link link-dark btn-toggle"
            data-bs-toggle="collapse"
            data-bs-target="#collapse"
            aria-expanded="true"
          >
            <i class="bi bi-chat-right-text me-1" />
            Discuss
          </a>
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ps-4 small collapse show"
              id="collapse" >
            <li>
              <a href="#" class="nav-link link-dark">
                Overview
              </a>
            </li>
            <li>
              <a href="#" class="nav-link link-dark">
                Updates
              </a>
            </li>
            <li>
              <a href="#" class="nav-link link-dark">
                Reports
              </a>
            </li>
          </ul>
        </li>
      </ul>
      </div>
    </>
  );
  