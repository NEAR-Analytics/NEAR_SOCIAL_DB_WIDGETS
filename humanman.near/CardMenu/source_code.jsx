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

  &:hover {
    background-color: #e9ecef;
  }
`;

return (
  <Card>
    <img style={{ maxWidth: "80%", margin: "auto" }} src={props.img} />
    <a href={props.link}>
      <h4>{props.title}</h4>
      <hr />
      <p style={{ textAlign: "center" }}>{props.description}</p>
    </a>
  </Card>
);
