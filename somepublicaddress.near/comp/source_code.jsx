const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
  max-width: 600px;
  margin: 0 auto;
`;

const items = [
  "hi", "you"
];

return (<Wrapper> 
  {
    items.map((item) => item + " ")
  }
</Wrapper>)