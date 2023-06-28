const path = props.path;
const blockHeight = props.blockHeight;

const thing = JSON.parse(Social.get(path, blockHeight) || "null");

if (!thing) {
  return <></>;
}

const Box = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

// return <Box>{JSON.stringify(thing)}</Box>;

return (
  <Link
    to={`/${path}`}
    style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
  >
    <Box>{JSON.stringify(thing)}</Box>
  </Link>
);
