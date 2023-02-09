const Wrapper = styled.div`
  padding-top: 24px;
`;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181C;
  margin: 0 0 25px;
`;

const CardWrapper = styled.div`
  margin: 0 0 16px;
`;

return (
  <Wrapper>
    <H2>Latest Applications</H2>

    <CardWrapper>
      <Widget src="calebjacob.near/widget/ApplicationCard" />
    </CardWrapper>

    <CardWrapper>
      <Widget src="calebjacob.near/widget/ApplicationCard" />
    </CardWrapper>

    <CardWrapper>
      <Widget src="calebjacob.near/widget/ApplicationCard" />
    </CardWrapper>
  </Wrapper>
);
