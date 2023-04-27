const ownerId = "nearhorizon.near";
const cardData = props.cardData ?? [];

const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 1em;

  > div {
    width: 100%;

    @media (min-width: 768px) {
      width: 48%;
    }

    @media (min-width: 1024px) {
      width: 32%;
    }
  }
`;

return (
  <List>
    {cardData.map((cardProps) => (
      <div>
        <Widget src={`${ownerId}/widget/Learn.Card`} props={cardProps} />
      </div>
    ))}
  </List>
);
