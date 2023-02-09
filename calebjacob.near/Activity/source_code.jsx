const Wrapper = styled.div`
  border-left: 1px solid #ECEEF0;
  border-right: 1px solid #ECEEF0;
  padding-top: 24px;
`;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181C;
  margin: 0 0 25px;
  padding: 0 24px;
`;

const CreatePostWrapper = styled.div`
  border-top: 1px solid #ECEEF0;
  border-bottom: 1px solid #ECEEF0;
`;

return (
  <Wrapper>
    <H2>Activity</H2>

    <CreatePostWrapper>
      <Widget src="calebjacob.near/widget/CreatePost" />
    </CreatePostWrapper>
  </Wrapper>
);
