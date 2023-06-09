props = props || {
  title: props.title,
  link: props.link,
  description: props.description,
  img: props.img,
};
const Card = styled.button`
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: top;
  align-items: top;
  width: 300px;
  height: 300px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  color: black;
  cursor: pointer;
  margin: 5px;
  padding: 3px 15px;

  &:hover {
    background-color: #e9ecef;
    box-shadow: #444 1px 1px 5px;
  }
`;

const Anchor = styled.a`
  color: #222;
  &:hover {
    text-decoration: none;
    color: #444;
  }
`;

return (
  <Card>
    {props.img ? (
      <img style={{ maxWidth: "80%", margin: "auto" }} src={props.img} />
    ) : (
      <br />
    )}
    <Anchor href={props.link}>
      <h4 style={{ textAlign: "left" }}>{props.title}</h4>
      <hr />
      <p style={{ textAlign: "left" }}>{props.description}</p>
    </Anchor>
  </Card>
);
