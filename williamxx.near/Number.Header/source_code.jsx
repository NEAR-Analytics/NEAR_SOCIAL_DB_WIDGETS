const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 4.5em;
  gap: 0.625em;
  background: #000;

  h1 {
    font-family: "FK Grotesk";
    font-style: normal;
    font-weight: 500;
    font-size: 2.5em;
    line-height: 1.25em;
    color: #fff;
  }

  p {
    font-family: "Mona Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.25em;
    line-height: 140%;
    color: #00ec97;
  }
`;

return (
  <Container>
    <h1>Numbers Speak For Themselves</h1>
    <p>Creativity is NEAR!</p>
  </Container>
);
