const Near2Wrapper = styled.div`
  background-color: yellow;
`;

let name = props.name || "User";

return (
  <Near2Wrapper>
    <p>props:name = {name}</p>
    <p>계정 = {context.accountId}</p>
  </Near2Wrapper>
);
