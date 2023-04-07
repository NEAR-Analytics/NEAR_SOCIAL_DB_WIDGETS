const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: .5em 1em;
  gap: .5em;
  background: #d9f4ff;
  border-radius: 8px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  gap: .5em;
`;

const Label = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: .5em;
  font-style: normal;
  font-weight: 600;
  font-size: .75em;
  line-height: 1em;
  color: #11181c;
  width: 30%;
`;

const Value = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: .5em;
  font-style: normal;
  font-weight: 700;
  font-size: .75em;
  line-height: 14em;
  color: #11181c;
  width: 70%;
`;

return (
  <Container>
    <Row>
      <Label>Credits:</Label>
      <Value>0 HHZN</Value>
    </Row>
    <Row>
      <Label>Graduation:</Label>
      <Value>10%</Value>
    </Row>
    <Row>
      <Label>Profile:</Label>
      <Value>60%</Value>
    </Row>
  </Container>
);
