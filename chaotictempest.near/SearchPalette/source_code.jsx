const SearchCard = styled.div`
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  height: 24em;

  background: #fff;
  border: 1px solid #eceef0;
  border-radius: 12px;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: scroll;
  padding: 16px;
`;

const CardLeft = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
  min-width: 0;

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }
`;

return (
  <SearchCard>
    <CardLeft>
      <Widget
        src="chaotictempest.near/widget/Search"
        props={{
          term: props.term,
          showHeader: false,
          showPagination: false,
        }}
      />
    </CardLeft>
  </SearchCard>
);
