props = props || {
  title: props.title,
  link: props.link,
  description: props.description,
  img: props.img,
  height: props.height || "375px",
  video:
    props.video ||
    "https://youtu.be/QZLUQSOv7VY?origin=https://alpha.near.org/",
};

const title = props.title ?? "Title";
const link = props.link ?? "*";
const description = props.description ?? "Description";
const img = props.img ?? "";
const height = props.height ?? "375px";
const video =
  props.video ?? "https://youtu.be/QZLUQSOv7VY?origin=https://near.org/";

const Card = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: top;
  align-items: top;
  width: 300px;
  height: ${props.height};
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  color: black;
  margin: 5px;
  padding: 15px;
  &:hover {
    background-color: #efefef;
    box-shadow: #444 1px 1px 5px;
    cursor: auto;
  }
`;
//  background-color: #e9ecef;

const Anchor = styled.a`
  color: #222;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  position: absolute;
  bottom: 15px;
  cursor: pointer;
  left: 15px;
  &:hover {
    text-decoration: underline;
    color: #66a0ff;
    font-weight: bold;
  }
`;

const VideoAnchor = styled.a`
  color: #222;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    text-decoration: underline;
    color: #66a0ff;
    font-weight: bold;
  }
`;

return (
  <Card>
    {props.img && props.video ? (
      <VideoAnchor href={props.video}>
        <img style={{ maxWidth: "80%", margin: "auto" }} src={props.img} />
        <p>watch key takeaways</p>
      </VideoAnchor>
    ) : (
      <br />
    )}

    <h4 style={{ textAlign: "left" }}>{props.title}</h4>
    <hr />
    <p style={{ textAlign: "left" }}>{props.description}</p>
    <Anchor href={props.link}>Visit Resource</Anchor>
  </Card>
);
