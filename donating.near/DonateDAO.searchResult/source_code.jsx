const { title, address, description } = props;

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
  .address {
    
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

const onClick = () => {
  clipboard.writeText(address); // instead of symbol have addressespassed in from registry
  State.update({ selectedAddress: address });
};

return (
  <Row onClick={onClick}>
    <span className="title">{title}</span>
    <span className="address">❤️ {address}</span>
    <span className="info">Click to select Charity</span>
    <p>{description}</p>
  </Row>
);
