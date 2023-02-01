return props.labels ? (
  <div class="card-title">
    {props.labels.map((label) => {
      return (
        <a
          href={`https://near.social/#/devgovgigs.near/widget/Ideas?label=${label}`}
        >
          <span class="badge p-0 pe-2 text-primary">{label}</span>
        </a>
      );
    })}
  </div>
) : null;
