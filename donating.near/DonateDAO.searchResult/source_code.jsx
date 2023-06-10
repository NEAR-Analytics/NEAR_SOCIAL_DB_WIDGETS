const { symbol, title } = props;

const Row = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px;
  position: relative;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  img {
    width: 32px;
    height: 32px;
  }

  .title {
    position: relative;
    top: 2px;
    padding: 0 10px;
  }

  .info {
    float: right;
    position: relative;
    top: 8px;
    right: 10px;
    color: #ccc;
    display: none;
  }

  &:hover .info {
    display: inline-block;
  }
`;

const codePointHex = symbol.codePointAt(0).toString(16);
const src = `//cdn.jsdelivr.net/emojione/assets/png/${codePointHex}.png`;

const onClick = () => {
  clipboard.writeText(symbol); // instead of symbol have addresses passed in from registry
};

return (
  <Row onClick={onClick}>
    <span className="title">❤️ {title}</span>
    <span className="info">Click to select Charity</span>
  </Row>
);
