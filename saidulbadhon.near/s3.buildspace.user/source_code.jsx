const theme = props.theme;

State.init({
  images: [],
  showBrowser: false,
});
// const res = fetch(
//   "https://t4zr86bzl5.execute-api.us-east-1.amazonaws.com/production/api/v1/buildspace/showcase"
// );

// if (!res.body?.list1)
//   return (
//     <div style={{ height: "100vh", width: "100%", backgroundColor: "#000" }} />
//   );

// const handleBrowseButton = () => {
//   State.update({
//     showBrowser: !state.showBrowser,
//   });
// };

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000 || ${theme.backgroundColor};
`;

const ContentWrapper = styled.div`
  gap: 32px;
  display: grid;
  grid-template-columns: 1fr 524px;

  height: 100%;
  max-height: 100vh;
  width: 100%;
  max-width: 1250px;
  padding-inline: 16px;

  @media screen and (max-width: 800px)  {
    grid-template-columns: 1fr;
  }
`;

return (
  <ContainerWrapper>
    <ContentWrapper>
      <h1>ASDSDAS: {props.name}</h1>
    </ContentWrapper>
  </ContainerWrapper>
);
