const { widgetProvider, groups } = props;

State.init({
  selectedGroup: groups[0].title,
});

const handleSelect = (item) => {
  State.update({ selectedGroup: item.title });
};

const Container = styled.div`
  padding: 30px 0;
`;

const LeftNav = styled.div`
  padding: 20px;
  background: #F8F8F9;
  border-radius: 8px;
  margin-right: 20px;
`;

return (
  <div>
    <Widget
      key={i}
      src={`${widgetProvider}/widget/NDC-election-header`}
      props={props}
    />
    <Container className="d-flex flex-wrap gx-5">
      <LeftNav>
        <h4>To Vote</h4>
        <Widget
          key={i}
          src={`${widgetProvider}/widget/NDC-election-groups`}
          props={{
            selectedGroup: state.selectedGroup,
            groups: groups,
            handleSelect: (item) => handleSelect(item),
          }}
        />
      </LeftNav>
      <Widget
        key={i}
        src={`${widgetProvider}/widget/NDC-elections`}
        props={props}
      />
    </Container>
  </div>
);
