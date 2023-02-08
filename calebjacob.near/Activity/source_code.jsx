const Wrapper = styled.div`
  border-left: 1px solid #ECEEF0;
  border-right: 1px solid #ECEEF0;
`;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181C;
  margin: 0 0 25px;
`;

return (
  <Wrapper>
    <H2>Activity</H2>

    <Widget src="calebjacob.near/widget/CreatePost" />
  </Wrapper>
);
