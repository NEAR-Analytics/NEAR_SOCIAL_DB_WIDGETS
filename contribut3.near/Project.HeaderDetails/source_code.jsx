const ownerId = "contribut3.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: .5em;
`;

return (
  <Container>
    <Widget src={`${ownerId}/widget/Project.Icon`} props={{ accountId: ownerId, size: "8em" }} />
    <Details>
    </Details>
  </Container>
);
