const { code } = props;
const current_mode = Storage.get(
  "ref-mode",
  "ref-admin.near/widget/user-builder"
);
return (
  <div
    style={{
      display: current_mode == "builder" ? "block" : "none",
    }}
  >
    {code}
  </div>
);
