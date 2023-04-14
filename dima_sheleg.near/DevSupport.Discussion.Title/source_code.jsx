const H1 = styled.h1`
  color: #11181C;
  font-size: 32px;
  font-weight: 600;
`;
const H6 = styled.h6`
  color: #687076;
  font-size: 20px;
  font-weight: 400
`;
const Button = styled.button`
  display: block;
  color: #09342E;
  background-color: #30A46C;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 24px;
  border: none;
  border-radius: 50px;
`;

return (
  <div class="row">
    <div class="col-12">
      <H1>Discussions</H1>
      <H6>
        Ask questions, get help with your project and join discussions from the
        community.
      </H6>
    </div>
    <div class="col-12 mt-4">
      <Button
        class="btn btn-primary float-end"
        disabled={props.disabled}
        onClick={props.onClick}
      >
        New Discussion
      </Button>
    </div>
  </div>
);
