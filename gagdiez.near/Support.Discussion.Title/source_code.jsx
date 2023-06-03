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
    <div class="col-lg-9 col-sm-12">
      <H1>Support</H1>
      <H6>Lets help eachother with our projects</H6>
    </div>
    <div class="col-lg-3 col-sm-12 text-center">
      <Button
        class="btn btn-primary "
        disabled={props.disabled}
        onClick={props.onClick}
      >
        Ask a Question
      </Button>
    </div>
  </div>
);