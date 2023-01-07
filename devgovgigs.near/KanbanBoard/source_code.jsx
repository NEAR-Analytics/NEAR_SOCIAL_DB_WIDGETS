const ownerId = "devgovgigs.near";

return (
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <span class="badge text-bg-primary">wg-protocol-discussion</span>
        </div>
        <div class="card-body border-secondary">
          <Widget
            src={`${ownerId}/widget/Post`}
            props={{ id: 0, isCompact: true }}
          />
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <div class="card-header">
          <span class="badge text-bg-primary">wg-protocol-discussion</span>
        </div>
        <div class="card-body border-secondary">
          <Widget
            src={`${ownerId}/widget/Post`}
            props={{ id: 2, isCompact: true }}
          />
        </div>
      </div>
    </div>
    <div class="col-sm">
      <div class="card">
        <div class="card-header">
          <span class="badge text-bg-primary">wg-protocol-discussion</span>
        </div>
        <div class="card-body border-secondary">
          <Widget
            src={`${ownerId}/widget/Post`}
            props={{ id: 0, isCompact: true }}
          />
        </div>
      </div>
    </div>
  </div>
);
