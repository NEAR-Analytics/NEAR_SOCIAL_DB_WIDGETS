if (!props.tags?.length) return "";

const TagsWrapper = styled.div`
  position: relative;

  ${(p) =>
    p.scroll
      ? `
    ul {
      padding-right: 16px;
    }

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

    ul {
        flex-wrap: nowrap;
    }
  `
      : ""}
`;

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
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
  padding: 2px 7px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 18px;
  color: #687076;
  font-weight: 500;
`;

return (
  <TagsWrapper scroll={props.scroll}>
    <Tags>
      {props.tags.map((tag, i) => (
        <Tag key={i}>{tag}</Tag>
      ))}
    </Tags>
  </TagsWrapper>
);
