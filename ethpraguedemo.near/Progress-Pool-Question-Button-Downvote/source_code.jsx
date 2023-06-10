const dislikeClick = () => {
  console.log("downvoted");
  State.update({
    downvote: true,
  });
};

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  border: 1px solid #DFE3E6;
  border-radius: 50px;
  color: #687076;
  padding: 8px 12px 12px;
  transition: all .15s ease;

  &:hover {
    color: #ff0000;
    border-color: #ff0000;
  }
`;

return (
  <div className="d-inline-flex align-items-center">
    <Button onClick={likeClick} style={{ marginLeft: "2px" }}></Button>
  </div>
);
