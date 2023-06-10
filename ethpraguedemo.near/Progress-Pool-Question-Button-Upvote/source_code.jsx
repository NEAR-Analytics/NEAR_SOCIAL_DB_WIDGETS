const likeClick = () => {
  console.log("upvoted");
  State.update({
    upvote: true,
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
    color: #30A46C;
    border-color: #30A46C;
  }
`;

return (
  <div className="d-inline-flex align-items-center">
    <Button
      disabled={state.upvote || !context.proposalId}
      onClick={likeClick}
      style={{ marginRight: "8px" }}
    >
      {state.loading || dataLoading ? (
        <span
          class="spinner-grow spinner-grow-sm p-2"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <i class="bi bi-caret-up-fill" />
      )}
      {upvote}
    </Button>
  </div>
);
