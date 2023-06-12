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

const Left = styled.div`
  padding: 20px;
  background: #F8F8F9;
  border-radius: 8px;
`;

const Center = styled.div`
  margin: 0 20px;
`;

const Right = styled.div`
  padding: 20px;
  background: #F8F8F9;
  border-radius: 8px;
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

return (
  <div>
    <Widget
      key={i}
      src={`${widgetProvider}/widget/NDC-election-header`}
      props={props}
    />
    <Container className="d-flex flex-wrap gx-5">
      <Left>
        <H5>To Vote</H5>
        <Widget
          key={i}
          src={`${widgetProvider}/widget/NDC-election-groups`}
          props={{
            selectedGroup: state.selectedGroup,
            groups: groups,
            handleSelect: (item) => handleSelect(item),
          }}
        />
      </Left>
      <Center>
        <Widget
          key={i}
          src={`${widgetProvider}/widget/NDC-elections`}
          props={props}
        />
      </Center>
      <Right>
        <H5>General</H5>
      </Right>
    </Container>
  </div>
);
