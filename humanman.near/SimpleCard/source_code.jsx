const Card = styled.button`
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  color: black;
  cursor: pointer;
  margin: 2px;

  &:hover {
    background-color: #e9ecef;
  }
`;

return (
  <Card>
    {props.img ? (
      <img style={{ maxWidth: "80%", margin: "auto" }} src={props.img} />
    ) : (
      <br />
    )}
    <a href={props.link}>
      <h4>{props.title}</h4>
      <hr />
      <p style={{ textAlign: "left" }}>{props.description}</p>
    </a>
  </Card>
);
