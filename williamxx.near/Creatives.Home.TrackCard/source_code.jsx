const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.25em 1.25em 1.5em;
  gap: 0.625em;
  border: 2px solid #f2f1ea;
  border-radius: 16px;

  h3 {
    font-family: "FK Grotesk";
    font-style: normal;
    font-weight: 700;
    font-size: 1.5em;
    line-height: 1.5em;
    color: ${props.color};
  }

  p {
    font-family: "Mona Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 0.95em;
    line-height: 150%;
    color: #000000;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ViewScheduleButton = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.625em 1.25em;
  width: 100%;
  gap: 0.5em;
  border: none;
  border-radius: 50px;
  background: #f3f3f2;
  color: #11181c;
  font-style: normal;
  font-weight: 600;
  font-size: 0.8em;
  line-height: 1em;
  text-align: center;
  white-space: nowrap;

  &:disabled {
    background: #e5e5e5;
  }
`;

return (
  <Container>
    {props.icon}
    <h3>{props.title}</h3>
    <p>{props.description}</p>
    {/*<div>
      <ViewScheduleButton href={props.href ?? "#"}>
        View Schedule by Track
      </ViewScheduleButton>
    </div>*/}
  </Container>
);
