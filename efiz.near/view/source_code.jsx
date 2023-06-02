const data = props.data;

const Header = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
`;

const Container = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    justify-content: flex-start;
  }
`;

const InnerContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 535px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;  
//   border: 2px solid orange;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
//   border: 2px solid green;
  padding: 20px;

  @media (max-width: 767px) {
    border-top: none;
    padding: 10px;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  svg {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 767px) {
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const SubjectField = styled.input`
  font-size: 4em;
  line-height: 1.25;
  font-weight: 400;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  width: 100%;

  @media (max-width: 767px) {
    font-size: 1.5em;
  }
`;

function Thing() {
  if (state.thingSrc) {
    return (
      <>
        <Widget src={state.thingSrc} />
      </>
    );
  }
}

// how can we have this be custom?
// settings/every/subject

return (
  <>
    <Container>
      <InnerContainer>
        <Row>
          <Column>
            <IconBox>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                width="24px"
                height="24px"
              >
                <circle cx="12" cy="12" r="8" />
              </svg>
            </IconBox>
            <SubjectField type="text" placeholder={data.subject} />
            {/** <ActionButton>
              <span>&#10140;</span>
            </ActionButton>
            */}
          </Column>
        </Row>
        <Row>advanced</Row>
      </InnerContainer>
    </Container>
    <ButtonRow>
      {data.edges.map((edge) => (
        <Button onClick={() => State.update({ thingSrc: edge.src })}>
          {edge.name}
        </Button>
      ))}
      {/**
      <Button
        onClick={() =>
          State.update({
            thingSrc: "efiz.near/widget/every.type.create",
          })
        }
      >
        +
      </Button>
      */}
    </ButtonRow>
    <>
      <Thing />
    </>
  </>
);
