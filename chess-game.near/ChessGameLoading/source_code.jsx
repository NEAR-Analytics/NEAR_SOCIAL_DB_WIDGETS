const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;
`;
const Loading = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 7px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.6);
  animation: rotate 800ms linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

return (
  <LoadingWrapper>
    {props.content}
    <Loading />
  </LoadingWrapper>
);
