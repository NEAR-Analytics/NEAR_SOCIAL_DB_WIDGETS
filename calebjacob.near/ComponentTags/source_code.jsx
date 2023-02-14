if (!props.tags?.length) return "";

const TagsWrapper = styled.div`
  position: relative;
`;

const Tags = styled.ul`
  display: flex;
  flex-wrap: ${(p) => (p.scroll ? "nowrap" : "wrap")};
  list-style: none;
  gap: 6px;
  overflow: auto;
  margin: 0;
  padding: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tag = styled.li`
  border: 1px solid #E6E8EB;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 18px;
  color: #687076;
  font-weight: 500;
`;

return (
  <TagsWrapper>
    <Tags scroll={!props.scroll}>
      {props.tags.map((tag, i) => (
        <Tag key={i}>{tag}</Tag>
      ))}
    </Tags>
  </TagsWrapper>
);
