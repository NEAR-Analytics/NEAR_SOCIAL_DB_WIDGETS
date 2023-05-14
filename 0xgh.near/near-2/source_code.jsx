const Near2Wrapper = styled.div`
  background-color: yellow;
`;

let name = props.name || "User";

return (
  <Near2Wrapper>
    <p>Component-2 : near-2.jsx</p>
    <p>props:name = {name}</p>
    <p>계정 = {context.accountId}</p>
  </Near2Wrapper>
);
