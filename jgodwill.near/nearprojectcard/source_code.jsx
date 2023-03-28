const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  box-shadow: 0 0.05rem 0.05rem rgb(34 34 34 / 5%), 0 0.2rem 0.8rem rgb(34 34 34 / 8%);
  border-radius: 10px;
  border: 0.05rem solid #eee;
  background: #fff;
  cursor: pointer;
  transition: all ease 0.3s;
  padding: 1em;
  margin: 0.5rem;
  max-width: 220px;
  max-height: 200px;
  overflow: hidden;
  justify-content: space-between;

  &:hover{
     transform: translateY(-0.1rem);
  }
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.8rem;
`;

const IconWrapper = styled.div`
  width: 40px;
  min-width: 40px;
  height: 40px;
  min-height: 40px;
`;

const PName = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
`;

const PCategory = styled.span`
  font-weight: lighter;
  color: #888;
  font-size: 0.7rem;
`;

const PSubtitle = styled.span`
  color: #222;
  font-size: 0.7rem;
  margin: 1em 0;
  height: 30px;
`;

// truncate text and add an ellipsis if needed
const truncateText = (text, characters) => {
  if (!text) return "";
  return `${text.substring(0, characters)}${
    text.length > characters ? "..." : ""
  }`;
};

return (
  <Card>
    <Title>
      <IconWrapper>
        <img
          src={
            props.Icon ||
            "https://images.pexels.com/photos/10175905/pexels-photo-10175905.jpeg?auto=compress&cs=tinysrgb&lazy=load"
          }
          className="w-100  h-100 shadow rounded-circle img-fluid oveflow-hidden"
        />
      </IconWrapper>
      <Info>
        <PName>{props.ProjectName || "Project Name"}</PName>
        <PCategory>{truncateText(props.Category, 20) || "Category"}</PCategory>
      </Info>
    </Title>
    <PSubtitle>{truncateText(props.Subtitle, 60)}</PSubtitle>
    <div className="d-flex">Icons</div>
  </Card>
);
