const Container = styled.div`
    display:inline-flex;
    align-items:center;
    background: #0092FF;
    border-radius: 6px;
    height:28px;
    padding:0 10px;
    font-weight: 500;
    font-size: 14px;
    color:#fff;
    text-transform: capitalize;
`;
const current_mode = Storage.get(
  "ref-mode",
  "ref-admin.near/widget/user-builder"
);
return <Container>{current_mode || "User"}</Container>;
