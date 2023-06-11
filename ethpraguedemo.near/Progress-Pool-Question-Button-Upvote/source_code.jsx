const upvotes = props.upvotes;
let state = props.state;

const likeClick = () => {
  console.log("upvoted");
  upvotes = 1;
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
    color: #30A46C;
    border-color: #30A46C;
  }
`;

return (
  <div className="d-inline-flex align-items-center">
    <Button onClick={likeClick} style={{ marginRight: "8px" }}>
      <i class="bi bi-caret-up-fill" />
      {upvotes}
    </Button>
  </div>
);
