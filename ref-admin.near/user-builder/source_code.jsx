const Container = styled.div`
    display:inline-flex;
    align-items:center;
    background: #0D1C1F;
    border-radius: 10px;
    padding:4px;
    width:100%;
    .default{
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius: 6px;
        font-weight: 500;
        font-size: 14px;
        color:#fff;
        height:28px;
        padding:0 25px;
        cursor:pointer;
        flex-grow:1;
    }
    .active{
        background: #0092FF;
    }
`;
const { buttonStatus } = state;
const current_mode = Storage.get(
  "ref-mode",
  "ref-admin.near/widget/user-builder"
);
function switchButton(type) {
  Storage.set("ref-mode", type);
  State.update({
    buttonStatus: type,
  });
}
const targetStatus = buttonStatus || current_mode;
return (
  <Container>
    <span
      class={`default ${targetStatus !== "builder" ? "active" : ""}`}
      onClick={() => {
        switchButton("user");
      }}
    >
      User
    </span>
    <span
      class={`default ${targetStatus == "builder" ? "active" : ""}`}
      onClick={() => {
        switchButton("builder");
      }}
    >
      Builder
    </span>
  </Container>
);
