const Near2Wrapper = styled.div`
  background-color: yellow;
  padding: 1rem;
`;

let name = props.name || "User";

return (
  <Near2Wrapper>
    <p>Component-2 : near-2.jsx</p>
    <p>props:name = {name}</p>
    <p>계정 = {context.accountId}</p>
    <Widget src={`0xgh.near/widget/near-3`} />
  </Near2Wrapper>
);
