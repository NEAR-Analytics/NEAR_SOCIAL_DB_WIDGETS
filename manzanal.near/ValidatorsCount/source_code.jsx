const count = props.count;
return (
  <div class="card w-25">
    <div class="card-body p-3">
      <h5 class="card-title">Validators</h5>
      <p class="text-primary">
        <i class="bi-union" />
        {count}
      </p>
    </div>
  </div>
);
