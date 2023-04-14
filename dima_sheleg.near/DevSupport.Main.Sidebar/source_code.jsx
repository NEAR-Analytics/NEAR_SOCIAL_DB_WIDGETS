const categories = props.categories;
const topics = props.topics;

const H6 = styled.h6`
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: #687076;
`;
const Category = styled.button`
    display: block;
    border: none;
    background: transparent;
    padding: 0;
    margin: 1rem 0;
    font-size: 14px;
    transition: font-weight .15s ease;

    &:hover {
      font-weight: 600;
    }
`;
const HR = styled.hr`
  margin: 2.5rem 0;
  color: #ECEEF0;
`;
return (
  <div class="d-flex flex-column">
    <H6>sort by</H6>
    <div>
      {categories.map((i) => (
        <Category>{i}</Category>
      ))}
    </div>

    <HR />

    <H6>topics</H6>
    <div>
      {topics.map((i) => (
        <Category>{i}</Category>
      ))}
    </div>
  </div>
);
