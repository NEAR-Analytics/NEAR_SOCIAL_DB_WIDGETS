const title = props.title ?? "Title";
const link = props.link ?? "*";
const description = props.description ?? "Description";
const img = props.img ?? "";
const height = props.height ?? "375px";
const video =
  props.video ?? "https://youtu.be/QZLUQSOv7VY?origin=https://near.org/";

const Card = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;
  background: #ffffff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  width: 100%;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5em;
  gap: 1em;
  width: 100%;
`;

const LinkSection = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.5em;
  gap: 1em;
  border-top: 1px solid #eceef0;
  width: 100%;
`;

const Link = styled.a`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  gap: 0.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: justify;
  color: #006adc;
`;

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
    {img && video ? (
      <VideoAnchor href={video}>
        <img style={{ maxWidth: "80%", margin: "auto" }} src={img} />
        <p>watch key takeaways</p>
      </VideoAnchor>
    ) : (
      <br />
    )}

    <h4 style={{ textAlign: "left" }}>{title}</h4>
    <hr />
    <p style={{ textAlign: "left" }}>{description}</p>
    <Anchor href={link}>Visit Resource</Anchor>
  </Card>
);
