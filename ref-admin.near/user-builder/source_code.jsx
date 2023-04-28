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
State.init({
  buttonStatus: "user",
});
function switchButton(type) {
  Storage.set("ref-mode", type);
  State.update({
    buttonStatus: type,
  });
}
return (
  <Container>
    <span
      class={`default ${buttonStatus == "user" ? "active" : ""}`}
      onClick={() => {
        switchButton("user");
      }}
    >
      User
    </span>
    <span
      class={`default ${buttonStatus == "builder" ? "active" : ""}`}
      onClick={() => {
        switchButton("builder");
      }}
    >
      Builder
    </span>
  </Container>
);
