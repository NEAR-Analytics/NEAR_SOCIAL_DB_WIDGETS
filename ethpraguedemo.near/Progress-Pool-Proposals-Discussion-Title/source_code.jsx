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
const Button = styled.a`
  display: block;
  color: #ffffff;
  background-color: #30A46C;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 24px;
  border: none;
  border-radius: 50px;
  float: inline-end;

  :hover{ color: #ffffff; cursor: pointer; }
`;

return (
  <div class="row">
    <div class="col-lg-8 col-sm-12">
      <H1>Discussions</H1>
      <H6>Get help with your projects, join our community!</H6>
    </div>
    <div class="col-lg-4 col-sm-12">
      <Button
        class="btn btn-primary"
        disabled={props.disabled}
        onClick={props.onClick}
      >
        Ask a Question
      </Button>
    </div>
  </div>
);
