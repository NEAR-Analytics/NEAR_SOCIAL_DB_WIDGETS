const tags = Object.keys(props.tags || {});

const TagItem = styled.span`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: .15em .5em;
  gap: .15em;
  background: #FFFFFF;
  border: 1px solid #E6E8EB;
  border-radius: 6px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const Container = styled.div`
  max-width: 400px;
  overflow: hidden;
`;

return (
  <Container>
    {tags.map((tag) => (
      <TagItem key={tag}>{tag}</TagItem>
    ))}
  </Container>
);
