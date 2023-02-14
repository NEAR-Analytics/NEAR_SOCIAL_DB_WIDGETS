if (!props.tags?.length) return "";

const TagsWrapper = styled.div`
  position: relative;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: 16px;
    background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1));
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const Tags = styled.ul`
  display: flex;
  list-style: none;
  gap: 6px;
  overflow: auto;
  margin: 0;
  padding: 6px 16px 0 0;

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
    <Tags>
      {props.tags.map((tag, i) => (
        <Tag key={i}>{tag}</Tag>
      ))}
    </Tags>
  </TagsWrapper>
);
