const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to view your widgets";
}

let data = Social.keys(`${accountId}/widget/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (!data) {
  return "Loading";
}

data = Object.entries(data[accountId].widget ?? {});
data.sort((a, b) => b[1] - a[1]);

const widgets = data.map((p, i) => {
  const src = `${accountId}/widget/${p[0]}`;
  return (
    <div key={i}>
      <li>
        <a href={`#/${src}`}>{p[0] || <i>Noname widget</i>}</a>
      </li>
    </div>
  );
});

const deprecation_warning = (
  <div>
    This is deprecated. Please use{" "}
    <a href="https://near.social/#/erik.near/widget/MyWidgets">
      erik.near/widget/MyWidgets
    </a>{" "}
    instead.
  </div>
);

return (
  <div>
    <div className="col">{deprecation_warning}</div>
    <div className="col">
      <div className="card h-100">
        <div className="card-body">{widgets}</div>
      </div>
    </div>
  </div>
);
