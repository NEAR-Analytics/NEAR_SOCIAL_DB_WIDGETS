const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: .5em;
  padding: .5em .2em;
`;

const Heading = styled.div`
  padding-bottom: .5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.4em;
  color: #000;
`;

return (
  <Container>
    <Heading>Details</Heading>
  </Container>
);
