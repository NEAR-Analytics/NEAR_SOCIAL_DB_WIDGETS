return props.labels ? (
  <div class="card-title">
    {props.labels.map((label) => {
      return (
        <a href="#">
          <span class="badge p-0 pe-2 text-primary">{label}</span>
        </a>
      );
    })}
  </div>
) : null;
